from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, MetaData
from databases import Database

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL фронтенда
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"

database = Database(DATABASE_URL)
metadata = MetaData()

# Пример модели
from sqlalchemy import Table, Column, Integer, String

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(50)),
    Column("email", String(50)),
)

# Подключение к базе данных
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Тестовый эндпоинт
@app.get("/api/test")
async def test():
    return {"message": "Backend is connected!"}