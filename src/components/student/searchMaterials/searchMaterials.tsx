import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import styles from "./styles.module.scss";
import SearchInput from "../../../custom/searchInput/searchInput";
import { App, Dropdown, MenuProps, Modal, Spin, Table, Tooltip } from "antd";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { useEffect, useState } from "react";
import CustomSelect from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { GetAllLecturersCall, GetAllMaterialsCall, GetMaterialTypesCall, ProcessPaymentCall, baseUrl } from "../../../requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatDate } from "../../utils/dateUtils";
import Spinner from "../../../custom/spinner/spinner";
import Input from "../../../custom/input/input";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/store";
import { errorMessage } from "../../utils/errorMessage";
import FilterSelect from "../../../custom/filterSelect/filterSelect";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        By Lecturer
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        By Category
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        By Material Type
      </a>
    ),
  },
];

const SearchMaterials = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [materialType, setMaterialType] = useState(0);
  const [lecturer, setLecturer] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const { notification } = App.useApp();
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialsResponse | null>();
  const [isOpenBuyMaterialModal, setIsOpenBuyMaterialModal] = useState(false);
  const [user] = useAtom(userAtom);

  const openViewModal = (record: any) => {
    setShowModal(true);
  };
  const openBuyMaterialModal = (item: any) => {
    setSelectedMaterial(item);
    setIsOpenBuyMaterialModal(true);
  };
  const closeBuyMaterialModal = () => {
    setIsOpenBuyMaterialModal(false);
    setSelectedMaterial(null);
  };
  const materialsColumn = [
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
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "Published Date",
      dataIndex: "PublishedDate",
      key: "PublishedDate",
      render: (item: any) => <p>{item ? formatDate(item) : "N/A"}</p>,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "Link Name",
      dataIndex: "LinkName",
      key: "LinkName",
      render: (item: any) => <p>{item ? <span style={{ textTransform: "capitalize" }}>{item}</span> : "N/A"}</p>,
    },
    {
      title: "LecturerId",
      dataIndex: "LecturerId",
      key: "LecturerId",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    {
      title: "Expiration Days",
      dataIndex: "ExpirationDays",
      key: "ExpirationDays",
      render: (item: any) => <p>{item ? item : "N/A"}</p>,
    },
    // {
    //   title: "ContentUrl",
    //   dataIndex: "ContentUrl",
    //   key: "ContentUrl",
    //   render: (item: any) => <ContentRenderer url={item.replace(/\\/g, '/')} />,
    // },
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
                <Link to={"#"} onClick={() => openBuyMaterialModal(record)}>
                  Buy
                </Link>
                <Link to={""} onClick={() => openViewModal(record)}>
                  Add to Cart
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

  const materialsQuery = useQuery({
    queryKey: ["get-materials"],
    queryFn: GetAllMaterialsCall,
  });

  const materialsData = materialsQuery?.data as any;
  const materialsError = materialsQuery?.error as AxiosError;

  const materialTypesQuery = useQuery({
    queryKey: ["get-material-types"],
    queryFn: GetMaterialTypesCall,
  });

  const materialTypesData = materialTypesQuery?.data?.Data as any;
  const materialTypesError = materialTypesQuery?.error as AxiosError;

  const MaterialTypeOptions = materialTypesData?.map((item: MaterialTypePayload) => {
    return materialTypesQuery.isLoading ? (
      <Spin size="small" />
    ) : (
      <option key={item?.Id} value={item?.Id}>
        {item?.Name}
      </option>
    );
  });

  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filterData = () => {
    let filteredData = materialsData;
    //Search
    if (searchTerm?.length > 0) {
      filteredData = filteredData?.filter((item: MaterialsResponse) => {
        return (
          item?.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.LecturerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.Amount?.toString().includes(searchTerm.toLowerCase())
        );
      });
    }
    // Filter by materialType
    if (materialType) {
      filteredData = filteredData.filter((item: MaterialsResponse) => parseInt(item?.MaterialTypeId) === materialType);
    }
    // Filter by lecturer
    if (lecturer) {
      filteredData = filteredData.filter((item: MaterialsResponse) => item?.LecturerId === lecturer);
    }
    setFilteredData(filteredData);
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Filter data whenever anything changes
    filterData();
  }, [searchTerm,materialType,lecturer, materialsData]);

  const processPaymentMutation = useMutation({
    mutationKey: ["process-payment"],
    mutationFn: ProcessPaymentCall,
  });

  const handleMaterialPayment = async (values: FormikValues) => {
    const payload: ProcessPaymentPayload = {
      Amount: selectedMaterial?.Amount!,
      Description: selectedMaterial?.Description!,
      ReturnURL: `${baseUrl}/my-paid-materials`,
      PaymentForm: "MaterialSubscription",
      StudentId: user?.UserId!,
      ContentId: selectedMaterial?.ContentId!,
    };
    try {
      await processPaymentMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          const responseData = JSON.parse(data?.ResponsePayLoad) as PaymentDetails;
          window.location.href = responseData?.RedirectURL;
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error),
      });
    }
  };

  
  const handleSelectMaterialType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedElection = parseInt(e.target.value);
    setMaterialType(selectedElection);
  };
  const handleSelectLecturer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLecturer(e.target.value);
  };


  if (materialsQuery?.isLoading) {
    return <Spinner />;
  }

  if (materialsQuery?.isLoading) {
    return <div>{materialsError?.message}</div>;
  }

  return (
    <section>
      <div className={styles.header}>
        <h1>Search Materials</h1>
      </div>

      <div className={styles.body}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && <span><Search onClick={() => setShowSearch((showSearch) => !showSearch)} /></span>}
            {showSearch && <SearchInput value={searchTerm} onChange={handleSearch} />}
            {showAllFilter && 
            <> 
            <FilterSelect placeholder="Material Type" options={MaterialTypeOptions} value={materialType} onChange={handleSelectMaterialType}></FilterSelect>
            <FilterSelect placeholder="Lecturer" options={lecturerOptions} value={lecturer} onChange={handleSelectLecturer}></FilterSelect>
            </>
           
            }
            {!showAllFilter && <Filter onClick={()=>setShowAllFilter((showAllFilter) => !showAllFilter )}/>}

         
          </div>
        </div>

        <Table
          columns={materialsColumn}
          dataSource={filteredData}
          pagination={{ current: currentPage, pageSize: pageSize, onChange: handlePaginationChange, position: ["bottomCenter"] }}
          className={styles.row}
          rowKey={"ContentId"}
          scroll={{ x: 400 }}
        />

        <Modal open={showModal} footer="" onCancel={() => setShowModal(false)} centered closeIcon={<Cancel />} className="modal">
          {/* <PublishModal handleCloseModal={!showModal} /> */}
          <div className={styles.modalContent}>
            <h1>Subscribe to a Lecturer</h1>
            <div className={styles.form}>
              <FormikProvider value={formik}>
                <Field as={CustomSelect} label="Lecturer Name" name="lecturerName" placeholder="Select Lecturer" className={styles.input} />
                <Button text="Subscribe" className={styles.button} />
              </FormikProvider>
            </div>
          </div>
        </Modal>

        {selectedMaterial && isOpenBuyMaterialModal && (
          <Modal open={isOpenBuyMaterialModal} onCancel={closeBuyMaterialModal} className="modal" centered closeIcon={<Cancel />} footer="">
            <div className={styles.modalContent}>
              <h1>Material Details</h1>
              <div className={styles.form}>
                <FormikProvider value={formik}>
                  <Field as={Input} label="Title" name="Title" placeholder={selectedMaterial?.Title} className={styles.input} disabled displayInput="text" />
                  <Field as={Input} label="Description" name="Title" placeholder={selectedMaterial?.Description} className={styles.input} disabled displayInput="text" />
                  <Field as={Input} label="Lecturer Name" name="Title" placeholder={selectedMaterial?.LecturerId} className={styles.input} disabled displayInput="text" />
                  <Field as={Input} label="Amount" name="Title" placeholder={selectedMaterial?.Amount} className={styles.input} disabled displayInput="text" />
                  <div className={styles.twoButtons}>
                    <Button text="Cancel" className={styles.cancel} onClick={closeBuyMaterialModal} />
                    <Button text="Proceed to Buy" onClick={handleMaterialPayment} isLoading={processPaymentMutation.isPending} disabled={processPaymentMutation?.isPending} />
                  </div>
                </FormikProvider>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default SearchMaterials;
