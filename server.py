
import time
import random
from datetime import datetime
from flask import Flask, Response, request
from flask_cors import CORS, cross_origin
import csv

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client['TransactionDB']
collection = db['transaction']

data = []
data_header=[]
with open('data.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print('Column names are ')
            print(", ".join(row))
            data_header=row
            line_count += 1
        else:
            data.append(row)
            line_count += 1
    print(data[0])
    print(data_header)
    print(dict(zip(data_header, data[0])))
    #print(data)

app = Flask(__name__)
CORS(app)

@app.route('/')
def get_all_transactions():
    print(collection.find_one())
    transactions = []
    entries = collection.find()
    for entry in entries:
        entry.pop('_id')
        transactions.append(entry)

    return ({'transactions': transactions})
    pass

@app.route('/setFraudulent',methods = ['POST'])
def set_fraudulent_transaction():
    id = request.form['id']
    value = request.form['value'] == 'true'
    print(bool(value))
    match = collection.find_one({"transaction_id": id})
    if(match):
        collection.update_one({"transaction_id": id}, {"$set": {'fraudulent': value, "status": "Suspicious" if value else "Success" }})
        return Response('Updated')
    
    print(match)
    return Response("Match Not found")

@app.route('/randomTransaction')
def get_random_transaction_data():
    data_count = len(data)
    index = int(round(random.uniform(0, data_count)))
    response = dict(zip(data_header, data[index]))
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0',port='3030', debug=True)
