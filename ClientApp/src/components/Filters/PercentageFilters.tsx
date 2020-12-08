import * as React from "react";
import { useState } from "react";
import IFilterValues from "../../models/IFilterValues";
import ManufacturerModel from "../../models/ManufacturerModel";

export interface IFilterProps {
  manufacturers: Array<ManufacturerModel>;
  setFilter(filterValues: IFilterValues): void;
}

const buttonConfig = [
  {
    label: "<5%",
    minValue: 0,
    maxValue: 5,
    description: "Manufacturers with little or no EVs.",
  },
  {
    label: "5% - 25%",
    minValue: 5,
    maxValue: 25,
    description: "Manufacturers with up to 1/4th EV fleets.",
  },
  {
    label: "25% - 50%",
    minValue: 25,
    maxValue: 50,
    description: "Manufacturers with up to 1/2th EV fleets.",
  },
  {
    label: "50% - 75%",
    minValue: 50,
    maxValue: 75,
    description: "Manufacturers with up to 3/4th EV fleets.",
  },
  {
    label: ">75%",
    minValue: 75,
    maxValue: 100,
    description: "Manufacturers with more than 3/4th EV fleets.",
  },
];

export default function PercentageFilters(props: IFilterProps) {
  const { manufacturers, setFilter } = props;
  const [activeLabel, setActiveLabel] = useState<string>("");

  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center">
        {buttonConfig.map((buttonConfig) => {
          return (
            <div key={buttonConfig.label}>
              <p className="text-muted text-center small m-1">{buttonConfig.label}</p>
              <button
                className={
                  buttonConfig.label === activeLabel
                    ? "btn btn-secondary btn-lg active filterButton"
                    : "btn btn-secondary btn-lg filterButton"
                }
                onClick={() => {
                  setFilter({
                    minValue: buttonConfig.minValue,
                    maxValue: buttonConfig.maxValue,
                  });
                  setActiveLabel(buttonConfig.label);
                }}
              >
                {manufacturers.filter(manufacturer => manufacturer.percentElectrified <= buttonConfig.maxValue && manufacturer.percentElectrified >= buttonConfig.minValue).length}
              </button>
              <p className="text-muted text-center small m-1">{buttonConfig.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
