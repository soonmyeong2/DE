import requests
from bs4 import BeautifulSoup
import json
from time import sleep


class ReviewScraper:
    def __init__(self):
        self.base_url = 'https://smartstore.naver.com/i/v1/reviews/paged-reviews'
        self.scraped_reviews = []
        self.user_agent = {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/85.0.4183.121 Safari/537.36 '
        }

    def get_store_data(self, link):
        r = requests.get(link, headers=self.user_agent)

        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser').find('body').find('script').string[27:]
            json_dict = json.loads(soup)
            merchant_no = json_dict['smartStore']['channel']['payReferenceKey']
            product_no = json_dict['product']['A']['productNo']
            data = {
                'merchant_no': merchant_no,
                'product_no': product_no
            }
        else:
            sleep(3)
            print(f"네트워크 에러 발생, 스토어 링크 확인 필요 {link}")
            with open('bug_report.txt', 'a', encoding='utf-8-sig') as f:
                f.write(f"스토어 사이트 에러\t{link}\n")
            return
        return data

    def get_review_json(self, merchant_no, product_no, page):
        payload = {
            'page': page,
            'pageSize': '20',
            'merchantNo': merchant_no,
            'originProductNo': product_no,
            'sortType': 'REVIEW_RANKING'
        }
        r = requests.get(self.base_url, params=payload, headers=self.user_agent)
        if r.status_code == 200:
            data = r.json(encoding='utf-8')
        else:
            print(f"네트워크 에러 발생, 페이지 {page} 확인 필요.")
            with open('output/bug_report.txt', 'a') as f:
                f.write(f"리뷰 페이지 에러\t{r.url}\n")
        return data

    @staticmethod
    def count_review(reviews, review_content):
        for review in review_content:
            # print(review['reviewContent'])
            reviews.append('1')
