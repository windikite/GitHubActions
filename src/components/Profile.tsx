import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "./Queries";
import { Card } from "react-bootstrap";

interface ProfileProps {
  userId: number; 
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { id: userId }, 
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Error loading user profile:", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card className="profile-card">
      <Card.Body>
        <Card.Title>Username: {data.user.username}</Card.Title>
        <Card.Text>Email: {data.user.email}</Card.Text>
        <Card.Text>Address Lat: {data.user.address.geo.lat}</Card.Text>
        <Card.Text>Address Lng: {data.user.address.geo.lng}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Profile;
