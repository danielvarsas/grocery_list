# Grocery List App

This is a simple grocery list application built with Flask for the backend and React with TypeScript for the frontend.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+**
- **Node.js 14+** and **npm**

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/grocery-list-app.git
cd grocery-list-app
```
MySQL Setup
Start MySQL Server (if it’s not already running):

bash
Copy code
sudo service mysql start
Login to MySQL:

bash
Copy code
mysql -u root -p
Create a new database:

sql
Copy code
CREATE DATABASE grocery_list_db;
(Optional) Create a MySQL user and grant permissions:

If you don't want to use the root user, create a new user and grant it the necessary permissions:

sql
Copy code
CREATE USER 'grocery_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON grocery_list_db.* TO 'grocery_user'@'localhost';
FLUSH PRIVILEGES;
Update your Flask app to connect to MySQL:

Ensure the connection string in backend/app.py matches your MySQL setup:

python
Copy code
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://grocery_user:your_password@localhost/grocery_list_db'

2. Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend

Create a virtual environment and activate it:

bash
Copy code
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

Install the Python dependencies:

bash
Copy code
pip install -r requirements.txt

Run the Flask server:

bash
Copy code
python app.py

3. Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install Node.js dependencies:

bash
Copy code
npm install

Start the development server:

bash
Copy code
npm start

4. Building the Frontend (Optional)
If you want to create a production build of the frontend:

bash
Copy code
npm run build

The build output will be placed in the frontend/dist directory.

Usage
Backend: Runs on http://127.0.0.1:5000
Frontend: Runs on http://localhost:8080
You can access the application in your web browser at http://localhost:8080.

Collaborating
To collaborate, ensure you are on the correct branch and pull the latest changes before pushing any commits:

bash
Copy code
git pull origin main --rebase
git push origin main
