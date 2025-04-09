from fastapi import FastAPI
from sqlalchemy import create_engine, MetaData
from databases import Database

app = FastAPI()

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

@app.get("/")
async def root():
     return {"message": "Hello World"}