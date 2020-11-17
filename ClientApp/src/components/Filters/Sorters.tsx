import * as React from "react";
import { useState } from "react";
import Direction from "../../models/Direction";

export interface ISorterProps {
  setSorter(direction: Direction): void;
}

const buttonConfig = [
  {
    label: "Most Electrified",
    direction: Direction.DESC,
    class: "btn btn-success btn-lg "
  },
  {
    label: "Least Electrified",
    direction: Direction.ASC,
    class: "btn btn-danger btn-lg "
  },
];

export function Sorters(props: ISorterProps) {
  const [activeLabel, setActiveLabel] = useState<string>("");
  const { setSorter } = props;
  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center">
        {buttonConfig.map((buttonConfig) => {
          return (
            <button
              className={
                buttonConfig.label === activeLabel
                  ? buttonConfig.class + "active m-1"
                  : buttonConfig.class + "m-1"
              }
              onClick={() => {
                setSorter(buttonConfig.direction);
                setActiveLabel(buttonConfig.label);
              }}
            >
              {buttonConfig.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
