import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faParagraph,} from '@fortawesome/free-solid-svg-icons';

export default function ViewPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = 'http://localhost:8080/api/blogs'; // Replace with your API URL


  const [post, setPost] = useState({
    title: '',
    content: '',
    imagePath: '',
  });

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const result = await axios.get(baseUrl+`/viewBlog/${id}`);
      setPost(result.data);
    } catch (error) {
      console.error('Error loading post:', error);
    }
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Post Details</h2>
              <div className="list-group">
                <PostDetailItem icon={faHeading} label="Title" value={post.title} />
                <PostDetailItem icon={faParagraph} label="Content" value={post.content} />
              </div>
              <div className="text-center">
                {post.imagePath && (
                  <img
                    src={post.imagePath}
                    alt={`Image related to the post`}
                    className="img-thumbnail my-4"
                    style={{ maxWidth: '100%' }}
                  />
                )}
              </div>
            </div>
            <div className="card-footer d-flex justify-content-center">
              <button
                className="btn btn-primary btn-edit mx-5"
                onClick={() => navigate(`/edit-post/${id}`)}
              >
                Edit Post
              </button>
              <button
                className="btn btn-danger mx-5 btn-back"
                onClick={() => navigate('/')}
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostDetailItem({ icon, label, value }) {
  return (
    <div className="list-group-item mb-3">
      <div className="d-flex justify-content-between">
        <div className="post-icon mx-2">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="post-detail d-flex my-2">
          <div className="post-label mx-5">{label}:</div>
          <div className="post-value">{value}</div>
        </div>
      </div>
    </div>
  );
}
