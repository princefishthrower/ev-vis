import React, { useState } from "react";
import { Filters } from "./components/Filters/PercentageFilters";
import { Sorters } from "./components/Filters/Sorters";
import { Footer } from "./components/Footer";
import { List } from "./components/List";
import { Title } from "./components/Title";
import Direction from "./models/Direction";
import IFilterValues from "./models/IFilterValues";
import "./styles/styles.scss";

export default function App() {
  const [filterValues, setFilterValues] = useState<IFilterValues>({
    minValue: -1,
    maxValue: -1,
  });

  const [sorterDirection, setSorterDirection] = useState<Direction>(Direction.DESC);

  const setFilter = (filterValues: IFilterValues) => {
    setFilterValues(filterValues);
  };

  const setSorter = (direction: Direction) => {
    setSorterDirection(direction);
  };

  return (
    <div className="container-fluid">
      <Title />
      <Filters setFilter={setFilter} />
      <Sorters setSorter={setSorter} />
      <List filterValues={filterValues} />
      <Footer/>
    </div>
  );
}
