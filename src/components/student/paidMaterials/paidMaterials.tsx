import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import styles from "./styles.module.scss";
import SearchInput from "../../../custom/searchInput/searchInput";
import { App, Divider, Dropdown, MenuProps, Modal, Spin, Table, Tooltip } from "antd";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { useEffect, useState } from "react";
import CustomSelect from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import { data } from "../../utils/table-data";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { Link, useSearchParams } from "react-router-dom";
import { GetAllLecturersCall, GetContentByIdCall, GetMaterialTypesCall, GetMyPaidMaterialsCall, QueryPaymentCall } from "../../../requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorMessage } from "../../utils/errorMessage";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/store";
import { AxiosError } from "axios";
import ContentRenderer from "../../../custom/contentRenderer/contentRenderer";
import { formatDate } from "../../utils/dateUtils";
import Spinner from "../../../custom/spinner/spinner";
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

const MyPaidMaterials = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [materialType, setMaterialType] = useState(0);
  const [lecturer, setLecturer] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [params] = useSearchParams();
  const ref = params.get("ref");
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [viewMaterialModal, setViewMaterialModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialsResponse | null>();
  const [file, setFile] = useState<string | null>(null);
  const [user] = useAtom(userAtom);

  const openViewModal = (record: any) => {
    setShowModal(true);
  };
  const openViewMaterialModal = (record: any) => {
    setSelectedMaterial(record);
    setViewMaterialModal(true);
  };
  const closeViewMaterialModal = () => {
    setViewMaterialModal(false);
    setSelectedMaterial(null);
  };

  const myPaidMaterialsColumn = [
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
    {
      title: "ContentUrl",
      dataIndex: "ContentUrl",
      key: "ContentUrl",
      render: (item: any) => <ContentRenderer url={item.replace(/\\/g, "/")} />,
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
                <Link to={""} onClick={() => openViewMaterialModal(record)}>
                  Play
                </Link>
                <Link to={""} onClick={() => handleDownload(record?.ContentId!)}>
                  Download
                </Link>
              </>
            }
          />
        </span>
      ),
    },
  ];

  const myPaidMaterialsQuery = useQuery({
    queryKey: ["get-my-paid-materials"],
    queryFn: () => GetMyPaidMaterialsCall(user?.UserId!),
  });

  const myPaidMaterialsData = myPaidMaterialsQuery?.data as any;
  const myPaidMaterialsError = myPaidMaterialsQuery?.error as AxiosError;

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

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

  const filterData = () => {
    let filteredData = myPaidMaterialsData;
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
  }, [searchTerm, lecturer, materialType, myPaidMaterialsData]);

  const queryTransactionQuery = useQuery({
    queryKey: ["query-transaction"],
    queryFn: () => QueryPaymentCall(ref!),
    enabled: !!ref,
  });

  useEffect(() => {
    if (!!ref && queryTransactionQuery.isSuccess)
      notification.success({
        message: "Success",
        description: "Payment successfully completed",
      });
    queryClient.refetchQueries({ queryKey: ["get-my-paid-materials"] });
  }, [ref, queryTransactionQuery.isSuccess]);

  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });

  const downloadMaterialMutation = useMutation({
    mutationKey: ["download-material"],
    mutationFn: GetContentByIdCall,
  });

  // useEffect(() => {
  //   if (downloadMaterialMutation?.data) {
  //     setFile(URL.createObjectURL(downloadMaterialMutation?.data));
  //   }
  // }, [downloadMaterialMutation?.data]);

  const getExtensionFromMimeType = (mimeType: string): string => {
    const parts = mimeType.split("/");
    if (parts.length === 2) {
      return parts[1];
    } else {
      throw new Error("Invalid MIME type");
    }
  };

  const handleDownload = async (id: number) => {
    try {
      await downloadMaterialMutation.mutateAsync(id, {
        onSuccess: (data) => {
          const fileType = data.type;
          let fileExtension = "";

          // Determine the file extension based on the MIME type
          try {
            fileExtension = getExtensionFromMimeType(fileType);
          } catch (error: any) {
            notification.error({
              message: "Error",
              description: error?.message,
            });
            return;
          }

          // // Determine the file extension based on the MIME type
          // if (fileType === "application/pdf") {
          //   fileExtension = "pdf";
          // } else if (fileType.startsWith("application/")) {
          //   // Use "audio/mpeg" for MP3 files
          //   fileExtension = "mp3";
          // } else {
          //   throw new Error("Unsupported file type");
          // }

          const url = window.URL.createObjectURL(data);

          // if (fileType.startsWith("application/")) {
          //   setFile(url); // Set the audio URL to play
          // } else {

          setFile(url); // Set the audio URL to play
          const a = document.createElement("a");
          a.href = url;
          a.download = `DownloadedFile.${fileExtension}`; // Use the determined file extension
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          // }

          window.URL.revokeObjectURL(url);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      closeViewMaterialModal();
    }
  };

  const handleSelectMaterialType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedElection = parseInt(e.target.value);
    setMaterialType(selectedElection);
  };
  const handleSelectLecturer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLecturer(e.target.value);
  };

  if (myPaidMaterialsQuery?.isLoading) {
    return <Spinner />;
  }

  if (myPaidMaterialsQuery?.isLoading) {
    return <div>{myPaidMaterialsError?.message}</div>;
  }

  return (
    <section>
      <div className={styles.header}>
        <h1>My Paid Materials</h1>
      </div>

      <div className={styles.body}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && (
              <span>
                <Search onClick={() => setShowSearch((showSearch) => !showSearch)} />
              </span>
            )}
            {showSearch && <SearchInput value={searchTerm} onChange={handleSearch} />}
            {showAllFilter && (
              <>
                <FilterSelect placeholder="Material Type" options={MaterialTypeOptions} value={materialType} onChange={handleSelectMaterialType}></FilterSelect>
                <FilterSelect placeholder="Lecturer" options={lecturerOptions} value={lecturer} onChange={handleSelectLecturer}></FilterSelect>
              </>
            )}
            {!showAllFilter && <Filter onClick={() => setShowAllFilter((showAllFilter) => !showAllFilter)} />}
          </div>
        </div>

        <Table
          columns={myPaidMaterialsColumn}
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

        {selectedMaterial && viewMaterialModal && (
          <Modal
            open={viewMaterialModal}
            onCancel={closeViewMaterialModal}
            footer=""
            // qrCode={qrCodeData}
            // download={handleDownload}
          >
            {file && <audio controls src={file}></audio>}
            {file}
            <Button text="Download" onClick={() => handleDownload(selectedMaterial?.ContentId)} isLoading={downloadMaterialMutation?.isPending} disabled={downloadMaterialMutation?.isPending}/>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default MyPaidMaterials;
