# Beihang Mandarin Flow

A Chinese-character learning platform with spaced-repetition (SM-2) practice, an AI-assisted dictionary lookup, XP/achievements, and an admin panel — built with React + Vite on the frontend and Express + TypeScript + MongoDB on the backend.


## Project structure

```
├── server.ts                  # Entrypoint: connects DB, wires Vite/static serving, starts listening
├── render.yaml                # Render deployment blueprint
├── scripts/
│   └── createAdmin.ts         # One-time CLI script to provision the first admin account
├── src/
│   ├── App.tsx, main.tsx, index.css      # React app root
│   ├── components/                       # React components (Login, Dashboard, Quiz, Admin, SpeechPlayer)
│   ├── lib/api.ts                        # Frontend API client
│   ├── types.ts                          # Types shared between frontend and backend
│   ├── app.ts                            # Express app: middleware + route mounting
│   ├── config/
│   │   ├── env.ts                        # Validated environment loading
│   │   └── database.ts                   # MongoDB (Mongoose) connection
│   ├── models/                           # Mongoose schemas: User, Character, PracticeLog, Stats, Achievement, Session
│   ├── middleware/                       # auth (requireAuth/requireAdmin), rate limiting, error handling
│   ├── routes/                           # Thin route handlers per resource
│   ├── services/                         # Business logic (auth, characters, practice/SRS, stats aggregation, admin, Qwen dictionary + speaking coach)
│   ├── utils/                            # asyncHandler, typed AppError hierarchy, input validators
│   └── types/
│       └── express.d.ts                  # AuthRequest / JWT payload typing
├── AUDIT_REPORT.md
├── DEPLOYMENT_GUIDE.md
├── MONGODB_MIGRATION_GUIDE.md
└── .env.example
```

## Tech stack

- **Frontend:** React 19, Vite 6, Tailwind CSS
- **Backend:** Express 4, TypeScript, Mongoose 8 (MongoDB Atlas)
- **Auth:** JWT (bearer tokens) with server-side revocable sessions
- **Security:** helmet, cors, express-rate-limit, express-mongo-sanitize
- **AI lookups & Speaking Coach:** Alibaba Cloud Bailian / DashScope (Qwen, via the OpenAI-compatible `openai` client), mainland-China-reachable with no VPN required, with an offline local-dictionary fallback
"# Beihang-University-Mandarin-Flow" 
"# Update1" 
"# Buaa" 



git init

git add .

git commit -m "upload project"

git branch -M main

git remote remove origin

git remote add origin https://github.com/AmirRezaAfshar2007/buaa.git

git push -u origin main