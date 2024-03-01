# Task-Board


# Project Name

## Description
This project is a simple task management application with a backend implemented in Node.js using Express and a frontend implemented in React. It allows users to create task lists, add tasks to those lists, and drag tasks between lists.

## Features
- User authentication
- Create, read, update, and delete task lists and tasks
- Drag and drop functionality for tasks between lists

## Installation

### Backend
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Configure the PostgreSQL database:
   - Make sure PostgreSQL is installed and running on your system.
   - Create a new database with the name `task_manager`.
   - Create a user with the username `admin` and password `admin`, and grant it access to the `task_manager` database.
5. Set environment variables:
   - Create a `.env` file in the backend directory.
   - Add the following variables to the `.env` file:
     ```
     DATABASE_URL=postgresql://admin:admin@localhost:5432/task_manager
     PORT=4000
     ```
6. Run the database migrations to create the necessary tables: `npx sequelize-cli db:migrate`
7. Start the backend server: `npm start`

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the frontend development server: `npm start`
4. Access the application in your web browser at `http://localhost:3000`

## Usage
- Open the application in your web browser.
- Sign up for an account or use the default admin account with the username `admin` and password `admin`.
- Create task lists and add tasks to them.
- Drag tasks between lists to move them.
- Delete tasks by clicking on the delete icon next to them.
- Log out when finished.

## Technologies Used
- Backend: Node.js, Express.js, Sequelize (ORM), PostgreSQL
- Frontend: React, react-beautiful-dnd (for drag and drop functionality)

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

## License
[MIT License](LICENSE)
