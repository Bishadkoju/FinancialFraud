import time
import json
import requests
import datetime
from kafka import KafkaProducer, KafkaClient


def get_random_transaction_data():
    try:
        url = 'http://0.0.0.0:3030/randomTransaction'
        r = requests.get(url)
        return r.text
    except:
        return "Error in Connection"


producer = KafkaProducer(bootstrap_servers=['localhost:9092'])

while True:
    data =  get_random_transaction_data()
    print(data)
    producer.send("Transaction", data.encode('utf-8'))
    time.sleep(1)


    

