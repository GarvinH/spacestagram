import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FunctionComponent } from "react";

import styles from "./Nav.module.css";

export const Nav: FunctionComponent = () => {
  return (
    <Navbar bg="light" fixed="top" >
      <Container className="justify-content-center">
        <Navbar.Brand className={styles.title}>Spacestagram</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
