import { useState } from "react";

export default function TimeFormatDropdown() {
  const [timeFormat, setTimeFormat] = useState('seconds');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFormat(event.target.value);
  };

  return (
    <select
      id="time-format"
      value={timeFormat}
      onChange={handleChange}
      className="border-none bg-light-secondary-container ml-4 outline-none font-semibold hover:cursor-pointer"
    >
      <option value={"seconds"}>Sec</option>
      <option value={"minutes"}>Min</option>
      <option value={"hours"}>Hrs</option>
    </select>
  );
}