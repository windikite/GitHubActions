import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      id
      username
      email
      address {
        geo {
          lat
          lng
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(input: {title: $title, body: $body}) {
      id
      title
      body
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const GET_USER_ALBUMS = gql`
  query GetUserAlbums($userId: ID!) {
    user(id: $userId) {
      albums {
        data {
          id
          title
          photos {
            data {
              id
              title
              url
              thumbnailUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_TODOS = gql`
  query GetUserTodos($userId: ID!) {
    user(id: $userId) {
      todos {
        data {
          id
          title
          completed
        }
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const UPDATE_TODO_COMPLETION = gql`
  mutation UpdateTodoCompletion($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, input: { completed: $completed }) {
      id
      completed
    }
  }
`;