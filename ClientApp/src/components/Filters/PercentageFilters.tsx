import * as React from "react";
import { useState } from "react";
import IFilterValues from "../../models/IFilterValues";

export interface IFilterProps {
  setFilter(filterValues: IFilterValues): void;
}

const buttonConfig = [
  {
    label: "<5%",
    minValue: 0,
    maxValue: 5,
  },
  {
    label: "5% - 25%",
    minValue: 0,
    maxValue: 5,
  },
  {
    label: "25% - 50%",
    minValue: 0,
    maxValue: 5,
  },
  {
    label: "50% - 75%",
    minValue: 0,
    maxValue: 5,
  },
  {
    label: ">75%",
    minValue: 0,
    maxValue: 5,
  },
];

export function Filters(props: IFilterProps) {
  const [activeLabel, setActiveLabel] = useState<string>("");
  const { setFilter } = props;
  return (
    <>
      <p className="text-center">Filter companies by their percentage of EVs:</p>
      <div className="d-flex flex-row justify-content-center align-items-center">
        {buttonConfig.map((buttonConfig) => {
          return (
            <button
              className={
                buttonConfig.label === activeLabel
                  ? "btn btn-secondary btn-lg active m-1"
                  : "btn btn-secondary btn-lg m-1"
              }
              onClick={() => {
                setFilter({
                  minValue: buttonConfig.minValue,
                  maxValue: buttonConfig.maxValue,
                });
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
