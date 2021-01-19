from smartStoreScraper import SmartStoreScraper
from datetime import datetime, timedelta


class Application(object):
    def __init__(self, query, delay, limit_page):
        self.limit_page = limit_page
        self.query = query
        self.delay = delay
        self.app = SmartStoreScraper()
        self.result = []
        self.now = datetime.now()
        self.date_before_3months = self.now - timedelta(days=90)

    def start_process(self):
        items = []
        for i in range(1, self.limit_page):
            url = self.app.get_query_link(i, self.query, sort_option="rel")
            json_data = self.app.get_query_json(url)
            items.extend(self.app.get_item_info(json_data))
        self.result.extend(self.filter_items(items, 1))

        if len(self.result) == 0:
            exit(0)
        return self.result

    # only smartStore products
    def filter_items(self, items, filter_option):
        filtered = set()
        if filter_option == 1:
            for item in items:
                # condition: 네이버 랭킹순
                if 'smartstore.naver.com/' in item['링크'] and item['리뷰수'] > 0:
                    filtered.add(item['링크'])
        elif filter_option == 2:
            for item in items:
                # condition: 리뷰순 페이지에서 리뷰수 >=500, 최근 3개월.
                if 'smartstore.naver.com/' in item['링크'] and item['리뷰수'] >= 500 \
                        and item['날짜'] > self.date_before_3months.date():
                    filtered.add({'keyword': self.query, 'names': item['쇼핑몰명'], 'link': item['링크']})
            try:
                filtered = filtered[:2]
            except IndexError:
                pass
        else:
            for item in items:
                # condition: 리뷰순 페이지에서 제일 많은 리뷰 2개.
                if 'smartstore.naver.com/' in item['링크']:
                    filtered.add({'keyword': self.query, 'names': item['쇼핑몰명'], 'link': item['링크']})
                    if len(filtered) >= 2:
                        break
        return list(filtered)
