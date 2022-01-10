import { FunctionComponent } from "react";
import { VideoEmbedded } from "../VideoEmbedded/VideoEmbedded";

import styles from "./Post.module.css";

export interface PostProps {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
}

export const Post: FunctionComponent<PostProps> = ({
  date,
  title,
  explanation,
  url,
  media_type,
}: PostProps) => {
  return (
    <div className={styles.post}>
      <h4>{title}</h4>
      {media_type === "image" ? (
        <img src={url} style={{ width: "100%" }} />
      ) : (
        <VideoEmbedded source={url} title={title} />
      )}
      <p>{explanation}</p>
      <small>
        {new Date(date).toLocaleString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </small>
    </div>
  );
};
