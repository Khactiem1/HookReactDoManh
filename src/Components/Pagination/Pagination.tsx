import React, { useState } from "react";
import classNames from "classnames";
// import { Filter } from "../../Api/Product.api";
const limit = [5, 10, 20, 50, 100];
interface Props {
  totalPage: number; // tổng trang
  page: number; // trang hiện tại
  filter: any;
  setFilter: any;
}
const Pagination: React.FC<Props> = ({
  totalPage,
  page,
  filter,
  setFilter,
}) => {
  // map phân trang
  const arrPage = new Array();
  Array(totalPage)
    .fill(0)
    .forEach((_, indx) => arrPage.push(indx + 1));
  const arrPageNew = arrPage.slice(0, 1);
  // hàm xử lý
  const handleChangePage = (page: number) => {
    setFilter((prev: any) => ({ ...prev, v_Page: page }));
  };
  const handleNextPage = () => {
    setFilter((prev: any) => ({ ...prev, v_Page: filter.v_Page + 1 }));
  };
  const handlePrevPage = () => {
    setFilter((prev: any) => ({ ...prev, v_Page: filter.v_Page - 1 }));
  };
  const handleChangeLimit = (e: any) => {
    setFilter((prev: any) => ({ ...prev, v_Page: 1, v_Size: e.target.value }));
  };
  return (
    <div className="mt-6 flex justify-center items-center">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            {page === 1 ? (
              <span className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Previous
              </span>
            ) : (
              <span
                onClick={() => handlePrevPage()}
                className="rounded-l-lg border cursor-pointer border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </span>
            )}
          </li>
          {arrPageNew.map((pageNumber, indx) => {
            const isActive = pageNumber === page;
            return (
              <li key={pageNumber}>
                <a
                  onClick={() => handleChangePage(pageNumber)}
                  // className={classNames(
                  //   "border border-gray-300 py-2 px-3 leading-tight cursor-pointer hover:bg-gray-100  hover:text-gray-700",
                  //   {
                  //     "bg-gray-300 text-gray-700": isActive,
                  //     "bg-white text-gray-500": !isActive,
                  //   }
                  // )}
                  className="border bg-gray-100 text-gray-500 border-gray-300 py-2 px-3 leading-tight cursor-pointer hover:bg-gray-100  hover:text-gray-700"
                >
                  {page}
                </a>
              </li>
            );
          })}
          <li>
            {page === totalPage ? (
              <span className="cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </span>
            ) : (
              <span
                onClick={() => handleNextPage()}
                className="rounded-r-lg border cursor-pointer border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </span>
            )}
          </li>
        </ul>
      </nav>
      <div>
        <select
          onChange={(e) => handleChangeLimit(e)}
          id="limit"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {limit.map((limit) => {
            return (
              <option key={limit} value={limit}>
                {limit}
              </option>
            );
          })}
        </select>
      </div>
      <p style={{ margin: "0 10px" }}>
        Page {page} in {totalPage} page
      </p>
    </div>
  );
};

export default Pagination;
