import React from 'react'
import { useTransition, animated } from 'react-spring'
import { genericSort } from '../helpers/genericSort';
import IFilterValues from '../models/IFilterValues';
import ManufacturerModel from '../models/ManufacturerModel'

const tileOffset = 50;
const tileHeight = 150;

interface IListProps {
  manufacturers: Array<ManufacturerModel>;
  filterValues: IFilterValues;
  isDescending: boolean;
}
export function List (props: IListProps) {
  const { manufacturers, filterValues, isDescending } = props;
  const { minValue, maxValue } = filterValues;

  const sortedManufacturers = manufacturers.sort((a,b) => genericSort(a, b, {property: "percentElectrified", isDescending: isDescending}))

  const filteredManufacturers = sortedManufacturers.filter(manufacturer => {
    if (minValue === -1 && maxValue === -1) {
      return true;
    } else {
      return manufacturer.percentElectrified >= minValue && manufacturer.percentElectrified <= maxValue;
    }
  }); 

  const transitions = useTransition(
    filteredManufacturers.map((data, index) => ({ ...data, top: index*tileOffset })),
    d => d.company,
    {
      from: { opacity: 0 },
      leave: { opacity: 0 },
      enter: ({ top }) => ({ top, opacity: 1 }),
      update: ({ top }) => ({ top })
    }
  )

  if (filteredManufacturers.length === 0 ) {
    return (
      <p className="text-center my-5">No manufacturers match the filter you selected.</p>
    )
  }

  return (
    <div className="list" style={{height: filteredManufacturers.length*(tileHeight + tileOffset)}}>
      {transitions.map(({ item, props: { top, ...rest }, key }, index) => (
        <animated.div
          key={key}
          style={{ zIndex: manufacturers.length - index, height: tileHeight, transform: top?.interpolate(top => `translate3d(0,${top}px,0)`), ...rest }}>
          <div className="cell">
            <div className="details p-3" style={{ backgroundImage: `linear-gradient(135deg, ${item.color} 0%, #ffffff ${100 - item.percentElectrified}%)` }}>
              <h5>{item.company}</h5>
              <p>{item.info}</p>
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  )
}
