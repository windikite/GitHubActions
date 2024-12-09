import React, { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import Profile from "./Profile";
import Posts from "./Posts";
import Albums from "./Albums";
import Tasks from "./Tasks";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("posts");

  return (
    <Container fluid className="dashboard">
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key || "posts")}
        className="mb-3"
      >
        <Tab eventKey="posts" title="Posts">
          <Posts userId={1} />
        </Tab>
        <Tab eventKey="albums" title="Albums">
          <Albums userId={1} />
        </Tab>
        <Tab eventKey="tasks" title="Tasks">
          <Tasks userId={1} />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <Profile userId={1} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
