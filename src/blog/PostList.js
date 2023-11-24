import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image
  const baseUrl = 'http://localhost:8080/api/blogs'; // Replace with your API URL

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(baseUrl+'/viewAllBlogs');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/blogs/delete/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting post:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the post.',
      });
    }
  };

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath); // Set selected image when clicked
  };

  const handleImageClose = () => {
    setSelectedImage(null); // Clear selected image when closed
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex justify-content-between">
            <div className="mx-5 py-3">
              <h6 className="m-0 font-weight-bold text-primary">Post List</h6>
            </div>
            <div className="mx-5 py-3">
              <Link to={`/add-post`} className="btn btn-primary mx-2">
                Add Post
              </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>
                        <Link to={`/view-post/${post.id}`} className="text-primary mx-2">
                          {post.title}
                        </Link>
                      </td>
                      <td>{`${post.content.split(' ').slice(0, 20).join(' ')}...`}</td>
                      <td>
                        {post.imagePath && (
                          <div
                            onClick={() => handleImageClick(post.imagePath)} // Handle click event
                            className="img-thumbnail"
                            style={{
                              cursor: 'pointer',
                              backgroundImage: `url(${post.imagePath})`, // Display image as background
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              width: '100px',
                              height: '100px',
                            }}
                          ></div>
                        )}
                      </td>
                      <td>
                        <Link to={`/edit-post/${post.id}`} className="btn btn-primary btn-sm mx-1">
                          Edit
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="btn btn-danger btn-sm mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional rendering for full-size image */}
      {selectedImage && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Full Image</h5>
                <button type="button" className="close" onClick={handleImageClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={selectedImage} alt="Full Post" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostList;
