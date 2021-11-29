import { Link } from "gatsby";
import React from "react";
import Copyright from "../layout/copyright";
import PageSwitch from "./pageSwitch";
import SkipTo from "./skipTo";

export default function FooterNav({ pageContext, pictures, path }) {
  const { currentPage, numPages, totalPosts } = pageContext;
  const allPages = Array.from({ length: numPages }, (x, i) => i + 1);
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? `/art/${path}` : `/art/${path}${currentPage - 1}`;
  const nextPage = `/art/${path}${currentPage + 1}`;
  return (
    <footer>
      <div className="flex flex-col md:flex-row md:justify-center font-poppins text-lg md:mb-4">
        <PageSwitch
          condition={isFirst}
          to={prevPage}
          rel="prev"
          text="← Previous Page"
        />
        <span className={`order-first my-2 md:my-0 md:order-none text-center`}>
          Viewing {isLast ? totalPosts : pictures.length * currentPage} of{" "}
          {totalPosts}
        </span>
        <PageSwitch
          condition={isLast}
          to={nextPage}
          rel="next"
          text="Next Page →"
        />
      </div>
      <SkipTo allPages={allPages} path={path} />
      <Copyright />
    </footer>
  );
}
