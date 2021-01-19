import pandas as pd
import time
from app import Application

from reviewScraper import ReviewScraper


class Worker:
    def __init__(self, stop_thread, limit_page, limit=None, delay_time=0):
        self.stop_thread = stop_thread
        self.limit = limit
        self.limit_page = limit_page
        self.delay_time = delay_time
        self.target_variable = ['평점', '아이디', '구매날짜', '구매한옵션', '리뷰내용']
        self.links = []
        self.get_input_keyword()
        self.extract_file()

    def get_input_keyword(self):
        keyword = input("search : ").strip()
        app = Application(keyword, self.delay_time, self.limit_page)
        self.links = app.start_process()

    def extract_file(self):
        print(f" ### total item : {len(self.links)} ### ")
        for link in self.links:
            if self.stop_thread.is_set():
                print("program forced to stop!\n")
                break
            else:
                print(f" ------------ {link} 수집 시작 ------------ ")
                app = ReviewScraper()
                REVIEWS = app.scraped_reviews

                store_data = app.get_store_data(link)  # 스토어 정보
                try:
                    # 리뷰 정보 리퀘스트
                    json_review = app.get_review_json(store_data['merchant_no'], store_data['product_no'], 1)
                except TypeError:
                    continue

                review_data = app.get_review_data(json_review)  # 해당 아이템 리뷰 (총 아이템수 + 총 페이지수) 정보
                total_element = review_data['totalElements']  # 총 아이템수
                total_pages = review_data['totalPages']  # 총 페이지수
                print(f'총 아이템 수: {total_element}\t총 페이지 수: {total_pages}\t제한: {self.limit}')
                time.sleep(self.delay_time)

                review_content = app.get_review_content(json_review)  # 목표 데이터
                app.scrape_review_contents(REVIEWS, review_content)  # 첫 페이지 크롤링

                if self.limit >= total_element or self.limit == 0:
                    self.start_scraper(app, REVIEWS, total_element, total_pages, store_data)
                else:
                    self.start_scraper(app, REVIEWS, self.limit, total_pages, store_data)
        return

    def start_scraper(self, app, REVIEWS, LIMIT, PAGES, store_data):
        while len(REVIEWS) < LIMIT:
            # already scraped first page
            for page in range(2, PAGES + 1):
                json = app.get_review_json(store_data['merchant_no'], store_data['product_no'], page)
                content = app.get_review_content(json)
                app.scrape_review_contents(REVIEWS, content)
                time.sleep(self.delay_time)
                if len(REVIEWS) >= LIMIT:
                    break
