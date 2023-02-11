import React from "react";
import { Accordion } from "react-bootstrap";
class InfoSection extends React.Component {
    render() {
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>How are hurricanes developed?</Accordion.Header>
                    <Accordion.Body>
                        A hurricane is a weather event that draws heat from tropical waters, they form over the ocean and begin as a tropical wave.
                        The initial tropical wave is a low pressure area that moves through the moisture-rich tropics, these tropics determine the speed of the hurricane.
                        Once the tropical wave picks up to a speed of <strong>74 miles per hour (mph)</strong>, it is then classified as a hurricane.
                        <br/>
                        Source: <a href="https://oceanservice.noaa.gov/facts/how-hurricanes-form.html" target="_blank" rel="noopener noreferrer">How do hurricanes form?</a>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>How is a hurricane's path determined?</Accordion.Header>
                    <Accordion.Body>
                        Hurricanes that form between 5 to 30 degrees north latitude generally move west due to the East trade winds.
                        Hurricanes that reach above 30 degrees north latitude often start moving northeast.
                        Hurricanes move east to west and gain power moving west.
                        By the time hurricanes reach North America (for Atlantic hurricanes), they move in the north direction due to the coriolis force (forces counter-clockwise rotation) steering winds at higher levels.
                        <br />
                        Source: <a href="https://www.nhc.noaa.gov/climo/" target="_blank" rel="noopener noreferrer">Tropical Cyclone Climatology</a>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>What is a high pressure system?</Accordion.Header>
                    <Accordion.Body>
                        A high pressure system has higher pressure at its center than the areas around it. Winds blow away from high pressure.
                        Swirling in the opposite direction from a low pressure system, the winds of a high pressure system rotate clockwise north of the equator and counterclockwise south of the equator.
                        <br />
                        Source: <a href="https://scied.ucar.edu/learning-zone/how-weather-works/highs-and-lows-air-pressure#:~:text=A%20high%20pressure%20system%20has,counterclockwise%20south%20of%20the%20equator." target="_blank" rel="noopener noreferrer">The Highs and Lows of Air Pressure</a>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>What is a low pressure system?</Accordion.Header>
                    <Accordion.Body>
                        A low pressure system has lower pressure at its center than the areas around it. Winds blow towards the low pressure, and the air rises in the atmosphere where they meet.
                        As the air rises, the water vapor within it condenses, forming clouds and often precipitation. Because of Earth’s spin and the Coriolis effect, winds of a low pressure system swirl counterclockwise north of the equator and
                        clockwise south of the equator.
                        <br />
                        Source: <a href="https://scied.ucar.edu/learning-zone/how-weather-works/highs-and-lows-air-pressure#:~:text=A%20high%20pressure%20system%20has,counterclockwise%20south%20of%20the%20equator." target="_blank" rel="noopener noreferrer">The Highs and Lows of Air Pressure</a>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>What determines the size/category of a hurricane?</Accordion.Header>
                    <Accordion.Body>
                        A hurricane's category is based off of it's wind speed. Category 3-5 constitute a major hurricane.
                        <br />
                        <ul>
                            <li>Category 1: 74-95 mph</li>
                            <li>Category 2: 96-110 mph</li>
                            <li>Category 3: 111-129 mph</li>
                            <li>Category 4: 130-156 mph</li>
                            <li>Category 5: 157+ mph</li>
                        </ul>
                        Source: <a href="https://www.nhc.noaa.gov/aboutsshws.php" target="_blank" rel="noopener noreferrer">Saffir-Simpson Hurricane Wind Scale</a>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}

export default InfoSection;