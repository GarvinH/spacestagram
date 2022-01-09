import { FunctionComponent } from "react";

import styles from "./Post.module.css";

interface PostProps {
  date: string;
  title: string;
  explanation: string;
  url: string;
}

export const Post: FunctionComponent<PostProps> = ({
  date,
  title,
  explanation,
  url,
}: PostProps) => {
  return (
    <div className={styles.post}>
      <h4>{title}</h4>
      <img src={url} style={{ width: "100%" }} />
      <p>{explanation}</p>
      <small>{new Date(date).toLocaleString('default', { month: 'long', day: "numeric", year: "numeric" })}</small>
    </div>
  );
};
