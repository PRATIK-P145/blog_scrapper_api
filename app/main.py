from fastapi import FastAPI
from app.database import db
from app.models import ArticleCreate

app = FastAPI()



@app.post("/articles")
def create_article(article: ArticleCreate):
    article_dict = article.dict()
    result = db.articles.insert_one(article_dict)

    return {
        "message": "Article created successfully",
        "id": str(result.inserted_id)
    }