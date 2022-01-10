import { FunctionComponent } from "react";
import styles from "./VideoEmbedded.module.css"

interface VideoEmbeddedProps {
  source: string;
  title: string;
}

export const VideoEmbedded: FunctionComponent<VideoEmbeddedProps> = ({
  source,
  title,
}: VideoEmbeddedProps) => {
  return (
    <div className={styles["video-responsive"]}>
      <iframe
        width="853"
        height="480"
        src={source}
        frameBorder="0"
        allowFullScreen
        title={"Video: " + title}
      />
    </div>
  );
};
