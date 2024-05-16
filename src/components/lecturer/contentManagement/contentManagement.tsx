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
import { useNavigate } from "react-router-dom";

const date = new Date();

const Subscribe = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  const openUploadModal = (record: any) => {
    setShowModal(true);
  };
  const column = [
    {
      title: "S/N",
      dataIndex: "S/N",
      key: "S/N",
      render: (text: number) => (
        <span>
          {text === date?.getFullYear() ? (
            <p>
              {" "}
              &#x20A6;{text} <span className={styles.current}>Current</span>
            </p>
          ) : (
            <p>&#x20A6;{text}</p>
          )}
        </span>
      ),
    },
    {
      title: "Content ID",
      dataIndex: "ContentId",
      key: "ContentId",
      render: (text: string) => <span>&#x20A6;{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
      render: (text: string) => (
        <span className={styles.balance}>&#x20A6;{text}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      render: (text: string) => (
        <span className={styles.balance}>&#x20A6;{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      render: (text: string) => (
        <span className={styles.balance}>&#x20A6;{text}</span>
      ),
    },
    {
      title: "Material Type",
      dataIndex: "MaterialType",
      key: "MaterialType",
      render: (text: string) => (
        <span className={styles.balance}>&#x20A6;{text}</span>
      ),
    },
    {
      title: "Expiry Days",
      dataIndex: "ExpiryDays",
      key: "ExpiryDays",
      render: (text: string) => (
        <span className={styles.balance}>&#x20A6;{text}</span>
      ),
    },
    {
      title: "Publish Date",
      dataIndex: "PublishDate",
      key: "PublishDate",
      render: (text: string) => (
        <span className={styles.balance}>&#x20A6;{text}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <span style={{ display: "flex", gap: "1rem" }}>
          <Tooltip placement="bottom" title={"View"} color="#335642">
            <Ellipsis
              // onClick={() => openViewModal(record)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
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
          dataSource={data}
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
          <ContentUpload/>
        </Modal>
      </div>
    </section>
  );
};

export default Subscribe;
