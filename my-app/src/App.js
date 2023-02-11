import React from "react";
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import InfoSection from "./components/page/InfoSection";
import ControlPanel from "./components/page/ControlPanel";

function App() {

  return (
      <Container style={{ width: '90vw' }}>
          <Row>
              <Col>
                  <InfoSection />
              </Col>

              <Col xs={6}>
                  <script type="module" src="/my-app/public/main.js"></script>
              </Col>

              <Col>
                  <ControlPanel />
              </Col>
          </Row>
      </Container>
  );
}

export default App;
