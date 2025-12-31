from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Article(BaseModel):
    title: str
    url: str
    content: Optional[str] = None
    published_date: Optional[str] = None
    created_at: datetime = datetime.utcnow()
