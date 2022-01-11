import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FunctionComponent, useEffect, useState } from "react";

import styles from "./Home.module.css";

import { DatePickerWrapper } from "../../components/DatePickerWrapper/DatePickerWrapper";
import { Post, PostProps } from "../../components/Post/Post";

import { data } from "./data";
import InfiniteScroll from "react-infinite-scroll-component";
import { IconButton } from "../../components/Buttons/IconButton/IconButton";

const datum = {
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

const convertDate = (date: Date) => date.toISOString().substring(0, 10);

export const Home: FunctionComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  // related to rendering of posts
  const [count, setCount] = useState({ prev: 0, next: 5 }); //used for slicing
  const [hasMore, setHasMore] = useState(true);
  const [renderedPosts, setRenderedPosts] = useState<PostProps[]>([]);
  const fetchMoreData = () => {
    if (renderedPosts.length === posts.length) {
      setHasMore(false);
      return;
    }
    setRenderedPosts([
      ...renderedPosts,
      ...posts.slice(count.prev, count.next),
    ]);
    setCount((prevState) => ({
      prev: prevState.prev + 5,
      next: prevState.next + 5,
    }));
  };

  const updatePosts = (newPosts: PostProps[]) => {
    setPosts(newPosts.reverse());
    setHasMore(true);
    setRenderedPosts(newPosts.slice(0, 5));
    setCount({
      prev: 5,
      next: 10,
    });
  };

  const onSearch = () => {
    if (startDate && endDate) {
      axios
        .get(
          `/apod?start_date=${convertDate(startDate)}&end_date=${convertDate(
            endDate
          )}`
        )
        .then((resp) => updatePosts(resp.data));
    } else if (startDate) {
      axios
        .get(`/apod?start_date=${convertDate(startDate)}`)
        .then((resp) => updatePosts(resp.data));
    } else {
      axios.get(`/apod`).then((resp) => updatePosts([resp.data]));
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

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
        <Col xs={12} lg={2} className={styles["search-button"]}>
          <Button variant="dark" onClick={onSearch}>
            Search
          </Button>
        </Col>
      </Row>

      <div className={styles["post-list"]}>
        <InfiniteScroll
          dataLength={renderedPosts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        >
          {renderedPosts?.map((post) => (
            <div style={{ marginBottom: "30px" }} key={post.date}>
              <Post
                {...post}
                post_buttons={[
                  <IconButton
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      setLikedPosts((prevLikedPosts) => {
                        const newLikedPosts = new Set(prevLikedPosts);
                        if (prevLikedPosts.has(post.date)) {
                          newLikedPosts.delete(post.date);
                          return newLikedPosts;
                        } else {
                          newLikedPosts.add(post.date);
                          return newLikedPosts;
                        }
                      });
                    }}
                    icon={
                      likedPosts.has(post.date) ? (
                        <div key={1}>
                          <i
                            className="fas fa-heart fa-2x"
                            style={{ color: "red" }}
                          />
                        </div>
                      ) : (
                        <div key={2}>
                          <i className="far fa-heart fa-2x" />
                        </div>
                      )
                    }
                  />,
                ]}
              />
            </div>
          ))}
        </InfiniteScroll>
        {/* <Post {...datum} /> */}
      </div>
    </Container>
  );
};
