from time import sleep
from tqdm import trange
from app import Application

from reviewScraper import ReviewScraper


class Worker:
    def __init__(self, stop_thread, limit_page, keyword, db, limit=None, delay_time=0):
        self.stop_thread = stop_thread
        self.limit = limit
        self.db = db
        self.keyword = keyword
        self.limit_page = limit_page
        self.delay_time = delay_time
        self.links = []
        self.get_link_to_keyword()
        self.extract_data()

    def get_link_to_keyword(self):
        app = Application(self.keyword, self.limit_page)
        self.links = app.start_process()

    def extract_data(self):
        for i in trange(len(self.links), desc="진행도"):
            if self.stop_thread.is_set():
                print("program forced to stop!\n")
                break
            else:
                # print(f" ------------ {self.links[i]} ------------ ")
                app = ReviewScraper()
                reviews = app.scraped_reviews
                store_data = app.get_store_data(self.links[i])  # 스토어 정보

                try:
                    # 리뷰 정보 리퀘스트
                    json_review = app.get_review_json(store_data['merchant_no'], store_data['product_no'], 1)
                except TypeError:
                    continue

                total_pages, total_elements = json_review['totalPages'], json_review['totalElements']
                # print(f'총 페이지 수: {total_pages}\t총 아이템 수: {total_elements}\t제한: {self.limit}')

                if self.limit >= total_elements or self.limit == 0:
                    self.start_scraper(app, reviews, total_elements, total_pages, store_data)
                else:
                    self.start_scraper(app, reviews, self.limit, total_pages, store_data)

    def start_scraper(self, app, reviews, limit, pages, store_data):
        while len(reviews) < limit:
            for page in range(1, pages + 1):
                json = app.get_review_json(store_data['merchant_no'], store_data['product_no'], page)
                self.db.insert_item(json['contents'])
                app.count_review(reviews, json['contents'])
                sleep(self.delay_time)
                if len(reviews) >= limit:
                    break
