import React, { useState } from "react";
import Button from "../../../custom/button/button";
import styles from "./styles.module.scss";
import SearchInput from "../../../custom/searchInput/searchInput";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { Modal, Popover, Table, Tooltip } from "antd";
import { data } from "../../utils/table-data";
import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import CustomSelect from "../../../custom/select/select";
import Layout from "../../layout/layout";
import ContentUpload from "./modalContent/contentUpload";
import { Link, useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatDate } from "../../utils/dateUtils";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { GetAllContents } from "../../../requests";
import Spinner from "../../../custom/spinner/spinner";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../store/store";

const date = new Date();

const Subscribe = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({} as any);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAtomValue(userAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const navigate = useNavigate()

  const openViewModal = (record: any) => {
    setShowModal(true);
    setData(record);

  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

 
  const [getContentQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-contents-"],
        queryFn:()=> GetAllContents(user?.UserId!),
        retry: 0,
        refetchOnWindowFocus: false,
      },
   
      
    ],
  });

  const getContentError = getContentQuery?.error as AxiosError;
  const getContentErrorMessage = getContentError?.message;
  const getContentData = getContentQuery?.data?.data;

    const filteredData = getContentData && getContentData?.filter((item: any) =>
    Object?.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm?.toLowerCase())
  );

console.log(searchTerm, 'getContentQuery')
  const column = [
    {
      title: "S/N",
      dataIndex: "ContentId",
      key: "ContentId",
      
      
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
        <span >{<a  href={text} target="_blank" rel="noreferrer">material</a>}</span>
      ),

    
    },
    {
      title: "Category",
      dataIndex: "CategoryId",
      key: "CategoryId",
      
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
      dataIndex: "MaterialTypeId",
      key: "MaterialTypeId",
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
      render: (text: string) => (
        <span >{formatDate(text)}</span>
      ),
    
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
                <Link to={""}  onClick={() => openViewModal(record)}>Edit</Link>
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
  console.log(data, 'data')
  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });
  return (
    <section>
      <div className={styles.header}>
        <Layout heading="Content Management" />

        <div>
          <Button text="Upload Content" onClick={()=>{navigate('/upload-content')}} />
        </div>

      </div>

      {getContentQuery?.isLoading ? (
        <Spinner />
      ) : getContentQuery?.isError ? (
        <h1 className="error">{getContentErrorMessage}</h1>
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
            {showSearch && <SearchInput  onChange={(e) => setSearchTerm(e.target.value)} />}
            <Filter />
          </div>
        </div>

        <Table
          columns={column}
          dataSource={filteredData}
          // pagination={false}
          className={styles.row}
          rowKey={"ContentId"}
          scroll={{ x: 400 }}
          pagination={{ current: currentPage, pageSize: pageSize, onChange: handlePaginationChange, position: ["bottomCenter"] }}
        />

        <Modal
          open={showModal}
          footer=""
          onCancel={() => setShowModal(false)}
          centered
          closeIcon={<Cancel />}
          className="modal"
        >
          {/* <PublishModal handleCloseModal={!showModal} /> */}
          {/* <div className={styles.modalContent}>
            <h1>Subscribe to a Lecturer</h1>
            <div className={styles.form}>
              <FormikProvider value={formik}>
                <Field
                  as={CustomSelect}
                  label="Lecturer Name"
                  name="lecturerName"
                  placeholder="Select Lecturer"
                  className={styles.input}
                />
                <Button text="Subscribe" className={styles.button} />
              </FormikProvider>
            </div>
          </div> */}
          <ContentUpload data={data}/>
        </Modal>
      </div>
      )}
    </section>
  );
};

export default Subscribe;
