import React, { FunctionComponent } from "react";

import styles from "./IconButton.module.css"

interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  icon: React.ReactNode;
}

export const IconButton: FunctionComponent<IconButtonProps> = ({
  onClick,
  icon,
}: IconButtonProps) => <button onClick={onClick} className={styles["icon-button"]}>{icon}</button>;
