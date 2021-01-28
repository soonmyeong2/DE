from smartStoreScraper import SmartStoreScraper
import concurrent.futures


class Application(object):
    def __init__(self, query, limit_page):
        self.limit_page = limit_page
        self.query = query
        self.app = SmartStoreScraper()
        self.result = []

    def get_item_info(self, url):
        json_data = self.app.get_query_json(url)
        item_info = self.app.get_item_info(json_data)
        return item_info

    def start_process(self):
        base_url = self.app.get_query_link(self.query, sort_option="rel")

        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = []
            for i in range(1, self.limit_page):
                url = base_url + f"&pagingIndex={i}"
                future = executor.submit(self.get_item_info, url)
                futures.append(future)

            for future in concurrent.futures.as_completed(futures):
                self.result.extend(future.result())
        return self.filter_items(self.result)

    # only smartStore products
    @staticmethod
    def filter_items(items):
        filtered = set()

        for item in items:
            if 'smartstore.naver.com/' in item['링크'] and item['리뷰수'] > 0:
                filtered.add(item['링크'])
        return list(filtered)
