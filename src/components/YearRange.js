import { useState, useEffect } from 'react';
import YearInput from './YearInput';

const YearRange = (props) => {
  const { onChange } = props;
  const [rangeMin, setRangeMin] = useState();
  const [rangeMax, setRangeMax] = useState();
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const isInvalid = rangeMin !== null && rangeMax !== null && +rangeMin > +rangeMax;
    setInvalid(isInvalid);
    if (onChange) {
      if (isInvalid) {
        onChange(null);
      } else {
        onChange({
          min: rangeMin === null ? null : +rangeMin,
          max: rangeMax === null ? null : +rangeMax,
        });
      }
    }
  }, [rangeMin, rangeMax, onChange]);

  return (
    <div className="flex items-center gap-4">
      <YearInput
        isABY={false}
        onChange={setRangeMin}
        invalid={invalid}
      />
      <YearInput
        isABY={true}
        onChange={setRangeMax}
        invalid={invalid}
      />
    </div>
  );
}

export default YearRange;
