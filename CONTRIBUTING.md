# 🧩 Contributing Guidelines

Thank you for showing interest in contributing to this project!  
We appreciate your time and effort in helping improve it 💙

This repository contains two main parts:
- **Backend:** Node.js + Express + MySQL
- **Frontend:** React (Vite) application

---

## 📁 Project Structure
```
project-root/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
```
## 🪜 How to Contribute

### 1. Fork the Repository

Click **Fork** at the top-right of this page to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### 3. Create a New Branch
```bash
git checkout -b feature/your-feature-name
```

##⚙️ Setup Instructions
🧠 Backend Setup
Go to the backend directory then

```bash
cd backend
```

Install dependencies
```bash
npm install
```
Create a .env file
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=your_database
```
Start the backend:
```bash
npm run dev
```
The backend will run on:
```bash
👉 http://localhost:5000
```

💻 Frontend Setup
Open a new terminal and navigate to the frontend folder:

```basj
cd frontend
```
Install dependencies
```bash
npm install
```
Run the frontend
```bash
npm run dev
```
The frontend will run on
```bash
👉 http://localhost:5173
```

🧠 Coding Standards

1. Use ES6 syntax (arrow functions, const/let, imports/exports).
2. Keep the code clean and modular.
3. Use camelCase for variables and functions.
4. Write meaningful commit messages (e.g., Add: Task API endpoint, not Update file).
5. Do not push .env, node_modules, or database credentials.

🧪 Testing Your Work
Before submitting

1. Verify both backend and frontend run without errors.
2. Test API routes with Postman.
3. Test UI interactions in the browser.
4. Ensure the backend API URLs match frontend .env settings.

🚀 Submitting Your Contribution

Commit your changes
```bash
git add .
git commit -m "Add: description of your change"
```
Push your branch
```bash
git push origin feature/your-feature-name
```
Open a Pull Request (PR) with a short summary of what you changed and why

📜 License
By contributing, you agree that your contributions will be licensed under the same license as this project.

## Thank you for contributing! You’re helping make this project better every day. 🚀
