import React, { useEffect, useState } from "react";
import CustomButton from "../../../custom/button/button";
import styles from "./styles.module.scss";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { App, Button, Dropdown, MenuProps, Modal, Table, Tooltip } from "antd";
import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import SearchInput from "../../../custom/searchInput/searchInput";
import CustomSelect from "../../../custom/select/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetAllLecturersCall, SubscribeToLecturersCall } from "../../../requests";
import { AxiosError } from "axios";
import Spinner from "../../../custom/spinner/spinner";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/store";
import { object, string } from "yup";
import { errorMessage } from "../../utils/errorMessage";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { notification } = App.useApp();
  const [user] = useAtom(userAtom);
  const userId = user?.UserId;

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
          <Ellipsis  style={{ cursor: "pointer" }} />
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

  const lecturerOptions =
    lecturersData &&
    lecturersData?.map((item: LecturersResponse) => (
      <option key={item?.LecturerId} value={item?.LecturerId}>
        {item?.FirstName} {item?.LastName}
      </option>
    ));

  const validationRules = object().shape({
    LecturerId: string().required("Select a Lecturer"),
  });

  const subscribeToLecturerMutation = useMutation({
    mutationKey: ["subscribe-to-lecturer"],
    mutationFn: SubscribeToLecturersCall,
  });

  const subscribeToLecturerHandler = async (values: FormikValues, resetForm: () => void) => {
    const payload: SubscribePayload = {
      LecturerId: values?.LecturerId,
      UserId: userId!,
    };
    try {
      const data = await subscribeToLecturerMutation.mutateAsync(payload);
      notification.success({
        message: "Success",
        description: data.Message,
      });
      resetForm();
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
      resetForm();
    }
  };

  const formik = useFormik<FormikValues>({
    initialValues: {
      LecturerId: "",
    },
    onSubmit: (values) => {
      console.log(values);
      subscribeToLecturerHandler(values, formik.resetForm);
    },
    validationSchema: validationRules,
  });

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
    setFilteredData(filteredData);
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Filter data whenever anything changes
    filterData();
  }, [searchTerm, lecturersData]);

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
          <CustomButton text="Subscribe" onClick={openViewModal} />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && <Search onClick={() => setShowSearch((showSearch) => !showSearch)} />}
            {showSearch && <SearchInput value={searchTerm} onChange={handleSearch} />}

            <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
              <Filter />
            </Dropdown>
          </div>
        </div>

        <Table
          columns={lecturersColumn}
          dataSource={filteredData}
          className={styles.row}
          rowKey={"LecturerId"}
          scroll={{ x: 400 }}
          pagination={{ current: currentPage, pageSize: pageSize, onChange: handlePaginationChange, position: ["bottomCenter"] }}
        />

        <Modal open={showModal} footer="" onCancel={() => setShowModal(false)} centered closeIcon={<Cancel />} className="modal">
          {/* <PublishModal handleCloseModal={!showModal} /> */}
          <div className={styles.modalContent}>
            <h1>Subscribe to a Lecturer</h1>
            <div className={styles.form}>
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <Field as={CustomSelect} label="Lecturer Name" name="LecturerId" placeholder="Select Lecturer" className={styles.input}>
                    {lecturerOptions}
                  </Field>
                  <CustomButton text="Subscribe" className={styles.button} type="submit" />
                </form>
              </FormikProvider>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Subscribe;
