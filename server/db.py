import sqlite3

def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create a dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class DB:
    def __init__(self, dbfilename):
        self.dbfilename = dbfilename
        self.connection = sqlite3.connect(dbfilename)
        self.cursor = self.connection.cursor()

    def readAllRecords(self):
        self.cursor.execute("SELECT * FROM items")
        rows = self.cursor.fetchall()
        all = []
        for row in rows:
            d = dict_factory(self.cursor, row)
            all.append(d)
        return all

    def saveRecord(self, record):
        data = [record['name'], record['description']]
        self.cursor.execute("INSERT INTO items (name, description) VALUES (?, ?);", data)
        self.connection.commit()

    def deleteRecord(self, id):
        self.cursor.execute("DELETE FROM items WHERE id = ?", [id])
        self.connection.commit()

    def edited(self, id, dict):
        data = [dict["name"], dict["description"], id]
        self.cursor.execute("UPDATE items SET name=?, description=? WHERE id = ?;", data)
        self.connection.commit()

    def close(self):
        self.connection.close()

if __name__ == "__main__":
    db = DB('items.db')
    print(db.readAllRecords())