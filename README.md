
# BeyondChats Blog Scraper API

## Project Overview

This project is a backend service built using **FastAPI** and **MongoDB** to scrape blog articles from the BeyondChats website and expose them via REST APIs.
The project is being developed **phase-wise**, focusing first on solid backend foundations before adding scraping and advanced logic.

---

## Tech Stack

* **FastAPI** – REST API framework
* **MongoDB (local)** – Data storage
* **PyMongo** – MongoDB client
* **BeautifulSoup + Requests** – Web scraping (Phase 1 upcoming)
* **Uvicorn** – ASGI server

---

## Current Phase: Phase 1 (In Progress)
- Scrape articles from the last page of the blogs section of BeyondChats.
(You can fetch the 5 oldest articles) URL: https://beyondchats.com/blogs/
- Store these articles in a database. 
- Create CRUD APIs these articles

### What is completed 

#### 1. Project Setup

* Initialized project structure and Git repository
* Set up FastAPI application
* Configured environment using `requirements.txt`

#### 2. MongoDB Integration

* Established MongoDB connection using PyMongo
* Verified database connectivity
* Inserted test data to confirm read/write operations
* MongoDB connection logic isolated in `database.py`

#### 3. Article Data Model

* Defined article schema using Pydantic
* Fields include:

  * `title`
  * `url`
  * `content`
  * `published_date`
  * `source`
  * `status` (to be actively used in Phase 2)
  * `references`

#### 4. API Endpoints Implemented

* **Health Check**

  * `GET /health`
* **Create Article**

  * `POST /articles`
  * Accepts article data and stores it in MongoDB
* **Fetch Article by ID**

  * `GET /articles/{article_id}`
  * Handles MongoDB ObjectId validation properly

All endpoints are testable via **Swagger UI (`/docs`)** and `curl`.

---

## API Example (POST)

```json
POST /articles
{
  "title": "Test article",
  "url": "https://example.com",
  "content": "This article is inserted using POST API",
  "published_date": "2025-12-31T05:54:55.661Z",
  "source": "beyondchats",
  "status": "original",
  "references": []
}
```

---

## Next Goal: Pagination Logic & Scraping Strategy (Phase 1)

### What am I aiming to do

Scrape **only the 5 oldest articles** from BeyondChats blog.

---

## Pagination Logic 

### Observed URL Pattern

```
https://beyondchats.com/blogs/page/{page_number}/
```

### How last page will be identified

1. Fetch the first blog page:

   ```
   https://beyondchats.com/blogs/
   ```
2. Inspect pagination section in HTML
3. Identify all links with:

   ```html
   <a class="page-numbers">...</a>
   ```
4. Extract the **maximum page number** (e.g., `15`)
5. Treat this as the **last page**

Example pagination element:

```html
<a class="page-numbers" href="https://beyondchats.com/blogs/page/15/">15</a>
```

---

### Scraping Strategy (Upcoming)

* Navigate to the **last page**
* Extract article cards from that page
* Select **only 5 articles**
* Scrape:

  * Title
  * URL
  * Content
  * Published date (if available)
* Store scraped articles in MongoDB via existing logic

---

