import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]); // State to hold multiple posts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Create Post
  const createPost = async () => {
    if (!selectedUser) {
      setError('Please select a user first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: selectedUser,
      });

      const createdPost = response.data;
      const user = users.find((user) => user.id === parseInt(selectedUser)); // Parse to integer
      createdPost.userName = user ? user.name : 'Unknown User'; // Set username

      setPosts([...posts, createdPost]); // Add new post to the posts array
      setTitle(''); // Clear title input
      setBody(''); // Clear body input
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    }
    setLoading(false);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    comments.length = 0;
  };

  // Fetch Comments for the Created Post
  const fetchComments = async (post) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.userId}`);
      setComments(response.data);
    } catch (err) {
      setError('Failed to fetch comments');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Create Post & Fetch Comments</h1>

      {/* User Selection Dropdown */}
      <select
        onChange={(e) => setSelectedUser(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      />

      <button
        className="bg-blue-500 text-white w-full py-3 rounded-lg mb-4 hover:bg-blue-600 transition"
        onClick={createPost}
      >
        Create Post
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Created Posts */}
      {posts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
              <p className="text-sm text-gray-500">Posted by: {post.userName}</p>
              <button
                className="text-blue-500 underline mt-2"
                onClick={() => fetchComments(post)}
              >
                Fetch Comments
              </button>
              <br></br>
              <button 
                className="text-red-500 underline"
                onClick={() => deletePost(post.id)}
              >
                Delete Post
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Display Comments */}
      {comments.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-blue-600">Comments</h3>
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="border-b border-gray-200 py-2">
                <p className="font-bold text-gray-800">{comment.name}</p>
                <p className="text-gray-600">{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
