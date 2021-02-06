import pymongo


class MongoPipeline(object):
    def __init__(self, mongo_uri, db_name, collection_name):
        self.client = pymongo.MongoClient(mongo_uri)
        self.db = self.client[db_name]
        self.collection_name = collection_name

    def __del__(self):
        self.client.close()

    def insert_item(self, item):
        self.db[self.collection_name].insert_many(item)
