import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from "./Queries";
import { Row, Card, Button, Modal, Form } from "react-bootstrap";
import PostForm from "./PostForm";
import { Post } from "./types";

interface PostsProps {
  userId: number; // User ID to filter posts
}

const Posts: React.FC<PostsProps> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: { userId }, // Fetch posts for a specific user
  });

  const [createPost] = useMutation(CREATE_POST, { refetchQueries: [{ query: GET_POSTS, variables: { userId } }] });
  const [updatePost] = useMutation(UPDATE_POST, { refetchQueries: [{ query: GET_POSTS, variables: { userId } }] });
  const [deletePost] = useMutation(DELETE_POST, { refetchQueries: [{ query: GET_POSTS, variables: { userId } }] });

  const [showPostModal, setShowPostModal] = useState(false); // Modal for creating/updating a post
  const [editingPost, setEditingPost] = useState<Post | null>(null); // Current post being edited
  const [searchKeyword, setSearchKeyword] = useState(""); // Search keyword state
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationVariant, setNotificationVariant] = useState<"success" | "danger">("success");

  const handleCreatePost = async (title: string, body: string) => {
    try {
      await createPost({ variables: { title, body, userId } });
      setNotificationMessage("Post created successfully!");
      setNotificationVariant("success");
    } catch (error: any) {
      setNotificationMessage(`Error creating post: ${error.message}`);
      setNotificationVariant("danger");
    } finally {
      setShowPostModal(false);
      setShowNotificationModal(true);
    }
  };

  const handleUpdatePost = async (title: string, body: string) => {
    try {
      if (editingPost) {
        await updatePost({ variables: { id: editingPost.id, input: { title, body } } });
        setNotificationMessage("Post updated successfully!");
        setNotificationVariant("success");
      }
    } catch (error: any) {
      setNotificationMessage(`Error updating post: ${error.message}`);
      setNotificationVariant("danger");
    } finally {
      setShowPostModal(false);
      setShowNotificationModal(true);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost({ variables: { id: postId } });
      setNotificationMessage("Post deleted successfully!");
      setNotificationVariant("success");
    } catch (error: any) {
      setNotificationMessage(`Error deleting post: ${error.message}`);
      setNotificationVariant("danger");
    } finally {
      setShowNotificationModal(true);
    }
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setShowPostModal(true);
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setShowPostModal(true);
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredPosts = data?.posts?.data.filter((post: Post) =>
    post.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="posts-container">
      <h3>Posts</h3>

      {/* Search Posts */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search posts by title..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" className="mb-4" onClick={openCreateModal}>
        Create Post
      </Button>

      {/* Posts List */}
      <Row>
        {filteredPosts.map((post: Post) => (
          <Card key={post.id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <Button variant="warning" onClick={() => openEditModal(post)}>
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => handleDeletePost(post.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>

      {/* Create/Edit Post Modal */}
      <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPost ? "Edit Post" : "Create Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm
            initialTitle={editingPost?.title}
            initialBody={editingPost?.body}
            onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
            buttonLabel={editingPost ? "Save Changes" : "Create Post"}
          />
        </Modal.Body>
      </Modal>

      {/* Notification Modal */}
      <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{notificationVariant === "success" ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{notificationMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotificationModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Posts;
