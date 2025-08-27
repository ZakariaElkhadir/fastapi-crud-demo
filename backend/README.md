# FastAPI CRUD Demo (Users API)

This is a **mini full-stack project** backend built with **FastAPI** and **PostgreSQL**, providing CRUD operations for a `users` table.  
It is designed as a demonstration project for a full-stack internship.

---

## Features

- Create, read, update, and delete users
- PostgreSQL database integration
- Pydantic schemas for data validation
- Clean and modular FastAPI structure
- Ready to connect with a frontend (e.g., Next.js)

---

## Project Structure

```

backend/
│
├── app/
│   ├── main.py           # FastAPI app instance
│   ├── models.py         # SQLAlchemy models
│   ├── database.py       # Database connection & session
│   ├── schemas.py        # Pydantic models
│   ├── crud.py           # CRUD functions
│   └── routes/
│       └── users.py      # User API endpoints
├── requirements.txt      # Python dependencies
└── README.md

```

---

## Requirements

- Python 3.10+
- PostgreSQL database
- Packages listed in `requirements.txt`:
```

fastapi
uvicorn
sqlalchemy
psycopg2-binary

````

---

## Setup

1. Clone the repository:
```bash
git clone https://github.com/ZakariaElkhadir/fastapi-crud-demo.git
cd backend
````

2. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate       # Linux/macOS
venv\Scripts\activate          # Windows
pip install -r requirements.txt
```

3. Configure the database connection in `app/database.py`:

```python
DATABASE_URL = "postgresql://postgres:yourpassword@localhost/mini_project"
```

4. Run database migrations (tables will be created automatically):

```bash
python -m app.models
```

---

## Run the Backend

Start the FastAPI server with Uvicorn:

```bash
uvicorn app.main:app --reload
```

* The API will be available at: `http://127.0.0.1:8000`
* Interactive API docs: `http://127.0.0.1:8000/docs`

---

## API Endpoints

| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| GET    | /users      | Get all users           |
| GET    | /users/{id} | Get a single user       |
| POST   | /users      | Create a new user       |
| PUT    | /users/{id} | Update an existing user |
| DELETE | /users/{id} | Delete a user           |

---

## Notes

* This project is intended as a **learning/demo project**.
* You can connect it with a frontend (e.g., Next.js) for full-stack testing.
* All code is modular and easy to expand for larger projects.
