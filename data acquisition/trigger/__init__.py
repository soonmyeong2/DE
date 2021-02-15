import logging
import grequests
from pymongo import MongoClient
from datetime import datetime
import azure.functions as func


def keyword_count(keyword, db):
    collection = db['keyword']
    collection.update_one({'keyword': keyword},
                          {
                              '$set': {'timeStamp': datetime.now()},
                              '$inc': {'count': 1}
                          },
                          upsert=True)


def is_keyword_searched(keyword, db):
    collection = db['reviews']
    data = collection.find_one({"keyword": keyword})
    try:
        return (datetime.now() - data['timeStamp']).seconds < 3600 * 24
    except:
        return bool(data)


def main(req: func.HttpRequest) -> func.HttpResponse:
    keyword = req.params.get('keyword')
    connection = MongoClient('mongodb://id:pwd@host:port/dbname')
    db = connection['REVIEW_EARLY']
    logging.info(f'Python HTTP trigger function processed a request. (keyword={keyword})')

    keyword_count(keyword, db)
    if is_keyword_searched(keyword, db):
        return func.HttpResponse("this keyword has already been found.", status_code=204)

    crawlers = [
        # crawler API
    ]

    rs = (grequests.get(crawler, timeout=1) for crawler in crawlers)
    grequests.map(rs)
    return func.HttpResponse(f"crawler has run.", status_code=201)
