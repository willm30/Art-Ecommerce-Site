import React, { Dispatch, SetStateAction, useState } from "react";
import { CartItemShape } from "../components/cart/cartItem";

export const FilterTypeContext = React.createContext([]);
export const FilterSeriesContext = React.createContext([]);

export const FilterProvider = ({ children }) => {
  const filterTypeStateHook = useState("Select an option");
  const filterSeriesStateHook = useState("Select an option");

  return (
    <FilterTypeContext.Provider value={filterTypeStateHook}>
      <FilterSeriesContext.Provider value={filterSeriesStateHook}>
        {children}
      </FilterSeriesContext.Provider>
    </FilterTypeContext.Provider>
  );
};
