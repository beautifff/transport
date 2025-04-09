from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, MetaData
from databases import Database
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

# Добавляем CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React приложение
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

# Модели данных
class PriceRequest(BaseModel):
    fromCity: str
    toCity: str
    date: str

class TransportResult(BaseModel):
    type: str
    company: str
    departureTime: str
    arrivalTime: str
    duration: str
    price: float

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

@app.post("/api/compare-prices")
async def compare_prices(request: PriceRequest) -> List[TransportResult]:
    # Здесь будет логика получения данных из разных API
    # Пока возвращаем тестовые данные
    return [
        TransportResult(
            type="Train",
            company="Deutsche Bahn",
            departureTime="09:00",
            arrivalTime="11:00",
            duration="2h 0m",
            price=49.90
        ),
        TransportResult(
            type="Bus",
            company="FlixBus",
            departureTime="08:30",
            arrivalTime="11:30",
            duration="3h 0m",
            price=29.90
        )
    ]