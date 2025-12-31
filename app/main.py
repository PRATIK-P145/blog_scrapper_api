from fastapi import FastAPI
from app.database import articles_collection

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "OK"}

@app.post("/test-db")
def test_db():
    article = {
        "title": "Test Article",
        "url": "https://example.com",
        "content": "Testing DB connection"
    }
    articles_collection.insert_one(article)
    return {"message": "Inserted successfully"}
