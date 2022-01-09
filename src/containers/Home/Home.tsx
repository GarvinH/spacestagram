import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FunctionComponent, useState } from "react";

import styles from "./Home.module.css";

import { DatePickerWrapper } from "../../components/DatePickerWrapper/DatePickerWrapper";
import { Post } from "../../components/Post/Post";

const data = {
  date: "2022-01-09",
  explanation:
    "What will become of Jupiter's Great Red Spot?  Gas giant Jupiter is the solar system's largest world with about 320 times the mass of planet Earth. Jupiter is home to one of the largest and longest lasting storm systems known, the Great Red Spot (GRS), visible to the left. The GRS is so large it could swallow Earth, although it has been shrinking.  Comparison with historical notes indicate that the storm spans only about one third of the exposed surface area it had 150 years ago. NASA's Outer Planets Atmospheres Legacy (OPAL) program has been monitoring the storm more recently using the Hubble Space Telescope. The featured Hubble OPAL image shows Jupiter as it appeared in 2016, processed in a way that makes red hues appear quite vibrant. Modern GRS data indicate that the storm continues to constrict its surface area, but is also becoming slightly taller, vertically.  No one knows the future of the GRS, including the possibility that if the shrinking trend continues, the GRS might one day even do what smaller spots on Jupiter have done -- disappear completely.    Tuesday over Zoom: APOD editor to present the Best APOD Space Images of 2021",
  hdurl:
    "https://apod.nasa.gov/apod/image/2201/JupiterOpal_HubbleMasztalerz_1880.jpg",
  media_type: "image",
  service_version: "v1",
  title: "Hubble's Jupiter and the Shrinking Great Red Spot",
  url: "https://apod.nasa.gov/apod/image/2201/JupiterOpal_HubbleMasztalerz_960.jpg",
};

export const Home: FunctionComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Container className={styles.home}>
      <Row className={styles["date-pick-row"]}>
        <Col sm={12} md={10}>
          <Row>
            <Col className={styles["date-picker"]}>
              <DatePickerWrapper
                text="Start Date"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </Col>
            <Col lg={7} className={styles["date-picker"]}>
              <DatePickerWrapper
                text="End Date"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
              />
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          lg={2}
          className={styles["search-button"]}
        >
          <Button variant="dark">Search</Button>
        </Col>
      </Row>

      <div className={styles["post-list"]}>
        <Post {...data} />
      </div>
    </Container>
  );
};
