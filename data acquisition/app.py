from smartStoreScraper import SmartStoreScraper


class Application(object):
    def __init__(self, query, limit_page):
        self.limit_page = limit_page
        self.query = query
        self.app = SmartStoreScraper()
        self.result = []

    def start_process(self):
        items = []
        base_url = self.app.get_query_link(self.query, sort_option="rel")

        for i in range(1, self.limit_page):
            url = base_url + f"&pagingIndex={i}"
            json_data = self.app.get_query_json(url)
            items.extend(self.app.get_item_info(json_data))
        self.result.extend(self.filter_items(items))
        return self.result

    # only smartStore products
    @staticmethod
    def filter_items(items):
        filtered = set()

        for item in items:
            if 'smartstore.naver.com/' in item['링크'] and item['리뷰수'] > 0:
                filtered.add(item['링크'])
        return list(filtered)
