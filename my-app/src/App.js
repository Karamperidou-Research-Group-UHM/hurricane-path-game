import React from "react";
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import InfoSection from "./components/page/InfoSection";
import ControlPanel from "./components/page/ControlPanel";

function App() {

  return (
      <Container>
          <Row>
              <Col>
                  <InfoSection />
              </Col>

              <Col>
                  <ControlPanel />
              </Col>
          </Row>
      </Container>
  );
}

export default App;
