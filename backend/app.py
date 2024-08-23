from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://grocery_user:12345@mysql-service/grocery_list_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define a model for grocery items
class GroceryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<GroceryItem {self.name}>'

# Create the database tables
with app.app_context():
    db.create_all()

# Route to create a new grocery item
@app.route('/grocery', methods=['POST'])
def create_grocery():
    data = request.get_json()
    new_item = GroceryItem(name=data['name'], quantity=data['quantity'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Grocery item created!'}), 201

# Route to read all grocery items
@app.route('/grocery', methods=['GET'])
def get_groceries():
    groceries = GroceryItem.query.all()
    output = []
    for item in groceries:
        grocery_data = {'id': item.id, 'name': item.name, 'quantity': item.quantity}
        output.append(grocery_data)
    return jsonify({'groceries': output})

# Route to read a single grocery item by ID
@app.route('/grocery/<id>', methods=['GET'])
def get_grocery(id):
    item = GroceryItem.query.get(id)
    if not item:
        return jsonify({'message': 'Grocery item not found'}), 404
    grocery_data = {'id': item.id, 'name': item.name, 'quantity': item.quantity}
    return jsonify(grocery_data)

# Route to update a grocery item by ID
@app.route('/grocery/<id>', methods=['PUT'])
def update_grocery(id):
    data = request.get_json()
    item = GroceryItem.query.get(id)
    if not item:
        return jsonify({'message': 'Grocery item not found'}), 404
    item.name = data['name']
    item.quantity = data['quantity']
    db.session.commit()
    return jsonify({'message': 'Grocery item updated!'})

# Route to delete a grocery item by ID
@app.route('/grocery/<id>', methods=['DELETE'])
def delete_grocery(id):
    item = GroceryItem.query.get(id)
    if not item:
        return jsonify({'message': 'Grocery item not found'}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Grocery item deleted!'})

if __name__ == '__main__':
    app.run(debug=True)
