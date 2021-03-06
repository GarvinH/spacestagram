import axios, { AxiosError } from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FunctionComponent, useEffect, useState } from "react";
import { TailSpin, Oval } from "react-loader-spinner";

import styles from "./Home.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { DatePickerWrapper } from "../../components/DatePickerWrapper/DatePickerWrapper";
import { Post, PostProps } from "../../components/Post/Post";

import InfiniteScroll from "react-infinite-scroll-component";
import { IconButton } from "../../components/Buttons/IconButton/IconButton";

const convertDate = (date: Date) => date.toISOString().substring(0, 10);

export const Home: FunctionComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
    setLoading(false);
  };

  const onSearch = () => {
    setLoading(true);
    setError("");

    const params = {
      ...(startDate && { start_date: convertDate(startDate) }),
      ...(startDate && endDate && { end_date: convertDate(endDate) }),
    };

    axios
      .get("/apod", { params: params })
      .then((resp) =>
        updatePosts(resp.data instanceof Array ? resp.data : [resp.data])
      )
      .catch((err: AxiosError) => {
        axios
          .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", {
            params: params,
          })
          .then((resp) =>
            updatePosts(resp.data instanceof Array ? resp.data : [resp.data])
          )
          .catch((err: AxiosError) => {
            setError("Failed to obtain pictures of the day from the NASA API. Please try again later.");
            setLoading(false);
          });
      });
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
                onChange={(date: Date) => {
                  setStartDate(date);
                  if (endDate && date > endDate) {
                    setEndDate(null);
                  }
                }}
              />
            </Col>
            <Col lg={7} className={styles["date-picker"]}>
              <DatePickerWrapper
                text="End Date"
                selected={endDate}
                disabled={startDate === null}
                onChange={(date: Date) => setEndDate(date)}
                minDate={startDate}
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
        {loading && (
          <TailSpin
            wrapperClass={styles["load-spinner"]}
            arialLabel="Getting pictures of the day from NASA."
            color="black"
          />
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {renderedPosts.length > 0 && (
          <InfiniteScroll
            dataLength={renderedPosts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <Oval
                width={60}
                height={60}
                color="black"
                wrapperClass={styles["load-spinner"]}
                arialLabel="Rendering more pictures of the day."
              />
            }
          >
            {renderedPosts.map((post) => (
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
        )}
      </div>
    </Container>
  );
};
