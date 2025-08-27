#!/bin/bash

# FastAPI Server Startup Script
# This script activates the virtual environment and starts the FastAPI server

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting FastAPI CRUD Demo Server...${NC}"
echo "=================================="

# Check if we're in the backend directory
if [ ! -f "requirements.txt" ]; then
    echo -e "${RED}❌ Error: Must run this script from the backend directory${NC}"
    echo "Please run: cd backend && ./start_server.sh"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo -e "${RED}❌ Error: Virtual environment not found${NC}"
    echo "Please create virtual environment first:"
    echo "python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
    exit 1
fi

# Activate virtual environment
echo -e "${BLUE}📦 Activating virtual environment...${NC}"
source .venv/bin/activate

# Check if dependencies are installed
echo -e "${BLUE}🔍 Checking dependencies...${NC}"
if ! python -c "import fastapi, uvicorn, sqlalchemy, psycopg2" 2>/dev/null; then
    echo -e "${RED}❌ Dependencies missing. Installing...${NC}"
    pip install -r requirements.txt
fi

# Check database connection
echo -e "${BLUE}🗄️  Checking database connection...${NC}"
if ! python -c "
import os
from dotenv import load_dotenv
load_dotenv()
password = os.getenv('PASSWORD')
if not password:
    print('ERROR: PASSWORD environment variable not set')
    exit(1)
from sqlalchemy import create_engine, text
engine = create_engine(f'postgresql://postgres:{password}@localhost/mini_project')
with engine.connect() as conn:
    conn.execute(text('SELECT 1'))
print('Database connection successful')
" 2>/dev/null; then
    echo -e "${RED}❌ Database connection failed${NC}"
    echo "Please ensure:"
    echo "1. PostgreSQL is running"
    echo "2. Database 'mini_project' exists"
    echo "3. .env file exists with PASSWORD=your_postgres_password"
    exit 1
fi

echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""
echo -e "${BLUE}🌐 Starting FastAPI server...${NC}"
echo "Server will be available at: http://127.0.0.1:8000"
echo "API Documentation: http://127.0.0.1:8000/docs"
echo "Users endpoint: http://127.0.0.1:8000/users/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
