import json
from kafka import KafkaConsumer, KafkaProducer
import random


from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client['TransactionDB']
collection = db['transaction']

consumer = KafkaConsumer('Transaction' ,bootstrap_servers=['localhost:9092'])

producer = KafkaProducer(bootstrap_servers=['localhost:9092'])

def checkFraudulent(data):
    # Check if the transaction is fraudulent
    return random.uniform(0, 1) < 0.1

for msg in consumer:
    if msg.value.decode("utf-8")!="Error in Connection":
        #data=structure_validate_data(msg)
        transaction_data = json.loads(msg.value)
        # Drop unnecessary columns
        data ={
            'transaction_id': str(msg.timestamp),
            'customer_id': transaction_data['customer'][1:-1],
            'step': transaction_data['step'][1:-1],
            'age': transaction_data['age'][1:-1],
            'gender':transaction_data['gender'][1:-1],
            'category': transaction_data['category'][1:-1],
            'merchant': transaction_data['merchant'][1:-1],
            'amount': transaction_data['amount'][1:-1],
            'status': 'Success'
        }
        data['fraudulent'] = checkFraudulent(data)
        if(data['fraudulent'] or collection.find_one({'customer_id': data['customer_id'], 'fraudulent': True }) ):
            data['status'] = 'Suspicious'
        
        collection.insert(data)
        print(msg)
        print(data)