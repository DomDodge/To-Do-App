from flask import Flask, request
#from dummydb import DummyDB
from db import DB

app = Flask(__name__)

@app.route("/items/<int:id>", methods=["OPTIONS"])
def doPreflight(id):
    return '', 204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }

@app.route("/items", methods=['GET'])
def getItems():
    db = DB("items.db")
    items = db.readAllRecords()

    return items, {"Access-Control-Allow-Origin":"*"}

@app.route("/items", methods=['POST'])
def createItem():
    db = DB("items.db")
    print(request.form)
    # items.append(request.form['name'])
    d = {'name' : request.form['name'],
         'description' : request.form['description'],
         }
    db.saveRecord(d)
    return "Created", "201", {"Access-Control-Allow-Origin":"*"}

@app.route("/items/<int:id>", methods=['DELETE'])
def deleteItem(id):
    print("I am deleting the trail: ", id)
    db = DB("items.db")
    db.deleteRecord(id)
    return "Deleted", "200", {"Access-Control-Allow-Origin": "*"}

@app.route("/items/<int:id>", methods=['PUT'])
def editItem(id):
    db = DB("items.db")
    print(request.form)
    # items.append(request.form['name'])
    d = {'name' : request.form['name'],
         'description' : request.form['description'],
         }
    db.edited(id, d)
    return "Edited", "200", {"Access-Control-Allow-Origin":"*"}


def main():
    app.run()
    
main()