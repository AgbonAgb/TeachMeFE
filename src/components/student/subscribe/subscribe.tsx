import React, { useState } from "react";
import CustomButton from "../../../custom/button/button";
import styles from "./styles.module.scss";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { Button, Dropdown, MenuProps, Modal, Table, Tooltip } from "antd";
import { data } from "../../utils/table-data";
import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import SearchInput from "../../../custom/searchInput/searchInput";
import CustomSelect from "../../../custom/select/select";
import { useQuery } from "@tanstack/react-query";
import { GetAllLecturersCall } from "../../../requests";
import { LecturersResponse } from "../../../requests/types";
import { AxiosError } from "axios";
import Spinner from "../../../custom/spinner/spinner";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/store";

const date = new Date();
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Material Type
      </a>
    ),
  },
];

const Subscribe = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [user] = useAtom(userAtom);
  console.log(user);

  const openViewModal = (record: any) => {
    setShowModal(true);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const lecturersColumn = [
    {
      title: "S/N",
      dataIndex: "index",
      key: "index",
      render: (text: any, record: any, index: number) => <span>{(currentPage - 1) * pageSize + index + 1}</span>,
    },

    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "Email Address",
      dataIndex: "Email",
      key: "Email",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "Link Name",
      dataIndex: "LinkName",
      key: "LinkName",
      render: (item: any) => <p>{item ? <span style={{ textTransform: "capitalize" }}>{item}</span> : "N/A"}</p>,
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "PixUrl",
      dataIndex: "PixUrl",
      key: "PixUrl",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "IdCardUrl",
      dataIndex: "IdCardUrl",
      key: "IdCardUrl",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <Tooltip title="View">
          <Ellipsis
            onClick={() => openViewModal(record)}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
       
      ),
    },
  ];

  const lecturersQuery = useQuery({
    queryKey: ["get-lecturers"],
    queryFn: GetAllLecturersCall,
  });

  const lecturersData = lecturersQuery?.data as any;
  const lecturersError = lecturersQuery?.error as AxiosError;

  const lecturerOptions = lecturersData && lecturersData?.map((item: LecturersResponse) => (
    <option key={item?.LecturerId} value={item?.LecturerId}>
        {item?.FirstName} {item?.LastName}
    </option>
))

  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });

  if (lecturersQuery?.isLoading) {
    return <Spinner />;
  }

  if (lecturersQuery?.isLoading) {
    return <div>{lecturersError?.message}</div>;
  }
  return (
    <section>
      <div className={styles.header}>
        <h1>Lecturers</h1>
        <div>
          <CustomButton text="Subscribe" onClick={openViewModal}/>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && <Search onClick={() => setShowSearch((showSearch) => !showSearch)} />}
            {showSearch && <SearchInput />}

            <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
              <Filter />
            </Dropdown>
          </div>
        </div>

        <Table
          columns={lecturersColumn}
          dataSource={lecturersData}
          className={styles.row}
          rowKey={"DueYear"}
          scroll={{ x: 100 }}
          pagination={{ current: currentPage, pageSize: pageSize, onChange: handlePaginationChange, position: ["bottomCenter"] }}
        />

        <Modal open={showModal} footer="" onCancel={() => setShowModal(false)} centered closeIcon={<Cancel />} className="modal">
          {/* <PublishModal handleCloseModal={!showModal} /> */}
          <div className={styles.modalContent}>
            <h1>Subscribe to a Lecturer</h1>
            <div className={styles.form}>
              <FormikProvider value={formik}>
                <Field as={CustomSelect} label="Lecturer Name" name="lecturerName" placeholder="Select Lecturer" className={styles.input} >{lecturerOptions}</Field>
                <CustomButton text="Subscribe" className={styles.button} />
              </FormikProvider>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Subscribe;
