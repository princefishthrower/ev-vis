import * as React from "react";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  const year = new Date().getFullYear();
  return <div className="text-center m-3">© {year} <a href="https://fullstackcraft.com" target="_blank" rel="noopener noreferrer">Full Stack Craft</a>. Inspired by the New York Times <a href="https://www.nytimes.com/interactive/2020/science/coronavirus-vaccine-tracker.html" target="_blank" rel="noopener noreferrer">Vaccine Tracker</a></div>;
}
