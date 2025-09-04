#!/bin/bash
cd "$(dirname "$0")"
source .venv/bin/activate
echo "🌐 Starting FastAPI on http://127.0.0.1:8000"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
