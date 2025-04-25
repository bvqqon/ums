# User Management System (UMS)

A Node.js-based User Management System (UMS) that provides authentication, role-based access control, and API endpoints for managing students, courses, and enrollments.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ums.git
   cd ums
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run at `http://localhost:3000`.

## Project Structure Overview

```
ums/
├── controllers/       # Contains logic for handling API requests
├── db/                # Database connection setup
├── middlewares/       # Middleware for authentication and authorization
├── models/            # Mongoose models for database schemas
├── routes/            # API route definitions
├── app.js             # Main application entry point
├── package.json       # Project metadata and dependencies
└── .env               # Environment variables (not included in the repo)
```

## Example API Endpoints

### Authentication
- **POST /api/auth/register** – Register a new user  
  **Body:**
  ```json
  {
      "username": "adminUser",
      "password": "securePassword",
      "role": "ADMIN"
  }
  ```

- **POST /api/auth/login** – Login and get tokens  
  **Body:**
  ```json
  {
      "username": "adminUser",
      "password": "securePassword",
      "deviceId": "12345"
  }
  ```

### Students
- **POST /api/students** – Create a new student (ADMIN only)  
  **Body:**
  ```json
  {
      "name": "John Doe",
      "email": "john.doe@example.com"
  }
  ```

- **GET /api/students/:id** – Get details of a specific student  

### Courses
- **GET /api/courses** – Retrieve a list of courses  
- **POST /api/courses** – Create a new course (ADMIN only)  
  **Body:**
  ```json
  {
      "title": "Mathematics 101",
      "description": "An introductory course to mathematics."
  }
  ```

- **PUT /api/courses/:id** – Update a course (ADMIN only)  
- **DELETE /api/courses/:id** – Delete a course (ADMIN only)  

### Enrollments
- **POST /api/enrollments** – Enroll a student in a course (TEACHER or ADMIN)  
  **Body:**
  ```json
  {
      "studentId": "student_object_id",
      "courseId": "course_object_id"
  }
  ```

### Profile
- **GET /api/profile** – Get the profile of the logged-in user  

## Used Technologies

- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – MongoDB object modeling
- **JWT** – Authentication and authorization
- **bcrypt.js** – Password hashing
- **dotenv** – Environment variable management

## Build and Run Commands

- Install dependencies:
  ```bash
  npm install
  ```

- Start the development server:
  ```bash
  npm start
  ```

- Run in production mode:
  ```bash
  NODE_ENV=production npm start
  ```

## Contact Information

For any questions or issues, please contact:

**Name:** Baqdaulet  
**WhatsApp** 87775023232
**Telegram** @bvqqon
**Email:** abdralibaqqon@gmail.com  
**GitHub:** [https://github.com/bvqqon](https://github.com/bvqqon)