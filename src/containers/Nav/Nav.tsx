import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FunctionComponent } from "react";

import styles from "./Nav.module.css";

export const Nav: FunctionComponent = () => {
  return (
    <Navbar bg="light" fixed="top" style={{borderBottom: "1px rgba(0,0,0,0.25) solid"}}>
      <Container className="justify-content-center">
        <Navbar.Brand className={styles.title}>Spacestagram</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
