import React, { useContext, useEffect } from "react";
import { useStaticQuery, graphql, Link, navigate } from "gatsby";
import { getUnique } from "../../utilities/graphQL";
import { slugify } from "../../utilities/strings";
import { FilterTypeContext } from "../../context/FilterContext";
import { FilterSeriesContext } from "../../context/FilterContext";
import FilterOption from "./filterOption";

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
    setSelectedSeries("Select an option");
  }

  function handleSelectSeries(e) {
    e.preventDefault();
    const path = e.target.value;
    document.getElementById("series").value = path;

    navigate(`/art/series/${slugify(path)}`);

    setSelectedType("Select an option");
    setSelectedSeries(path);
  }

  useEffect(() => {
    document.getElementById("type").value = selectedType;
    document.getElementById("series").value = selectedSeries;

    return () => {
      setSelectedType("Select an option");
      setSelectedSeries("Select an option");
    };
  }, []);

  const styles = {
    desktop: {
      form: "font-poppins bg-white shadow-xl p-4 border md:mb-0",
      labelWrapper: "md:flex-row",
    },
    mobile: {
      form: "flex items-center justify-center mb-4",
      labelWrapper: "flex flex-col items-center justify-center",
    },
  };

  return (
    <form className={`${styles.desktop.form} ${styles.mobile.form}`}>
      <div
        className={`${styles.desktop.labelWrapper} ${styles.mobile.labelWrapper}`}
      >
        <FilterOption
          labelText="Type"
          handleSelect={handleSelectType}
          id="type"
          options={mediaTypes}
        />
        <FilterOption
          labelText="Series"
          handleSelect={handleSelectSeries}
          id="series"
          options={seriesTitles}
        />
      </div>
    </form>
  );
}
