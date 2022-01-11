import { FunctionComponent } from "react";
import { VideoEmbedded } from "../VideoEmbedded/VideoEmbedded";

import styles from "./Post.module.css";

export interface PostProps {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  post_buttons?: React.ReactNode[];
}

export const Post: FunctionComponent<PostProps> = ({
  date,
  title,
  explanation,
  url,
  media_type,
  post_buttons,
}: PostProps) => {
  return (
    <div className={styles.post}>
      <h4>{title}</h4>
      <div style={{ marginBottom: "15px" }}>
        {media_type === "image" ? (
          <img src={url} style={{ width: "100%" }} alt="" aria-hidden />
        ) : (
          <VideoEmbedded source={url} title={title} />
        )}
      </div>
      {post_buttons && (
        <div className={styles["post-button-row"]}>
          {post_buttons.map((button, index) => (
            <div key={date + "_" + index}>{button}</div>
          ))}
        </div>
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
