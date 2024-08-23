import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type GroceryItem = {
  id: number;
  name: string;
  quantity: number;
};

const App: React.FC = () => {
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);

  useEffect(() => {
    fetchGroceryItems();
  }, []);

  const fetchGroceryItems = () => {
    fetch('http://backend-service:5000/grocery')
      .then(response => response.json())
      .then(data => {
        setGroceries(data.groceries);
      })
      .catch(error => console.error('Error fetching groceries:', error));
  };

  const addGroceryItem = () => {
    if (editingItem) {
      updateGroceryItem(editingItem.id, newItem);
    } else {
      fetch('http://backend-service:5000/grocery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
        .then(response => response.json())
        .then(() => {
          fetchGroceryItems();
          setNewItem({ name: '', quantity: 0 });
        })
        .catch(error => console.error('Error adding grocery item:', error));
    }
  };

  const updateGroceryItem = (id: number, updatedItem: { name: string; quantity: number }) => {
    fetch(`http://backend-service:5000/grocery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(() => {
        fetchGroceryItems();
        setEditingItem(null);
        setNewItem({ name: '', quantity: 0 });
      })
      .catch(error => console.error('Error updating grocery item:', error));
  };

  const deleteGroceryItem = (id: number) => {
    fetch(`http://backend-service:5000/grocery/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchGroceryItems();
      })
      .catch(error => console.error('Error deleting grocery item:', error));
  };

  const handleEdit = (item: GroceryItem) => {
    setEditingItem(item);
    setNewItem({ name: item.name, quantity: item.quantity });
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#d1cba3', borderRadius: '8px', padding: '20px' }}>
      <h1 className="text-center mb-4" style={{ color: '#30561e' }}>Grocery List App</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Item name"
              style={{ backgroundColor: '#a8e4bf', borderColor: '#30561e' }}
              value={newItem.name}
              onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              style={{ backgroundColor: '#a8e4bf', borderColor: '#30561e' }}
              value={newItem.quantity}
              onChange={e => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
            />
            <button
              className="btn"
              onClick={addGroceryItem}
              style={{ backgroundColor: '#ee941b', color: '#fff' }}
            >
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
          </div>
          <ul className="list-group">
            {groceries.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#74ac70', borderColor: '#56682d' }}>
                <span style={{ color: '#30561e' }}>
                  {item.name} - {item.quantity}
                </span>
                <div>
                  <button className="btn btn-sm me-2" style={{ backgroundColor: '#56682d', color: '#fff' }} onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-sm" style={{ backgroundColor: '#30561e', color: '#fff' }} onClick={() => deleteGroceryItem(item.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

