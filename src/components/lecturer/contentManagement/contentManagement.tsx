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
import apiCall from "../../utils/apiCall";
import { useQueries } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatDate } from "../../utils/dateUtils";
import CustomDropdown from "../../../custom/dropdown/dropdown";

const date = new Date();

const Subscribe = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({} as any);

  const navigate = useNavigate()

  const openViewModal = (record: any) => {
    setShowModal(true);
    setData(record);

  };

  const getContents = async () => {
    const url = "/Lecturer/GetAllContent";

    return await apiCall().get(url);
  };
  const [getContentQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-contents-"],
        queryFn: getContents,
        retry: 0,
        refetchOnWindowFocus: false,
      },
   
      
    ],
  });

  const getContentError = getContentQuery?.error as AxiosError;
  const getContentErrorMessage = getContentError?.message;
  const getContentData = getContentQuery?.data?.data;

console.log(getContentData, 'getContentQuery')
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

      <div className={styles.body}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && (
              <Search
                onClick={() => setShowSearch((showSearch) => !showSearch)}
              />
            )}
            {showSearch && <SearchInput />}
            <Filter />
          </div>
        </div>

        <Table
          columns={column}
          dataSource={getContentData}
          pagination={false}
          className={styles.row}
          rowKey={"DueYear"}
          scroll={{ x: 400 }}
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
    </section>
  );
};

export default Subscribe;
