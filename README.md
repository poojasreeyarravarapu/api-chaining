# API Chaining Web Application

This project is a React-based web application that demonstrates API chaining with GET and POST requests. It allows users to create posts, fetch comments, and delete posts using mock APIs.

# Features

# API Chaining:
Fetch user data, create posts, and fetch comments for specific posts.

# Delete Posts:
Allows deleting specific posts based on unique IDs.

# Responsive Design:
Built with Tailwind CSS.

# Error Handling & Loading States:
Displays error messages and loading states for better UX.

# Technology Stack
React.js
Axios for HTTP requests
Tailwind CSS for styling
uuid for generating unique IDs

# Setup Instructions

# Clone the repository:
bash ```
git clone https://github.com/your-username/api-chaining.git ```

# Navigate into the project directory:
bash ```
cd api-chaining-app ```

# Install dependencies:

bash ```
npm install ```

# Start the application:

bash ```
npm start ```

# How to Use
- Select User: Choose a user from the dropdown.
- Create Post: Enter a title and body for the post, then click "Create Post."
- Fetch Comments: Click "Fetch Comments" for any post to load comments related to that post.
- Delete Post: Click "Delete" to remove a specific post.

  
# API Endpoints Used

- Get Users: GET https://jsonplaceholder.typicode.com/users
- Create Post: POST https://jsonplaceholder.typicode.com/posts
- Get Comments: GET https://jsonplaceholder.typicode.com/comments?postId={postId}


# Assumptions & Decisions

A unique ID is generated for each post using the uuid package.
Users can create posts and fetch comments, but all posts are local to the session and are not persisted on the server.
The design is kept simple and responsive for ease of use.


# Known Issues
Posts and comments are fetched from a mock API; data is not persistent across sessions.

# Deployment
The project is deployed using Vercel. Access it here.

api-chaining-do8oqvffh-poojasreeyarravarapus-projects.vercel.app

# License
This project is licensed under the MIT License.

