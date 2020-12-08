import * as React from "react";
import { useState } from "react";

export interface ISorterProps {
  setIsDescending(isDescending: boolean): void;
}

const buttonConfig = [
  {
    label: "Most Electrified",
    isDescending: true,
    class: "btn btn-success btn-lg ",
  },
  {
    label: "Least Electrified",
    isDescending: false,
    class: "btn btn-danger btn-lg ",
  },
];

export default function Sorters(props: ISorterProps) {
  const [activeLabel, setActiveLabel] = useState<string>("");
  const { setIsDescending } = props;
  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      {buttonConfig.map((buttonConfig) => {
        return (
          <button
            key={buttonConfig.isDescending.toString()}
            className={
              buttonConfig.label === activeLabel
                ? buttonConfig.class + "active m-1"
                : buttonConfig.class + "m-1"
            }
            onClick={() => {
              setIsDescending(buttonConfig.isDescending);
              setActiveLabel(buttonConfig.label);
            }}
          >
            {buttonConfig.label}
          </button>
        );
      })}
    </div>
  );
}
