import React, { useEffect, useState } from "react";
import Button from "../../../custom/button/button";
import styles from "./styles.module.scss";
import SearchInput from "../../../custom/searchInput/searchInput";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { Modal, Table } from "antd";
import { data } from "../../utils/table-data";
import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import CustomSelect from "../../../custom/select/select";
import Layout from "../../layout/layout";
import ContentUpload from "./modalContent/contentUpload";
import EditContentUpload from "./modalContent/editContentUpload";

import { Link, useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatDate } from "../../utils/dateUtils";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import {
  GetAllContents,
  GetCategoryByLecturerId,
  GetContentByCategoryId,
  GetMaterialTypeCall,
} from "../../../requests";
import Spinner from "../../../custom/spinner/spinner";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../store/store";
import FilterSelect from "../../../custom/filterSelect/filterSelect";

const ContentManagement = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({} as any);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAtomValue(userAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const handleClose =()=>{
    setShowModal(false)
  }

  const openViewModal = (record: any) => {
    setShowModal(true);
    setData(record);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const [getContentQuery, getContentByCategoryQuery,getMaterialTypeQuery, getCategoryQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-contents"],
        queryFn: () => GetAllContents(user?.UserId!),
        retry: 0,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["get-all-contents-by-category", category],
        queryFn: () => GetContentByCategoryId(user?.UserId!, category),
        retry: 0,
        refetchOnWindowFocus: false,
        // enabled:!!category
      },
      {
        queryKey: ["get-all-material-type"],
        queryFn: GetMaterialTypeCall,
        retry: 0,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["get-all-category"],
        queryFn: () => GetCategoryByLecturerId(user?.UserId!),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const getContentError = getContentQuery?.error as AxiosError;
  const getContentErrorMessage = getContentError?.message;
  const getContentData = getContentQuery?.data?.data;

  const getContentByCategoryError =
    getContentByCategoryQuery?.error as AxiosError;
  const getContentErrorByCategoryMessage = getContentByCategoryError?.message;
  const getContentDataByCategory = getContentByCategoryQuery?.data?.data;

  const filteredData = Array.isArray(getContentData)
    ? getContentData.filter((item: any) =>
        Object?.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm?.toLowerCase())
      )
    : [];

  const filteredDataByCategory = Array.isArray(getContentDataByCategory)
    ? getContentDataByCategory.filter((item: any) =>
        Object?.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm?.toLowerCase())
      )
    : [];

  // const [getMaterialTypeQuery, getCategoryQuery] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["get-all-material-type"],
  //       queryFn: GetMaterialTypeCall,
  //       retry: 0,
  //       refetchOnWindowFocus: false,
  //     },
  //     {
  //       queryKey: ["get-all-category"],
  //       queryFn: () => GetCategoryByLecturerId(user?.UserId!),
  //       retry: 0,
  //       refetchOnWindowFocus: false,
  //     },
  //   ],
  // });

  const getMaterialError = getMaterialTypeQuery?.error as AxiosError;
  const getMaterialErrorMessage = getMaterialError?.message;

  const getCategoryError = getCategoryQuery?.error as AxiosError;
  const getCategoryErrorMessage = getCategoryError?.message;

  const getMaterialData = getMaterialTypeQuery?.data?.data?.Data;
  const getCategoryData = getCategoryQuery?.data?.data?.Data;

  const materialOptions =
    getMaterialData && getMaterialData?.length > 0 ? (
      getMaterialData?.map((item: any, index: number) => (
        <option value={item?.Id} key={index + 1}>
          {item?.Name}
        </option>
      ))
    ) : (
      <option disabled>
        {getMaterialTypeQuery?.isLoading
          ? "loading...."
          : getMaterialTypeQuery?.isError
          ? getMaterialErrorMessage
          : ""}
      </option>
    );

  const categoryOptions =
    getCategoryData && getCategoryData?.length > 0 ? (
      getCategoryData?.map((item: any, index: number) => (
        <option value={item?.CategoryId} key={index + 1}>
          {item?.ContentCategoryName}
        </option>
      ))
    ) : (
      <option disabled>
        {getCategoryQuery?.isLoading
          ? "loading...."
          : getCategoryQuery?.isError
          ? getCategoryErrorMessage
          : ""}
      </option>
    );

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const AllResults = category ? filteredDataByCategory : filteredData;
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize,AllResults &&  AllResults.length);

  const column = [
    {
      title: "S/N",
      dataIndex: "index",
      key: "index",
      render: (text: any, record: any, index: number) => <span>{(currentPage - 1) * pageSize + index + 1}</span>,
    },

    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "ContentUrl",
      dataIndex: "ContentUrl",
      key: "ContentUrl",

      render: (text: string) => (
        <span>
          {
            <a href={text} target="_blank" rel="noreferrer">
              material
            </a>
          }
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "CategoryName",
      key: "CategoryName",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (text: string) => (
        <span className={styles.balance}>&#x20A6;{text}</span>
      ),
    },
    {
      title: "Material Type",
      dataIndex: "MaterialTypeName",
      key: "MaterialTypeName",
      //
    },
    {
      title: "Expiry Days",
      dataIndex: "ExpirationDays",
      key: "ExpirationDays",
    },
    {
      title: "Publish Date",
      dataIndex: "PublishedDate",
      key: "PublishedDate",
      render: (text: string) => <span>{formatDate(text)}</span>,
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
                <Link to={""} onClick={() => openViewModal(record)}>
                  Edit
                </Link>
                <Link to={"#"} onClick={() => openViewModal(record)}>
                  Delete
                </Link>
              </>
            }
          />
        </span>
      ),
    },
  ];
  console.log(data, "data");
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
            text="Upload Content"
            onClick={() => {
              navigate("/upload-content");
            }}
          />
        </div>
      </div>

      {getContentQuery?.isLoading ? (
        <Spinner />
      ) : getContentQuery?.isError ? (
        <h1 className="error">{getContentErrorMessage}</h1>
      ) : (
        <div className={styles.body}>
          <div className={styles.inside}>
            {AllResults && AllResults?.length > 0 ? 
              <p>
                Showing {startIndex}-{endIndex} of {AllResults?.length}
              </p> :
              <p>Showing 0</p>
            }

            <div>
              {!showSearch && (
                <Search
                  onClick={() => setShowSearch((showSearch) => !showSearch)}
                />
              )}
              {showSearch && (
                <SearchInput onChange={(e) => setSearchTerm(e.target.value)} />
              )}
              {showAllFilter && (
                <>
                  <FilterSelect
                    placeholder="Category"
                    options={categoryOptions}
                    value={category}
                    onChange={handleSelectCategory}
                  ></FilterSelect>
                </>
              )}
              {!showAllFilter && (
                <Filter
                  onClick={() =>
                    setShowAllFilter((showAllFilter) => !showAllFilter)
                  }
                />
              )}
            </div>
          </div>

          <Table
            columns={column}
            dataSource={category ? filteredDataByCategory : filteredData}
            // pagination={false}
            className={styles.row}
            rowKey={"ContentId"}
            scroll={{ x: 400 }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              onChange: handlePaginationChange,
              position: ["bottomCenter"],
            }}
          />

          <Modal
            open={showModal}
            footer=""
            onCancel={() => setShowModal(false)}
            centered
            closeIcon={<Cancel />}
            className="modal"
          >
            <EditContentUpload handleClose={handleClose}  getData={data}/>
          </Modal>
          {/* <Modal
          open={showModal}
          footer=""
          onCancel={() => setShowModal(false)}
          centered
          closeIcon={<Cancel />}
          className="modal"
        >
          <ContentUpload categoryOptions={categoryOptions} materialOptions={materialOptions} data={data} />
        </Modal> */}
        </div>
      )}
    </section>
  );
};

export default ContentManagement;
