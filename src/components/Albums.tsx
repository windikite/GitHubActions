import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_ALBUMS } from "./Queries";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

interface AlbumsProps {
  userId: number; 
}

const Albums: React.FC<AlbumsProps> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_ALBUMS, {
    variables: { userId },
  });

  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState(""); 

  if (loading) return <div>Loading albums...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredAlbums = data?.user?.albums?.data.filter((album: any) =>
    album.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="d-flex">
      <div style={{ flex: 1, padding: "1rem" }}>
        <h3>Albums</h3>

        {/* Search Albums */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search albums..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          {filteredAlbums.map((album: any) => (
            <Button
              key={album.id}
              variant="outline-primary"
              onClick={() => setSelectedAlbum(album)}
            >
              {album.title}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ flex: 2, padding: "1rem" }}>
        {selectedAlbum ? (
          <>
            <h3>Photos in "{selectedAlbum.title}"</h3>
            <Row>
              {selectedAlbum.photos.data.map((photo: any) => (
                <Col md={4} key={photo.id}>
                  <Card>
                    <Card.Img variant="top" src={photo.thumbnailUrl} />
                    <Card.Body>
                      <Card.Title>{photo.title}</Card.Title>
                      <Card.Text>
                        <a href={photo.url} target="_blank" rel="noopener noreferrer">
                          View Full Photo
                        </a>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <div>Please select an album to view its photos.</div>
        )}
      </div>
    </div>
  );
};

export default Albums;
