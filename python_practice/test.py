'''

Author : Vipul Patel
Description : Create extraction process and save data in JSON format

'''

import json
from scrapy.cmdline import execute

import scrapy


class Teradek(scrapy.Spider):
    name = 'teradek'
    items = list()

    def start_requests(self):
        link = 'https://teradek.com/collections/colr/products/anton-bauer-digital-battery?variant=14579487277101'
        yield scrapy.Request(url=link, callback=self.parse)

    def parse(self, response):
        details = response.xpath('//script[contains(text(),"var meta")]//text()').get(default='')
        getJson = details.split('var meta = ')[1].split('}};')[0] + '}}'
        getDetails = json.loads(getJson)
        getDetails = getDetails['product']['variants']
        for getDetail in getDetails:
            item = dict()
            item['title'] = getDetail['name']
            item['price'] = getDetail['price'] / 100
            item['sku'] = getDetail['sku']
            self.items.append(item)

    def close(spider, reason):
        with open('python_output.json', 'w') as file_object:  # open the file in write mode
            json.dump(Teradek.items, file_object)


execute('scrapy runspider test.py -o result.json -t json'.split())
