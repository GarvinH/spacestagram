import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FunctionComponent, useState } from "react";

import styles from "./Home.module.css";

import { DatePickerWrapper } from "../../components/DatePickerWrapper";

export const Home: FunctionComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Container className={styles.home}>
      <Row className={styles["date-pick-row"]}>
        <Col sm={12} md={11}>
          <span className={styles["date-picker"]}>
            <DatePickerWrapper
              text="Start Date"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </span>
          <span className={styles["date-picker"]}>
            <DatePickerWrapper
              text="End Date"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
            />
          </span>
        </Col>
        <Col xs={12} md={1} style={{ textAlign: "center" }}>
          <Button variant="dark">
            Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
