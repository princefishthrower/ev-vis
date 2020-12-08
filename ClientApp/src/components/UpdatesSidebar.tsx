import * as React from "react";
import { useEffect, useState } from "react";
import UpdateModel from "../models/UpdateModel";
import { Loader } from "./Loader";

export function UpdatesSidebar() {
  const [updates, setUpdates] = useState<Array<UpdateModel>>([]);

  useEffect(() => {
    if (updates.length === 0) {
      fetchUpdates();
    }
  });

  const fetchUpdates = async () => {
    const response = await fetch("/api/update");
    const json = await response.json();
    setUpdates(json);
  };

  return (
    <div className="sidebar">
      <div className="title pt-3 pl-1">
        <h2>Latest Updates</h2>
      </div>
      <div className="content">
        {updates.length === 0 ? (
          <Loader />
        ) : (
          updates.map((update) => {
            return (
              <div key={update.title} className="update-tile p-1">
                <a href={update.link}>
                  <b>{update.title}</b>
                </a>
                &nbsp;
                <span className="text-muted">{new Date(update.date).toLocaleDateString()}</span>
                <p>{update.content}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
