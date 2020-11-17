import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import IFilterValues from '../models/IFilterValues';
import ManufacturerModel from '../models/ManufacturerModel'
import { Loader } from './Loader';

interface IListProps {
  filterValues: IFilterValues;
}
export function List (props: IListProps) {
  const { filterValues } = props;
  const { minValue, maxValue } = filterValues;
  const [manufacturers, setManufacturers] = useState<Array<ManufacturerModel>>([]);

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

  const filteredManufacturers = manufacturers.filter(manufacturer => {
    if (minValue === -1 && maxValue === -1) {
      return true;
    } else {
      return manufacturer.percentComplete > minValue && manufacturer.percentComplete < maxValue;
    }
  });

  const transitions = useTransition(
    filteredManufacturers.map((data, index) => ({ ...data, top: index*50 })),
    d => d.company,
    {
      from: { opacity: 0 },
      leave: { opacity: 0 },
      enter: ({ top }) => ({ top, opacity: 1 }),
      update: ({ top }) => ({ top })
    }
  )

  if (manufacturers.length === 0 ) {
    return (
      <Loader/>
    )
  }

  if (filteredManufacturers.length === 0 ) {
    return (
      <p>No manufacturers match the filter you selected</p>
    )
  }

  return (
    <div className="list">
      {transitions.map(({ item, props: { top, ...rest }, key }, index) => (
        <animated.div
          key={key}
          style={{ zIndex: manufacturers.length - index, transform: top?.interpolate(top => `translate3d(0,${top}px,0)`), ...rest }}>
          <div className="cell">
            <div className="details p-3" style={{ backgroundImage: `linear-gradient(135deg, ${item.color} 0%, #ffffff ${100 - item.percentComplete}%)` }}>
              <h5>{item.company}</h5>
              <p>{item.info}</p>
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  )
}
