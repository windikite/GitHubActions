import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

interface PostFormProps {
  initialTitle?: string;
  initialBody?: string;
  onSubmit: (title: string, body: string) => void;
  buttonLabel: string;
}

const PostForm: React.FC<PostFormProps> = ({ initialTitle = "", initialBody = "", onSubmit, buttonLabel }) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
  }, [initialTitle, initialBody]);

  const validate = () => {
    const validationErrors = [];
    if (!title.trim()) validationErrors.push("Title is required.");
    if (!body.trim()) validationErrors.push("Body is required.");
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(title, body);
    }
  };

  return (
    <>
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="formPostTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group controlId="formPostBody" className="mt-3">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter content"
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" className="mt-3">
          {buttonLabel}
        </Button>
      </Form>
    </>
  );
};

export default PostForm;
