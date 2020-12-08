import React, { useEffect, useState } from "react";
import PercentageFilters from "./components/Filters/PercentageFilters";
import Sorters from "./components/Filters/Sorters";
import { Footer } from "./components/Footer";
import { List } from "./components/List";
import { Loader } from "./components/Loader";
import { Title } from "./components/Title";
import { UpdatesSidebar } from "./components/UpdatesSidebar";
import IFilterValues from "./models/IFilterValues";
import ManufacturerModel from "./models/ManufacturerModel";
import "./styles/styles.scss";

const defaultFilters = {
  minValue: -1,
  maxValue: -1,
};

export default function App() {
  const [manufacturers, setManufacturers] = useState<Array<ManufacturerModel>>([]);

  const [filterValues, setFilterValues] = useState<IFilterValues>(defaultFilters);

  const [isDescending, setIsDescending] = useState<boolean>(
    true
  );

  useEffect(() => {
    if (manufacturers.length === 0) {
      fetchManufacturers();
    }
  })

  const fetchManufacturers = async () => {
    const response = await fetch('/api/manufacturer');
    const json = await response.json();
    setManufacturers(json);
  }

  const setFilter = (filterValues: IFilterValues) => {
    setFilterValues(filterValues);
  };

  const setSorter = (isDescending: boolean) => {
    setIsDescending(isDescending);
    setFilterValues(defaultFilters);
  };

  if (manufacturers.length === 0) {
    return <Loader/>
  }

  return (
    <div className="container-fluid">
      <Title />
      <Sorters setIsDescending={setSorter} />
      <PercentageFilters manufacturers={manufacturers} setFilter={setFilter} />
      <List manufacturers={manufacturers} filterValues={filterValues} isDescending={isDescending}/>
      {window.innerWidth > 690 && <UpdatesSidebar/>}
      <Footer />
    </div>
  );
}
