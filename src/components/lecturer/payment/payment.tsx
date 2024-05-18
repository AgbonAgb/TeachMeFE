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
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { useQueries } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetPaymentByLecturerId } from "../../../requests";
import { userAtom } from "../../../store/store";
import { useAtomValue } from "jotai";
import { formatDate } from "../../utils/dateUtils";

interface PaymentData {
  Amount: string;
  ContentId: string;
  CustomerEmail: string;
  CustomerName: string;
  CustomerPhone: string;
  PaymentChannel: string;
  PaymentReference: string;
  PaymentStatus: string;
  StudentId: string;
  TransactionDate: string;
}
const date = new Date();

const Payment = () => {
  const [showSearch, setShowSearch] = useState(false);
  const user = useAtomValue(userAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const openUploadModal = (record: any) => {
    setShowModal(true);
  };


  const [getContentQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-contents-"],
        // queryFn: ()=> GetPaymentByLecturerId(user?.UserId!),
        queryFn: ()=> GetPaymentByLecturerId('b98c3bd8-fb73-49aa-823a-1eb7bff8c13c'),
        retry: 0,
        refetchOnWindowFocus: false,
      },
   
      
    ],
  });

  const getPaymentError = getContentQuery?.error as AxiosError;
  const getPaymentErrorMessage = getPaymentError?.message;
  const getPaymentData= getContentQuery?.data?.data;

  const filteredData = getPaymentData && getPaymentData?.filter((item: PaymentData) =>
  Object?.values(item)
    .join(" ")
    .toLowerCase()
    .includes(searchTerm?.toLowerCase())
);
  const column = [
    // {
    //   title: "S/N",
    //   dataIndex: "S/N",
    //   key: "S/N",
    //   render: (text: number) => (
    //     <span>
    //       {text === date?.getFullYear() ? (
    //         <p>
    //           {" "}
    //           &#x20A6;{text} <span className={styles.current}>Current</span>
    //         </p>
    //       ) : (
    //         <p>&#x20A6;{text}</p>
    //       )}
    //     </span>
    //   ),
    // },
    {
      title: "Content ID",
      dataIndex: "ContentId",
      key: "ContentId",
    },
    {
      title: "Customer Email",
      dataIndex: "CustomerEmail",
      key: "CustomerEmail",
    
    },
    {
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
    
    },
    {
      title: "Transaction Date",
      dataIndex: "TransactionDate",
      key: "TransactionDate",
      render: (text: string) => (
        <span >{formatDate(text)}</span>
      ),
    },

    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (_: any, record: any) => (
    //     <span style={{ display: "flex", gap: "1rem" }}>
    //       <CustomDropdown
    //         placement="bottom"
    //         dropdownButton={<Ellipsis style={{ cursor: "pointer" }} />}
    //         dropdownContent={
    //           <>
    //             <Link to={""}>Play</Link>
    //             <Link to={""} onClick={() => openUploadModal(record)}>
    //             Download
    //             </Link>
    //           </>
    //         }
    //       />
    //     </span>
    //   ),
    // },
  ];
  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });
  return (
    <section>
      <div className={styles.header}>
        <Layout heading="My Payments" />

       
      </div>

      <div className={styles.body}>
        <div className={styles.inside}>
          <p>Showing 1-11 of {filteredData?.length}</p>
          <div>
            {!showSearch && (
              <Search
                onClick={() => setShowSearch((showSearch) => !showSearch)}
              />
            )}
            {showSearch && <SearchInput onChange={(e) => setSearchTerm(e.target.value)}/>}
            <Filter />
          </div>
        </div>

        <Table
          columns={column}
          dataSource={filteredData}
          className={styles.row}
          rowKey={"DueYear"}
          scroll={{ x: 400 }}
          pagination={{ current: currentPage, pageSize: pageSize, onChange: handlePaginationChange, position: ["bottomCenter"] }}
        />

      </div>
    </section>
  );
};

export default Payment;
