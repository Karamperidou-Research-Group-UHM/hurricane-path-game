import React from "react";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";

export default class ControlPanel extends React.Component {
    render() {
        const rowStyle = { justifyContent: "center", marginBottom: '5px', alignItems: 'center' };

        return (
            <Alert style={{ resize: "vertical" }} variant="primary">
                <div style={{ textAlign: "center" }}>
                    <Alert.Heading>Control Panel</Alert.Heading>
                    <p>Use this control panel to interact with the game elements</p>
                </div>

                <hr />

                <Container>
                    <Row style={rowStyle}>
                        <Col xs={5}>High Pressure System Size:</Col>
                        <Col xs={2}>
                            <Button id="high+">+</Button>
                        </Col>
                        <Col xs={2}>
                            <span id="high-pressure-size">1x</span>
                        </Col>
                        <Col xs={2}>
                            <Button id="high-">-</Button>
                        </Col>
                    </Row>
                    <Row style={rowStyle}>
                        <Col xs={5}>Low Pressure System Size:</Col>
                        <Col xs={2}>
                            <Button id="low+">+</Button>
                        </Col>
                        <Col xs={2}>
                            <span id="low-pressure-size">1x</span>
                        </Col>
                        <Col xs={2}>
                            <Button id="low-">-</Button>
                        </Col>
                    </Row>
                    <Row style={rowStyle}>
                        <Col xs={5}>Temperature Change:</Col>
                        <Col xs={2}>
                            <Button id="temp+">+</Button>
                        </Col>
                        <Col xs={2}>
                            <span id="temp-text">1x</span>
                        </Col>
                        <Col xs={2}>
                            <Button id="temp-">-</Button>
                        </Col>
                    </Row>

                    <hr />

                    <Row style={{ paddingLeft: '30px', marginBottom: '50px' }}>
                        <Col>
                            <Button variant="danger" style={{ width: '80%' }} id="reset">Reset</Button>
                        </Col>

                        <Col>
                            <Button variant="success" style={{ width: '80%' }} id="start">Start</Button>
                        </Col>
                    </Row>
                </Container>
            </Alert>
        );
    }
}