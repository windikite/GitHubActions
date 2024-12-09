import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_TODOS, DELETE_TODO, UPDATE_TODO_COMPLETION } from "./Queries";
import { ListGroup, Badge, Button, Form, Modal } from "react-bootstrap";

interface TasksProps {
  userId: number;
}

const Tasks: React.FC<TasksProps> = ({ userId }) => {
  const { data, loading, error, refetch } = useQuery(GET_USER_TODOS, {
    variables: { userId },
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => {
      setNotificationMessage("Task deleted successfully!");
      setNotificationVariant("success");
      setShowNotificationModal(true);
      refetch();
    },
    onError: (error) => {
      setNotificationMessage(`Error deleting task: ${error.message}`);
      setNotificationVariant("danger");
      setShowNotificationModal(true);
    },
  });

  const [updateTodoCompletion] = useMutation(UPDATE_TODO_COMPLETION, {
    onCompleted: () => refetch(),
  });

  const [showCompleted, setShowCompleted] = useState(true); 
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const [showNotificationModal, setShowNotificationModal] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState(""); 
  const [notificationVariant, setNotificationVariant] = useState<"success" | "danger">("success");

  if (loading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const todos = data?.user?.todos?.data || [];
  const filteredTodos = todos
    .filter((todo: any) => (showCompleted ? todo.completed : !todo.completed))
    .filter((todo: any) =>
      todo.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

  return (
    <div>
      <h3>Tasks</h3>

      {/* Search and Filter */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search tasks..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Form.Group>
      <Form.Check
        type="switch"
        id="filter-switch"
        label={showCompleted ? "Show Completed" : "Show Incomplete"}
        checked={showCompleted}
        onChange={() => setShowCompleted(!showCompleted)}
      />

      {/* Task List */}
      <ListGroup>
        {filteredTodos.map((todo: any) => (
          <ListGroup.Item
            key={todo.id}
            className={`d-flex justify-content-between align-items-center ${
              todo.completed ? "list-group-item-success" : ""
            }`}
          >
            <div>
              <span>{todo.title}</span>
              <Badge
                bg={todo.completed ? "success" : "danger"}
                className="ms-2"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  updateTodoCompletion({
                    variables: { id: todo.id, completed: !todo.completed },
                  })
                }
              >
                {todo.completed ? "Completed" : "Incomplete"}
              </Badge>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteTodo({ variables: { id: todo.id } })}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

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

export default Tasks;
