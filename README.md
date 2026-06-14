# TranscribeFlow — Free Audio Transcription SaaS

A free, private audio transcription app. Upload audio → get timestamped transcripts in `[MM:SS] text` format. Built with **Next.js 14** (Tailwind CSS) + **FastAPI** (faster-whisper).

## Local Development

### Prerequisites

- Python 3.11+
- Node.js 18+
- ffmpeg (already installed on this machine)

### 1. Backend (FastAPI + faster-whisper)

```bash
cd backend
pip install -r requirements.txt
python main.py
# → http://localhost:8000
```

### 2. Frontend (Next.js)

```bash
# From project root
cp .env.local.example .env.local
npm install
npx next dev --port 3000
# → http://localhost:3000
```

### 3. Open http://localhost:3000

---

## 🚀 Free Deployment Options

### 🥇 Option A: Hugging Face Spaces (Backend) + Vercel (Frontend)

Best for ML workloads — HF Spaces gives you **2 vCPU, 16GB RAM** free.

#### Backend → Hugging Face Spaces

1. **Create a separate repo** for the backend:
   ```bash
   cd C:\Users\iron5\transcribe-app
   mkdir ../transcribe-flow-backend
   cp backend/* ../transcribe-flow-backend/
   cd ../transcribe-flow-backend
   git init && git add . && git commit -m "Initial"
   # Create repo on GitHub: transcribe-flow-backend
   git remote add origin https://github.com/YOUR_USER/transcribe-flow-backend.git
   git push -u origin main
   ```

2. **Create a Hugging Face Space:**
   - Go to https://huggingface.co/new-space
   - Name: `transcribe-flow-backend`
   - **SDK: Docker**
   - Space Hardware: **CPU free** (2 vCPU, 16GB RAM)
   - Connect your GitHub repo
   - Set env var `PORT=7860` in Space settings

3. **Wait 5 minutes** for the build. Your API will be at:
   `https://YOUR_USER-transcribe-flow-backend.hf.space`

#### Frontend → Vercel

1. Push the frontend to a separate GitHub repo (the project root without `backend/`):
   ```bash
   cd C:\Users\iron5\transcribe-app
   # Remove backend from git tracking if needed
   echo "backend/" >> .gitignore
   ```

2. Push to GitHub repo `transcribe-flow-frontend`

3. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your `transcribe-flow-frontend` repo
   - Framework: **Next.js**
   - Environment variable: `NEXT_PUBLIC_API_URL=https://YOUR_USER-transcribe-flow-backend.hf.space`
   - Deploy! Your app at: `https://transcribe-flow-frontend.vercel.app`

---

### 🥈 Option B: Koyeb (All-in-One, Docker)

**1 vCPU, 512MB RAM, always-on, 100GB bandwidth — free.**

1. **Push the whole repo to GitHub** (Dockerfile is already in `backend/`)

2. **Go to https://app.koyeb.com** → Create App
   - **Docker** from GitHub
   - Select your repo
   - Build command: `docker build -f backend/Dockerfile -t transcribe-flow ./backend`
   - Run command: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - Port: **8000**
   - Environment variable: `PORT=8000`
   - **Deploy**

3. **Deploy frontend** as a **second service** on Koyeb:
   - Source: GitHub (same repo)
   - Builder: **Buildpacks** (auto-detect Node.js)
   - Build command: `npm install && npm run build`
   - Run command: `npm start`
   - Port: **3000**
   - Env var: `NEXT_PUBLIC_API_URL=https://backend-service-name.koyeb.app`
   - **Deploy**

---

### 🥉 Option C: Render.com (Simplest, but sleeps)

**512MB RAM, free but sleeps after 15 min inactivity.**

1. **Push to GitHub**

2. **Backend Web Service:**
   - https://dashboard.render.com/select-repo
   - Root Directory: `backend`
   - Runtime: **Docker**
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
   - Env var: `PORT=10000`
   - **Free plan** (sleeps after inactivity)

3. **Frontend Static Site:**
   - Use Vercel (free, no sleeping) or
   - Render as another Web Service with Node Buildpacks
   - Env var: `NEXT_PUBLIC_API_URL=https://backend.onrender.com`

---

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Browser     │────▶│  Next.js      │────▶│  FastAPI      │
│  (Upload)    │     │  (Frontend)   │     │  (Backend)    │
└─────────────┘     └──────────────┘     │  + Whisper    │
                                          └──────────────┘
                                              │
                                          ┌───▼────────┐
                                          │  Audio File │
                                          │  (Deleted   │
                                          │  after use) │
                                          └─────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, React 18, Tailwind CSS, Lucide icons |
| **Backend** | FastAPI, faster-whisper (tiny model) |
| **Audio** | ffmpeg (system) |
| **Design** | Linear-inspired SaaS (see `DESIGN.md`) |
