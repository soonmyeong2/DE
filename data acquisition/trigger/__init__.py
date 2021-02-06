import logging
import grequests
from pymongo import MongoClient
import azure.functions as func


def is_keyword_searched(keyword):
    connection = MongoClient('your mongoDB')
    db = connection['REVIEW_EARLY']
    collection = db['reviews']
    return bool(collection.find_one({"keyword": keyword}))


def main(req: func.HttpRequest) -> func.HttpResponse:
    keyword = req.params.get('keyword')
    logging.info(f'Python HTTP trigger function processed a request. (keyword={keyword})')
    
    if is_keyword_searched(keyword):
        return func.HttpResponse(f"this keyword has already been found.", status_code=200)

    crawlers = [
        '''
        your crawler APIs
        '''
    ]

    rs = (grequests.get(crawler, timeout=1) for crawler in crawlers)
    grequests.map(rs)
    return func.HttpResponse(f"crawler has run.", status_code=200)
