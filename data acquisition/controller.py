from threading import Thread, Event
from worker import Worker

# limit the number of reviews of products, 0 is unlimited
LIMIT = 20
LIMIT_PAGE = 10
DELAY_TIME = 2.0


class Controller(object):
    def __init__(self):
        self.thread = None
        self.stop_thread = Event()

    def scraping(self):
        Worker(self.stop_thread, LIMIT_PAGE, limit=LIMIT, delay_time=DELAY_TIME)
        print('done')

    def start(self):
        self.stop_thread.clear()
        self.thread = Thread(target=self.scraping)
        self.thread.start()

    def stop(self):
        self.stop_thread.set()
        self.thread.join()
        self.thread = None
