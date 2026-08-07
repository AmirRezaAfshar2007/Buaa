import { Types } from 'mongoose';
import { Character } from '../models/Character.ts';
import { Folder } from '../models/Folder.ts';
import { Stats } from '../models/Stats.ts';
import { parseHanziWithSino3D } from './qwen.service.ts';
import { ConflictError, NotFoundError } from '../utils/errors.ts';

export async function listCharacters(studentId: string) {
  const chars = await Character.find({ studentId }).sort({ createdAt: -1 }).lean();
  return chars.map((c: any) => ({
    ...c,
    id: c._id.toString(),
  }));
}

export async function addCharacter(
  studentId: string,
  rawCharacter: string,
  folderId?: string | null
) {
  const character = rawCharacter.trim();

  const alreadyAdded = await Character.exists({ studentId, character });
  if (alreadyAdded) {
    throw new ConflictError('This character is already in your learning deck.');
  }

  let resolvedFolderId: string | null = null;
  if (folderId) {
    if (!Types.ObjectId.isValid(folderId)) {
      throw new NotFoundError('Folder not found.');
    }
    const folderExists = await Folder.exists({ _id: folderId, studentId });
    if (!folderExists) {
      throw new NotFoundError('Folder not found.');
    }
    resolvedFolderId = folderId;
  }

  const dictData = await parseHanziWithSino3D(character);

  const newCharItem = await Character.create({
    studentId,
    character: dictData.character,
    simplified: dictData.simplified,
    traditional: dictData.traditional,
    pinyin: dictData.pinyin,
    englishMeaning: dictData.englishMeaning,
    persianMeaning: '',
    radicals: dictData.radicals?.length ? dictData.radicals : [character],
    strokeCount: dictData.strokeCount || 1,
    hskLevel: dictData.hskLevel || 1,
    frequencyRank: dictData.frequencyRank || 9999,
    exampleWords: dictData.exampleWords || [],
    exampleSentences: dictData.exampleSentences || [],
    audioPronunciation: '',
    lastReviewed: null,
    reviewCount: 0,
    learningLevel: 0,
    memoryStability: 10,
    interval: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    folderId: resolvedFolderId,
  });

  // Reward XP for growing the deck.
  await Stats.updateOne({ studentId }, { $inc: { totalXp: 15 } });

  return {
    ...newCharItem.toObject(),
    id: newCharItem._id.toString(),
  };
}

export async function deleteCharacter(studentId: string, charId: string) {
  if (!Types.ObjectId.isValid(charId)) {
    throw new NotFoundError('Character not found in your learning deck.');
  }
  const result = await Character.deleteOne({ _id: charId, studentId });
  if (result.deletedCount === 0) {
    throw new NotFoundError('Character not found in your learning deck.');
  }
}
