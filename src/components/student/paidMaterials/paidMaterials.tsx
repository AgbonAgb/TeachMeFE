import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import styles from "./styles.module.scss";
import SearchInput from "../../../custom/searchInput/searchInput";
import { Divider, Dropdown, MenuProps, Modal, Table, Tooltip } from "antd";
import { ReactComponent as Search } from "../../../assets/border-search.svg";
import { ReactComponent as Filter } from "../../../assets/filter.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { useState } from "react";
import CustomSelect from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import { data } from "../../utils/table-data";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { Link } from "react-router-dom";

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

const actionItems: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Buy
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Add to Cart
      </a>
    ),
  },
];

const MyPaidMaterials = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openViewModal = (record: any) => {
    setShowModal(true);
  };
  const column = [
    {
      title: "S/N",
      dataIndex: "S/N",
      key: "S/N",
      render: (text: number) => (
        <span>
          <p>
            {" "}
            &#x20A6;{text} <span className={styles.current}>Current</span>
          </p>
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
      title: "Lecturer Link Name",
      dataIndex: "LecturerLinkName",
      key: "LecturerLinkName",
      render: (text: string) => <span className={styles.balance}>&#x20A6;{text}</span>,
    },
    {
      title: "Material Type",
      dataIndex: "MaterialType",
      key: "MaterialType",
      render: (text: string) => <span className={styles.balance}>&#x20A6;{text}</span>,
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
                <Link to={""}>Play</Link>
                <Link to={""} onClick={() => openViewModal(record)}>
                Download
                </Link>
              </>
            }
          />
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
        <h1>My Paid Materials</h1>
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

        <Table columns={column} dataSource={data} pagination={false} className={styles.row} rowKey={"DueYear"} scroll={{ x: 400 }} />

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
      </div>
    </section>
  );
};

export default MyPaidMaterials;
