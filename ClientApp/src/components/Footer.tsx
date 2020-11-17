import * as React from "react";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  const year = new Date().getFullYear();
  return <div className="position-absolute text-center m-3">© {year} Full Stack Craft</div>;
}
