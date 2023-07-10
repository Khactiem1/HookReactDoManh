import React, { Fragment } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Checkbox from "../Input/Checkbox";
interface Props {
  rowData: [];
  columns: any[];
  handleOpenModalConfirm: any;
  handleOpenModal: any;
  handleChangeCheckBox: any;
}
const Table: React.FC<Props> = ({
  rowData,
  columns,
  handleOpenModalConfirm,
  handleOpenModal,
  handleChangeCheckBox,
}) => {
  // // xử lý thay dổi checkbox
  // const handleChangeCheckBox = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   row: any
  // ) => {
  //   const { name, checked } = e.target;
  //   if (name === "checkboxall") {
  //     const rowSelection = rowData.map((item: any) => ({
  //       ...item,
  //       isChecked: checked,
  //     }));
  //     setRowData(rowSelection);
  //     const listId = rowSelection
  //       .filter((item: any) => item?.isChecked === true)
  //       .map((item) => item.product_id);
  //     setListDelete(listId);
  //   } else {
  //     const rowSelection = rowData.map((item: any) =>
  //       item === row ? { ...item, isChecked: checked } : item
  //     );
  //     setRowData(rowSelection);
  //     const listId = rowSelection
  //       .filter((item: any) => item?.isChecked === true)
  //       .map((item) => item.product_id);
  //     setListDelete(listId);
  //   }
  // };
  return (
    <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" className="text-center py-4">
              <input
                name="checkboxall"
                checked={
                  rowData.filter((item: any) => item.isChecked != true).length <
                  1
                }
                onChange={(e) => handleChangeCheckBox(e)}
                type="checkbox"
              />
            </th> */}
            {/* <th scope="col" className="text-center py-4">
              STT
            </th> */}
            {columns.map((column) => (
              <th
                scope="col"
                className="text-center py-4"
                key={column.dataIndex}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ fontSize: "18px" }}>
          {rowData.length == 0 ? (
            <tr className="flex justify-end">
              <td className="text-red-600">Không có bản ghi nào</td>
            </tr>
          ) : (
            rowData.map((row: any, indx: number) => (
              <tr
                key={indx}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                {/* <td className="text-center py-4">
                  <input
                    checked={row?.isChecked || false}
                    onChange={(e) => handleChangeCheckBox(e, row)}
                    type="checkbox"
                  />
                </td> */}
                {/* <td className="text-center py-4">{indx + 1}</td> */}

                {columns.map((column) => (
                  <Fragment key={column.dataIndex}>
                    <td className="text-center py-4">
                      {column.checkbox && (
                        // <input
                        //   checked={row?.isChecked || false}
                        //   onChange={(e) => handleChangeCheckBox(e, row)}
                        //   type="checkbox"
                        // />
                        <Checkbox
                          checked={row?.isChecked || false}
                          handleChangeCheckBox={handleChangeCheckBox}
                          rowData={row}
                        />
                      )}
                      {column.dataIndex === "index" && indx + 1}
                      {row[column.dataIndex]}
                      {column.edit && (
                        <button
                          onClick={() => handleOpenModal("edit", row)}
                          className="mr-5 text-blue-600 dark:text-blue-500"
                        >
                          <FaRegEdit />
                        </button>
                      )}
                      {column.delete && (
                        <button
                          onClick={() =>
                            handleOpenModalConfirm(row, "delete_one")
                          }
                          className="text-red-600 dark:text-red-500"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      )}
                    </td>
                  </Fragment>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
