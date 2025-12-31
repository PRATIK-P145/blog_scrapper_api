import requests
from bs4 import BeautifulSoup

BLOGS_URL = "https://beyondchats.com/blogs/"

def test_fetch_blogs_page():
    response = requests.get(BLOGS_URL)
    response.raise_for_status()  

    soup = BeautifulSoup(response.text, "html.parser")

    print("Page title:", soup.title.string)

def get_last_page_url():
    response = requests.get(BLOGS_URL)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    page_links = soup.find_all("a", class_="page-numbers")

    page_numbers = []
    for link in page_links:
        text = link.get_text().strip()
        if text.isdigit():
            page_numbers.append(int(text))

    last_page_number = max(page_numbers)

    last_page_url = f"{BLOGS_URL}page/{last_page_number}/"
    print("Last page URL:", last_page_url)

    return last_page_url


def fetch_last_page_articles():
    last_page_url = get_last_page_url()

    response = requests.get(last_page_url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    articles = soup.find_all("article", class_="entry-card")

    print("Total articles found on last page:", len(articles))

    for article in articles[:5]:
        title_tag = article.find("h2", class_="entry-title")
        date_tag = article.find("time", class_="ct-meta-element-date")

        if not title_tag:
            continue

        link_tag = title_tag.find("a")

        title = link_tag.get_text(strip=True)
        url = link_tag["href"]
        published_date = date_tag["datetime"] if date_tag else None

        print("Title:", title)
        print("URL:", url)
        print("Published:", published_date)
        print("------")

from datetime import datetime
import requests
from bs4 import BeautifulSoup

def extract_and_print_oldest_articles():
    last_page_url = get_last_page_url()

    response = requests.get(last_page_url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("article", class_="entry-card")

    for article in articles[:5]:
       
        title_tag = article.find("h2", class_="entry-title")
        if not title_tag:
            continue

        link_tag = title_tag.find("a")
        title = link_tag.get_text(strip=True)
        url = link_tag["href"]

    
        author_tag = article.find("a", class_="ct-meta-element-author")
        author = author_tag.get_text(strip=True) if author_tag else None

        date_tag = article.find("time", class_="ct-meta-element-date")
        published_date = date_tag["datetime"] if date_tag else None

 
        content = extract_article_content(url)

        article_data = {
            "title": title,
            "url": url,
            "author": author,
            "content": content,
            "published_date": published_date,
            "source": "beyondchats",
            "status": "original",
            "created_at": datetime.utcnow()
        }

        print("\n--- ARTICLE DATA ---")
        for key, value in article_data.items():
            if key == "content":
                print(f"{key}: {value[:300]}...")
            else:
                print(f"{key}: {value}")


def extract_article_content(article_url: str):
    response = requests.get(article_url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    content_div = soup.find(
        "div",
        class_="elementor-widget-theme-post-content"
    )

    if not content_div:
        print("Content container not found")
        return None

    text_blocks = content_div.find_all(["p", "h2", "h3"])

    content = []
    for block in text_blocks:
        text = block.get_text(strip=True)
        if text:
            content.append(text)

    full_content = "\n\n".join(content)

    print("Content preview:")
    print(full_content[:1500])  
    return full_content



