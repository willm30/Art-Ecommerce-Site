import React, { useContext, useEffect } from "react";
import { useStaticQuery, graphql, Link, navigate } from "gatsby";
import { getUnique } from "../../utilities/graphQL";
import { slugify } from "../../utilities/strings";
import { useState } from "react";
import { FilterTypeContext } from "../../context/FilterContext";
import { FilterSeriesContext } from "../../context/FilterContext";

export default function Filter() {
  const [selectedType, setSelectedType] = useContext(FilterTypeContext);
  const [selectedSeries, setSelectedSeries] = useContext(FilterSeriesContext);

  const data = useStaticQuery(graphql`
    query MediaTypeQuery {
      allContentfulPicture {
        edges {
          node {
            mediaType
            seriesTitle
          }
        }
      }
    }
  `);
  const mediaTypes = getUnique(data.allContentfulPicture.edges, "mediaType");
  const seriesTitles = getUnique(
    data.allContentfulPicture.edges,
    "seriesTitle"
  );
  console.log(seriesTitles, "seriesTitles");
  function handleSelectType(e) {
    e.preventDefault();
    const path = e.target.value;
    document.getElementById("type").value = path;
    if (path) {
      navigate(`/art/${slugify(path)}`);
    } else {
      navigate(`/art`);
    }
    setSelectedType(path);
  }

  function handleSelectSeries(e) {
    e.preventDefault();
    const path = e.target.value;
    document.getElementById("series").value = path;
    if (path) {
      navigate(`/art/series/${slugify(path)}`);
    } else {
      navigate(`/art`);
    }
    setSelectedSeries(path);
  }

  useEffect(() => {
    document.getElementById("type").value = selectedType;
    document.getElementById("series").value = selectedSeries;
  }, []);
  return (
    <form className="font-poppins">
      <label className="mx-4">
        Type:{" "}
        <select onChange={handleSelectType} id="type" className="font-poppins ">
          <option hidden disabled value="Select an option" id="default">
            Select an option
          </option>

          {mediaTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
          <option value="">All</option>
        </select>
      </label>
      <label className="mx-4">
        Series:{" "}
        <select
          onChange={handleSelectSeries}
          id="series"
          className="font-poppins"
        >
          <option hidden disabled value="Select an option" id="default">
            Select an option
          </option>

          {seriesTitles.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
          <option value="">All</option>
        </select>
      </label>
    </form>
  );
}
