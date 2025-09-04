#!/bin/bash

# Full Stack Startup Script
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Full Stack Demo...${NC}"

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Quick checks
[ ! -d "$BACKEND_DIR" ] && { echo -e "${RED}❌ Backend directory not found${NC}"; exit 1; }
[ ! -d "$FRONTEND_DIR" ] && { echo -e "${RED}❌ Frontend directory not found${NC}"; exit 1; }
[ ! -f "$BACKEND_DIR/requirements.txt" ] && { echo -e "${RED}❌ requirements.txt not found${NC}"; exit 1; }
[ ! -d "$BACKEND_DIR/.venv" ] && { echo -e "${RED}❌ Virtual environment not found${NC}"; exit 1; }
[ ! -f "$FRONTEND_DIR/package.json" ] && { echo -e "${RED}❌ package.json not found${NC}"; exit 1; }
[ ! -d "$FRONTEND_DIR/node_modules" ] && { echo -e "${RED}❌ node_modules not found${NC}"; exit 1; }

echo -e "${GREEN}✅ All checks passed${NC}"

# Create backend script
cat > "$BACKEND_DIR/start_backend.sh" << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
source .venv/bin/activate
echo "🌐 Starting FastAPI on http://127.0.0.1:8000"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
EOF

# Create frontend script
cat > "$FRONTEND_DIR/start_frontend.sh" << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
echo "⚛️  Starting Next.js on http://localhost:3000"
npm run dev
EOF

chmod +x "$BACKEND_DIR/start_backend.sh" "$FRONTEND_DIR/start_frontend.sh"

# Try to open terminals
if command -v gnome-terminal >/dev/null 2>&1; then
    gnome-terminal --tab --working-directory="$BACKEND_DIR" -- ./start_backend.sh &
    gnome-terminal --tab --working-directory="$FRONTEND_DIR" -- ./start_frontend.sh &
elif command -v tmux >/dev/null 2>&1; then
    tmux kill-session -t fullstack 2>/dev/null || true
    tmux new-session -d -s fullstack -c "$BACKEND_DIR" './start_backend.sh'
    tmux split-window -h -t fullstack -c "$FRONTEND_DIR" './start_frontend.sh'
    tmux attach-session -t fullstack
    exit
else
    echo -e "${BLUE}No GUI terminal found. Starting backend only...${NC}"
    echo "Manual frontend start: cd $FRONTEND_DIR && ./start_frontend.sh"
    cd "$BACKEND_DIR" && exec ./start_backend.sh
fi

echo -e "${GREEN}✅ Servers starting!${NC}"
echo "Backend: http://127.0.0.1:8000"
echo "Frontend: http://localhost:3000"
