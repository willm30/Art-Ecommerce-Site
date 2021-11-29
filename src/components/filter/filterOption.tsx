import React from "react";

export default function FilterOption({ labelText, handleSelect, id, options }) {
  return (
    <label className="mx-4 my-2 md:my-0">
      {labelText}:{" "}
      <select
        onChange={handleSelect}
        id={id}
        className="font-poppins border border-gray-500"
      >
        <option hidden disabled value="Select an option" id="default">
          Select an option
        </option>

        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
        <option value="">All</option>
      </select>
    </label>
  );
}
