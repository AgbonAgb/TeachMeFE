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
import { useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { GetAllStudentSubscriberByLecturer } from "../../../requests";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../store/store";
import { AxiosError } from "axios";
import { formatDate } from "../../utils/dateUtils";
const date = new Date();

const Subscriptions = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const [getLecturerSubscriberQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-student-subscriber-by-lecture"],
        queryFn: () => GetAllStudentSubscriberByLecturer(user?.UserId!),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const getLecturerSubscriberError =
    getLecturerSubscriberQuery?.error as AxiosError;
  const getLecturerSubscriberErrorMessage = getLecturerSubscriberError?.message;
  const getLecturerSubscriberData = getLecturerSubscriberQuery?.data?.data;

  const filteredData = Array.isArray(getLecturerSubscriberData)
    ? getLecturerSubscriberData.filter((item: any) =>
        Object?.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm?.toLowerCase())
      )
    : [];

    const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredData && filteredData.length);


  const column = [
    {
      title: "S/N",
      dataIndex: "index",
      key: "index",
      render: (text: any, record: any, index: number) => (
        <span>{(currentPage - 1) * pageSize + index + 1}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone No.",
      dataIndex: "Phone",
      key: "Phone",
      render: (text: string) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Student Name",
      dataIndex: "StudenName",
      key: "StudenName",
      render: (text: string) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Date",
      dataIndex: "TransDate",
      key: "TransDate",
      render: (text: string) => <span>{formatDate(text)}</span>,
    },

  ];
  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });
  return (
    <section>
      <div className={styles.header}>
        <Layout heading="My Subscriptions" />
      </div>

      <div className={styles.body}>
        <div className={styles.inside}>
          {filteredData && filteredData?.length > 0 ? 
              <p>
                Showing {startIndex}-{endIndex} of {filteredData?.length}
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
            )}{" "}
            {!showAllFilter && (
              <Filter
                onClick={() =>
                  setShowAllFilter((showAllFilter) => !showAllFilter)
                }
              />
            )}{" "}
          </div>
        </div>

        <Table
          columns={column}
          dataSource={filteredData}
          className={styles.row}
          rowKey={"DueYear"}
          scroll={{ x: 400 }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: handlePaginationChange,
            position: ["bottomCenter"],
          }}
        />
      </div>
    </section>
  );
};

export default Subscriptions;
