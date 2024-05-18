import React, { useEffect, useState } from "react";
import CustomButton from "../../../custom/button/button";
import styles from "./styles.module.scss";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { Button, Dropdown, MenuProps, Modal, Spin, Table, Tooltip } from "antd";
import { data } from "../../utils/table-data";
import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import SearchInput from "../../../custom/searchInput/searchInput";
import CustomSelect from "../../../custom/select/select";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAllLecturersCall, GetMaterialTypesCall } from "../../../requests";
import Spinner from "../../../custom/spinner/spinner";
import FilterSelect from "../../../custom/filterSelect/filterSelect";

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

const Messages = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [materialType, setMaterialType] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

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
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <span style={{ display: "flex", gap: "1rem" }}>
          <CustomDropdown
            placement="bottom"
            dropdownButton={<Ellipsis style={{ cursor: "pointer" }} />}
            dropdownContent={
              <>
                <Link to={"/message/view"}>View Response</Link>
                <Link to={""} onClick={() => openViewModal(record)}>
                  Delete
                </Link>
              </>
            }
          />
        </span>
      ),
    },
  ];

  const lecturersQuery = useQuery({
    queryKey: ["get-lecturers"],
    queryFn: GetAllLecturersCall,
  });

  const lecturersData = lecturersQuery?.data as any;
  const lecturersError = lecturersQuery?.error as AxiosError;

  const lecturerOptions =
    lecturersData &&
    lecturersData?.map((item: LecturersResponse) => (
      <option key={item?.LecturerId} value={item?.LecturerId}>
        {item?.FirstName} {item?.LastName}
      </option>
    ));

  const filterData = () => {
    let filteredData = lecturersData;
    //Search
    if (searchTerm?.length > 0) {
      filteredData = filteredData?.filter((item: LecturersResponse) => {
        return (
          item?.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.Address?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    // Filter by materialType
    if (materialType) {
      filteredData = filteredData.filter((item: LecturersResponse) => parseInt(item?.UserType) === materialType);
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Filter data whenever anything changes
    filterData();
  }, [searchTerm, lecturersData]);

  const materialTypesQuery = useQuery({
    queryKey: ["get-material-types"],
    queryFn: GetMaterialTypesCall,
  });

  const materialTypesData = materialTypesQuery?.data?.Data as any;
  const materialTypesError = materialTypesQuery?.error as AxiosError;


  

  const MaterialTypeOptions = materialTypesData?.map((item: any) => {
    return materialTypesQuery.isLoading ? (
      <Spin size="small" />
    ) : (
      <option key={item?.Id} value={item?.Id}>
        {item?.ElectionName}
      </option>
    );
  });

  const handleSelectMaterialType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedElection = parseInt(e.target.value);
    setMaterialType(selectedElection);
  };

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
          <CustomButton text="Send Message" onClick={() => navigate("/send-message")} />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && <Search onClick={() => setShowSearch((showSearch) => !showSearch)} />}
            {showSearch && <SearchInput />}
            {showAllFilter && <FilterSelect placeholder="Material Type" options={MaterialTypeOptions} value={materialType} onChange={handleSelectMaterialType}></FilterSelect>}
{/* 
            <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}> */}
              <Filter onClick={()=>setShowAllFilter((showAllFilter) => !showAllFilter )}/>
            {/* </Dropdown> */}
         
          </div>
        </div>

        <Table
          columns={lecturersColumn}
          dataSource={lecturersData}
          rowKey={"LecturerId"}
          scroll={{ x: 400 }}
          className={styles.row}
          pagination={{ current: currentPage, pageSize: pageSize, onChange: handlePaginationChange, position: ["bottomCenter"] }}
        />

        <Modal open={showModal} footer="" onCancel={() => setShowModal(false)} centered closeIcon={<Cancel />} className="modal">
          {/* <PublishModal handleCloseModal={!showModal} /> */}
          <div className={styles.modalContent}>
            <h1>Messages to a Lecturer</h1>
            <div className={styles.form}>
              <FormikProvider value={formik}>
                <Field as={CustomSelect} label="Lecturer Name" name="lecturerName" placeholder="Select Lecturer" className={styles.input} />
                <CustomButton text="Messages" className={styles.button} />
              </FormikProvider>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Messages;
