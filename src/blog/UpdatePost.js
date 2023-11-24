import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faParagraph, faImage } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function UpdatePost() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({
    title: '',
    content: '',
    image: null,
  });

  const { title, content, image } = post;

  const onInputChange = (e) => {
    if (e.target.name === 'image') {
      setPost({ ...post, image: e.target.files[0] });
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);

      await axios.put(`http://localhost:8080/api/blogs/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post updated successfully!',
      }).then(() => {
        navigate(`/`);
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the post.',
      });
    }
  };

  const loadPost = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/blogs/viewBlog/${id}`);
      setPost(result.data);
    } catch (error) {
      console.error('Error loading post:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Edit Post</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Post Title</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faHeading} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Post Title"
                      name="title"
                      value={title}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter Post Content"
                    name="content"
                    value={content}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    accept="image/*"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                {image && (
                  <div className="mb-3">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Post Image Preview"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                )}
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Save
                  </button>
                  <button to={`/`} className="btn btn-outline-danger btn-lg mx-5" onClick={() => navigate('/')}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
