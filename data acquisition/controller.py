from threading import Thread, Event
from worker import Worker
from pipelines import MongoPipeline

# LIMIT : the number of reviews of products, 0 is unlimited
LIMIT = 20
LIMIT_PAGE = 10
DELAY_TIME = 2
MONGO_URI = 'mongodb://20.194.18.75:27017'
MONGO_DATABASE = 'REVIEW_EARLY'
MONGO_COLLECTION = 'reviews'


class Controller(object):
    def __init__(self):
        self.thread = None
        self.stop_thread = Event()

    def scraping(self):
        keyword = input("search : ").strip()
        db = MongoPipeline(MONGO_URI, MONGO_DATABASE, MONGO_COLLECTION)
        Worker(self.stop_thread, LIMIT_PAGE, keyword, db, limit=LIMIT, delay_time=DELAY_TIME)
        print('done')

    def start(self):
        self.stop_thread.clear()
        self.thread = Thread(target=self.scraping)
        self.thread.start()

    def stop(self):
        self.stop_thread.set()
        self.thread.join()
        self.thread = None
