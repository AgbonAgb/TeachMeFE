import React, { useState } from "react";
import Button from "../../../custom/button/button";
import styles from "./styles.module.scss";
import SearchInput from "../../../custom/searchInput/searchInput";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { Modal, Popover, Table, Tooltip } from "antd";
import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import CustomSelect from "../../../custom/select/select";
import Layout from "../../layout/layout";
import CreateCategoryModal from "./modalContent/createCategory";
import { Link, useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatDate } from "../../utils/dateUtils";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { GetCategoryByLecturerId } from "../../../requests";
import Spinner from "../../../custom/spinner/spinner";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../store/store";
import EditCategory from "./modalContent/editCategory";

const Category = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState({} as any);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAtomValue(userAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const openViewModal = () => {
    setShowModal(true);
  };
  const openEditModal = (record: CategoryPayload) => {
    setShowEditModal(true);
    setData(record);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const [getCategoryQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-category-lecturer-id"],
        queryFn: () => GetCategoryByLecturerId(user?.UserId!),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const getCategoryError = getCategoryQuery?.error as AxiosError;
  const getCategoryErrorMessage = getCategoryError?.message;
  const getCategoryData = getCategoryQuery?.data?.data?.Data;



  const filteredData = Array.isArray(getCategoryData)
    ? getCategoryData.filter((item: any) =>
        Object?.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm?.toLowerCase())
      )
    : [];


  const column = [
    {
      title: "S/N",
      dataIndex: "CategoryId",
      key: "CategoryId",
    },

    {
      title: "Content Category Name",
      dataIndex: "ContentCategoryName",
      key: "ContentCategoryName",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <span style={{ display: "flex", gap: "1rem" }}>
          <CustomDropdown
            placement="bottom"
            dropdownButton={<Ellipsis style={{ cursor: "pointer" }} />}
            dropdownContent={
              <>
                <Link to={""} onClick={() => openEditModal(record)}>
                  Edit
                </Link>
                <Link to={"#"} onClick={() => openViewModal()}>
                  Delete
                </Link>
              </>
            }
          />
        </span>
      ),
    },
  ];
  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });
  return (
    <section>
      <div className={styles.header}>
        <Layout heading="Content Management" />

        <div>
          <Button
            text="Create Category"
            onClick={openViewModal}
          />
        </div>
      </div>

      {getCategoryQuery?.isLoading ? (
        <Spinner />
      ) : getCategoryQuery?.isError ? (
        <h1 className="error">{getCategoryErrorMessage}</h1>
      ) : (
        <div className={styles.body}>
          <div className={styles.inside}>
            <p>Showing 1-11 of {filteredData?.length}</p>
            <div>
              {!showSearch && (
                <Search
                  onClick={() => setShowSearch((showSearch) => !showSearch)}
                />
              )}
              {showSearch && (
                <SearchInput onChange={(e) => setSearchTerm(e.target.value)} />
              )}
              <Filter />
            </div>
          </div>

          <Table
            columns={column}
            dataSource={filteredData}
            className={styles.row}
            rowKey={"CategoryId"}
            scroll={{ x: 400 }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              onChange: handlePaginationChange,
              position: ["bottomCenter"],
            }}
          />
        </div>
      )}

      <Modal
        open={showModal}
        footer=""
        onCancel={() => setShowModal(false)}
        centered
        closeIcon={<Cancel />}
        className="modal"
      >
        <CreateCategoryModal  handleCloseModal={()=>setShowModal(false)} />
      </Modal>
      
      <Modal
        open={showEditModal}
        footer=""
        onCancel={() => setShowEditModal(false)}
        centered
        closeIcon={<Cancel />}
        className="modal"
      >
        <EditCategory CategoryData={data} handleCloseEditModal={()=>setShowEditModal(false)} />
      </Modal>
    </section>
  );
};

export default Category;
