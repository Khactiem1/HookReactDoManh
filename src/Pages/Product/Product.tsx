import { HomeOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { FaSearch, FaRegTrashAlt } from "react-icons/fa";
import classNames from "classnames";
import { GrAdd } from "react-icons/gr";
import {
  postProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductFilter,
  deleteMultiple,
} from "../../Api/Product.api";
import Modal from "../../Components/Modal/Modal";
import ModalConfirm from "../../Components/Modal/ModalConfirm";
import Pagination from "../../Components/Pagination/Pagination";
import { SkeletonDefault } from "../../Components/Skeleton/Skeleton";
import Table from "../../Components/Table/Table";
import { initialFilter } from "../../Types/Filter.type";
import { Product } from "../../Types/Products.type";
import { Breadcrumb } from "antd";
import { useForm } from "react-hook-form";
import { debounce } from "../../Customs/Debounce";
import Checkbox from "../../Components/Input/Checkbox";
import { rules } from "../../Utils/Rules";
import Input from "../../Components/Input/Input";
type PostProduct = Product;
const initialProduct: PostProduct = {
  product_id: "",
  product_name: "",
  product_desc: "",
};

const Products: React.FC = () => {
  const queryClient = useQueryClient(); // làm mất hiệu lực truy vấn (invalidate Query)
  const [rowData, setRowData] = useState<any>([]);
  const [filter, setFilter] = useState(initialFilter);
  const [formData, setFormData] = useState(initialProduct);
  const [id, setId] = useState(""); // sử dụng để lấy id khi click
  const [confirmModal, setConfirmModal] = useState(false); // sử dụng với Modal xác nhận
  const [listDelete, setListDelete] = useState<string[]>([]);
  const [isModal, setIsModal] = useState({
    status: "",
    isOpenModal: false,
  }); // sử dụng với Modal sửa và thêm
  // Get
  const getByFilter = useQuery({
    staleTime: 0,
    cacheTime: 5000, // thời gian bị xoá khỏi bộ nhớ
    queryKey: ["filters", filter],
    queryFn: () => getProductFilter(filter),
    onSuccess: (data) => {
      setRowData(data.data.recordList || []);
    },
    keepPreviousData: true,
  });
  // Post
  const postProductMutation = useMutation({
    mutationFn: (body: PostProduct) => {
      return postProduct(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["filters", filter],
      });
      setListDelete([]);
    },
  });
  // Update
  const updateProductMutate = useMutation({
    mutationFn: (body: PostProduct) => {
      return updateProduct(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["filters", filter],
      });
    },
  });
  // Get by id
  const getProductMutate = useMutation({
    mutationFn: (id: string) => {
      return getProduct(id);
    },
  });
  // Delete
  const deleteProductMutate = useMutation({
    mutationFn: (id: string) => {
      return deleteProduct(id);
    },
  });
  // Delete Multiple
  const deleteMultipleProductMutate = useMutation({
    mutationFn: (listId: string[]) => {
      return deleteMultiple(listId);
    },
  });
  // Tổng trang
  const totalPage = Math.ceil(
    (getByFilter.data?.data.totalCount || 0) / filter.v_Size
  );
  // Xử lý thay đổi Input
  const handleOnchangeInput = (name: any) => (e: any) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  // Xử lý mở Modal //
  const handleOpenModal = (status: string, row: any) => {
    if (status == "edit") {
      getProductMutate.mutate(row.product_id, {
        onSuccess: (data) => {
          setFormData(data.data);
        },
      });
      setIsModal((prev) => ({ ...prev, status: "edit", isOpenModal: true }));
      setId(row.product_id);
    }
    if (status == "create") {
      setIsModal((prev) => ({ ...prev, status: "create", isOpenModal: true }));
    }
  };
  // Xử lý đóng Modal
  const handleCancelModal = () => {
    setIsModal((prev) => ({ ...prev, status: "", isOpenModal: false }));
    setFormData(initialProduct);
  };
  // Xử lý xác nhận (hỏi xoá) //
  const handleOpenModalConfirm = (row: any, status: string) => {
    if (status === "delete_one") {
      setId(row.product_id);
      setConfirmModal(true);
    }
    if (status === "delete_multiple") {
      setConfirmModal(true);
    }
  };
  // Xử lý đồng ý (xoá)
  const handleAgreeModalConfirm = () => {
    if (id) {
      deleteProductMutate.mutate(id, {
        onSuccess: (_) => {
          queryClient.invalidateQueries({
            queryKey: ["filters", filter],
          });
          setConfirmModal(false);
          setId("");
          toast.success("Xoá thành công");
        },
        onError: () => {
          toast.error("Xoá thất bại");
        },
      });
    } else {
      deleteMultipleProductMutate.mutate(listDelete, {
        onSuccess: (_) => {
          queryClient.invalidateQueries({
            queryKey: ["filters", filter],
          });
          setConfirmModal(false);
          setListDelete([]);
          toast.success("Xoá thành công");
        },
        onError: () => {
          toast.error("Xoá thất bại");
        },
      });
    }
  };
  // Xử lý đóng ModalConfirm
  const handleCancelModalConfirm = () => {
    setConfirmModal(false);
  };
  // xử lý thay dổi checkbox
  var handleChangeCheckBox = function (
    e: React.ChangeEvent<HTMLInputElement>,
    row: any
  ) {
    const { name, checked } = e.target;
    if (name === "checkboxall") {
      const rowSelection = rowData.map((item: any) => ({
        ...item,
        isChecked: checked,
      }));
      setRowData(rowSelection);
      const listId = rowSelection
        .filter((item: any) => item?.isChecked === true)
        .map((item: any) => item.product_id);
      setListDelete(listId);
    } else {
      const rowSelection = rowData.map((item: any) =>
        item === row ? { ...item, isChecked: checked } : item
      );
      setRowData(rowSelection);
      const listId = rowSelection
        .filter((item: any) => item?.isChecked === true)
        .map((item: any) => item.product_id);
      setListDelete(listId);
    }
  };
  // tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev: any) => ({ ...prev, v_Where: e.target.value }));
  };
  const onSearch = useCallback(debounce(handleSearch), []);
  const columns: any[] = [
    {
      dataIndex: "checkbox",
      title: (
        <Checkbox
          name="checkboxall"
          checked={
            rowData.filter((item: any) => item.isChecked != true).length < 1
          }
          handleChangeCheckBox={handleChangeCheckBox}
        />
      ),
      checkbox: true,
    },
    { dataIndex: "index", title: "STT" },
    { dataIndex: "product_name", title: "Tên" },
    { dataIndex: "product_desc", title: "Mô tả" },
    { dataIndex: "action", title: "Chức năng", delete: true, edit: true },
  ];
  return (
    <>
      {/* ModalConfirm */}
      {confirmModal && (
        <ModalConfirm
          question="Bạn có thực sự muốn xoá không?"
          handleCancelModalConfirm={handleCancelModalConfirm}
          handleAgreeModalConfirm={handleAgreeModalConfirm}
        ></ModalConfirm>
      )}
      {/* Modal  */}
      {isModal.isOpenModal && (
        <Modal>
          <FormCRU
            updateProductMutate={updateProductMutate}
            setIsModal={setIsModal}
            postProductMutation={postProductMutation}
            handleCancelModal={handleCancelModal}
            setFormData={setFormData}
            formData={formData}
            isModal={isModal}
          ></FormCRU>
        </Modal>
      )}
      <Breadcrumb className="my-5">
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <span>Application</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">Product</Breadcrumb.Item>
      </Breadcrumb>
      {/* add and delete multiple */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => handleOpenModal("create", "")}
            type="button"
            className="text-blue-700 bg-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-black rounded-full text-xl px-3 py-3 text-center"
          >
            <GrAdd />
          </button>
          <button
            onClick={() =>
              handleOpenModalConfirm(listDelete, "delete_multiple")
            }
            type="button"
            className={classNames(
              "text-red-700 bg-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-black rounded-full text-xl px-3 py-3 text-center",
              {
                invisible: listDelete.length <= 0,
              }
            )}
          >
            <FaRegTrashAlt />
          </button>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch />
          </div>
          <input
            onChange={(e) => onSearch(e)}
            type="text"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tìm kiếm"
          />
        </div>
      </div>
      {/* Table */}
      {!getByFilter.isLoading && (
        <Table
          handleChangeCheckBox={handleChangeCheckBox}
          handleOpenModal={handleOpenModal}
          handleOpenModalConfirm={handleOpenModalConfirm}
          rowData={rowData}
          columns={columns}
        ></Table>
      )}
      {/* Phân trang và fix network*/}
      {!getByFilter.isLoading && (
        <Pagination
          page={filter.v_Page}
          totalPage={totalPage}
          filter={filter}
          setFilter={setFilter}
        ></Pagination>
      )}
      {getByFilter.isLoading && <SkeletonDefault />}
    </>
  );
};
interface Props {
  isModal: any;
  setIsModal: any;
  handleCancelModal: any;
  setFormData: any;
  formData: Product;
  postProductMutation: any;
  updateProductMutate: any;
}
interface FormValidate {
  product_name: string;
  product_desc: string;
}
const FormCRU: React.FC<Props> = ({
  isModal,
  setIsModal,
  handleCancelModal,
  setFormData,
  formData,
  postProductMutation,
  updateProductMutate,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValidate>();
  useEffect(() => {
    if (formData) {
      setValue("product_name", formData.product_name);
      setValue("product_desc", formData.product_desc);
    }
  }, [formData, setValue]);
  const onSubmit = (data: any) => {
    if (isModal.status == "create") {
      postProductMutation.mutate(data, {
        onSuccess: () => {
          setIsModal((prev: any) => ({
            ...prev,
            status: "",
            isOpenModal: false,
          }));
          setFormData(initialProduct);
          toast.success("Thêm thành công ❤");
        },
        onError: () => {
          toast.error("Thêm thất bại ❤");
        },
      });
    }
    if (isModal.status == "edit") {
      updateProductMutate.mutate(data, {
        onSuccess: () => {
          setIsModal((prev: any) => ({
            ...prev,
            status: "",
            isOpenModal: false,
          }));
          setFormData(initialProduct);
          toast.success("Cập nhập thành công");
        },
        onError: () => {
          toast.error("Cập nhập thất bại ❤");
        },
      });
    }
  };
  return (
    <div className="mt-3 text-center sm:mt-0 justify-around sm:text-left">
      <h1
        className="text-2xl font-medium leading-6 text-gray-900 mb-5"
        id="modal-title"
      >
        {isModal.status == "edit" ? "Edit" : "Thêm"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex items-center mb-5">
          <Input
            label="Tên"
            name="product_name"
            type="text"
            placeholder="Tên"
            className="bg-gray-50 border border-gray-300 block w-2/3 text-gray-900 text-sm rounded-lg p-2.5"
            register={{ ...register("product_name", rules.product_name) }}
            errorMessage={errors.product_name?.message}
          ></Input>
          <Input
            label="Mô tả"
            name="product_desc"
            type="text"
            placeholder="Mô tả"
            className="bg-gray-50 border border-gray-300 block w-2/3 text-gray-900 text-sm rounded-lg p-2.5"
            register={{ ...register("product_desc", rules.notRequired) }}
          ></Input>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Ok
          </button>
          <button
            onClick={() => handleCancelModal()}
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default Products;
