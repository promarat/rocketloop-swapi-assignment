import { useState, useEffect } from 'react';

const YearInput = (props) => {
  const { onChange, invalid } = props;
  const [value, setValue] = useState();
  const [isABY, setIsABY] = useState(props.isABY);

  useEffect(() => {
    if (onChange) {
      onChange(value ? isABY ? value : -value : null);
    }
  }, [value, isABY, onChange]);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const toggleABY = () => {
    setIsABY(!isABY);
  }

  return (
    <div className="relative">
      <input
        type="number"
        className={`appearance-none w-[120px] rounded pl-2 pr-10 py-1 text-[#212529] focus:outline-none focus:shadow-none border ${invalid ? "border border-[#f56565]" : "border-[#e2e8f0]"}`}
        value={value}
        onChange={handleChange}
      />
      <button
        type="button"
        className={`absolute right-0 w-[60px] rounded-r bg-[#e9ecef] text-[#212529] py-1 border-t border-r border-b ${invalid ? "border-[#f56565]" : "border-[#e2e8f0]"}`}
        onClick={toggleABY}
      >
        {isABY ? "ABY" : "BBY"}
      </button>
    </div>
  );
}

export default YearInput;
