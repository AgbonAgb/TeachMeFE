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
import Spinner from "../../../custom/spinner/spinner";

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


  const [getPaymentQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-contents-"],
        queryFn: ()=> GetPaymentByLecturerId(user?.UserId!),
        // queryFn: ()=> GetPaymentByLecturerId('b98c3bd8-fb73-49aa-823a-1eb7bff8c13c'),
        retry: 0,
        refetchOnWindowFocus: false,
      },
   
      
    ],
  });

  const getPaymentError = getPaymentQuery?.error as AxiosError;
  const getPaymentErrorMessage = getPaymentError?.message;
  const getPaymentData= getPaymentQuery?.data?.data;

  const filteredData = getPaymentData && getPaymentData?.filter((item: PaymentData) =>
  Object?.values(item)
    .join(" ")
    .toLowerCase()
    .includes(searchTerm?.toLowerCase())
);

const startIndex = (currentPage - 1) * pageSize + 1;
const endIndex = Math.min(currentPage * pageSize, filteredData && filteredData.length);


  const column = [
    {
      title: "S/N",
      dataIndex: "index",
      key: "index",
      render: (text: any, record: any, index: number) => <span>{(currentPage - 1) * pageSize + index + 1}</span>,
    },
    {
      title: "Content Name",
      dataIndex: "ContentName",
      key: "ContentName",
    },
    {
      title: "Category Name",
      dataIndex: "Categoryame",
      key: "Categoryame",
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
      title: "Amount Paid",
      dataIndex: "Amount",
      key: "Amount",
      render: (text: string) => (
        <span className={styles.balance}>&#x20A6;{text}</span>
      ),
    
    },
    {
      title: "Transaction Date",
      dataIndex: "TransactionDate",
      key: "TransactionDate",
      render: (text: string) => (
        <span >{formatDate(text)}</span>
      ),
    },

  ];
 
  return (
    <section>
      <div className={styles.header}>
        <Layout heading="My Payments" />

       
      </div>
      {getPaymentQuery?.isLoading ? (
        <Spinner />
      ) : getPaymentQuery?.isError ? (
        <h1 className="error">{getPaymentErrorMessage}</h1>
      ) : (

      <div className={styles.body}>
        <div className={styles.inside}>
          
        {filteredData && filteredData?.length > 0 ? 
              <p>
                Showing {startIndex}-{endIndex} of {filteredData?.length}
              </p> :
              <p>Showing 0</p>
            }          <div>
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
      )}
      
    </section>
  );
};

export default Payment;
