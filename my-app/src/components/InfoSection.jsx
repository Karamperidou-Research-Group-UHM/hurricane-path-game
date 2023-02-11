import React from "react";
import { Accordion } from "react-bootstrap";

class InfoSection extends React.Component {
    render() {
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>test</Accordion.Header>
                </Accordion.Item>
            </Accordion>
        );
    }
}

export default InfoSection;