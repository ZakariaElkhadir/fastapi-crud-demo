# FastAPI CRUD Demo 🚀

<div align="center">
  <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin: 20px 0;">
    <img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js" style="filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5)); animation: glow 2s ease-in-out infinite alternate;" />
    <span style="font-size: 2rem; color: #888; animation: pulse 2s infinite;">+</span>
    <img src="https://skillicons.dev/icons?i=fastapi" alt="FastAPI" style="filter: drop-shadow(0 0 20px rgba(0, 255, 0, 0.5)); animation: glow 2s ease-in-out infinite alternate;" />
  </div>

</div>

A modern fullstack web application demonstrating CRUD operations with FastAPI backend and Next.js frontend. This project showcases user management functionality with a clean, responsive interface.

## 🏗️ Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **PostgreSQL** - Reliable relational database
- **SQLAlchemy** - Python SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server for serving the API

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with modern hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons

## 📋 Features

- ✅ **Create** - Add new users with name, email, and description
- 📖 **Read** - View all users in a responsive card layout
- ✏️ **Update** - Edit existing user information
- 🗑️ **Delete** - Remove users from the database
- 🎨 **Modern UI** - Clean, gradient-based design with animations
- 📱 **Responsive** - Works on desktop and mobile devices
- ⚡ **Fast** - Built with performance in mind
- 🔄 **Real-time** - Instant updates after CRUD operations

## 🚦 Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ZakariaElkhadir/fastapi-crud-demo
cd fastapi-crud-demo
```

### 2. Database Setup

Create PostgreSQL database and tables:
```bash
# Connect to PostgreSQL
psql -U postgres

# Run the schema script
\i backend/schema.sql
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
echo "PASSWORD=your_postgres_password" > .env

# Start the server
./start_server.sh
```

The FastAPI server will start at `http://127.0.0.1:8000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The Next.js app will start at `http://localhost:3000`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/users/` | Get all users |
| `POST` | `/users/` | Create a new user |
| `GET` | `/users/{id}` | Get user by ID |
| `PUT` | `/users/{id}` | Update user |
| `DELETE` | `/users/{id}` | Delete user |

### API Documentation
Visit `http://127.0.0.1:8000/docs` for interactive Swagger documentation.

## 📱 Usage

1. **View Users**: All users are displayed in cards on the main page
2. **Add User**: Click the green "+" button to open the create form
3. **Edit User**: Click "Edit User" button on any user card
4. **Delete User**: Click "Delete User" button (with confirmation)

## 🏗️ Project Structure

```
fastapi-crud-demo/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI application
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── crud.py          # Database operations
│   │   ├── database.py      # Database configuration
│   │   └── routes/
│   │       └── users.py     # User API routes
│   ├── requirements.txt     # Python dependencies
│   ├── schema.sql          # Database schema
│   ├── start_server.sh     # Server startup script
│   └── .env               # Environment variables
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Main page component
│   │   ├── layout.tsx      # App layout
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── Form.tsx        # User form component
│   ├── package.json        # Node dependencies
│   └── next.config.ts      # Next.js configuration
└── README.md              # This file
```

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
python -m pytest

# Frontend linting
cd frontend
npm run lint
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build
npm start

# Backend production server
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 🌟 Key Features Explained

### Backend Features
- **CORS enabled** for frontend communication
- **Automatic database table creation** using SQLAlchemy
- **Data validation** with Pydantic schemas
- **Error handling** with proper HTTP status codes
- **Modular structure** with separated concerns

### Frontend Features
- **Server-side rendering** with Next.js App Router
- **Type safety** throughout with TypeScript
- **Modern React patterns** using hooks and functional components
- **Responsive design** with Tailwind CSS
- **Loading states** and error handling
- **Modal forms** for better UX

## 🚨 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify database `mini_project` exists

2. **CORS errors**
   - Backend allows `http://localhost:3000` by default
   - Update `main.py` if using different frontend URL

3. **Port conflicts**
   - Backend runs on port 8000
   - Frontend runs on port 3000
   - Change ports in respective config files if needed
