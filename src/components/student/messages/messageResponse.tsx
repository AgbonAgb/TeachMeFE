import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import { ReactComponent as ArrowBack } from "../../../assets/arrow-back.svg";
import styles from "./styles.module.scss";
import Input from "../../../custom/input/input";
import CustomSelect from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import { Modal } from "antd";
import { useState } from "react";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { ReactComponent as MessageSent } from "../../../assets/message-sent.svg";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown from "../../../custom/dropdown/dropdown";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";

const MessagesResponse = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openViewModal = (record: any) => {
    setShowModal(true);
  };
  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });
  return (
    <section>
      <div className={styles.header}>
        <div className={styles.back}>
          <ArrowBack onClick={() => navigate("/messages")} />
          <h1>Send Message</h1>
        </div>
        <CustomDropdown
          placement="bottom"
          dropdownButton={<Ellipsis style={{ cursor: "pointer" }} />}
          dropdownContent={
            <>
              <Link to={"/message/view"}>Reply</Link>
              <Link to={""} onClick={() => openViewModal}>
                Delete
              </Link>
            </>
          }
        />
      </div>

      <div className={styles.form}>
        <FormikProvider value={formik}>
          <Field as={CustomSelect} name="lecturer" label="Lecturer" placeholder="Select Lecturer Name" />
          <Field as={CustomSelect} name="material" label="Material Title" placeholder="Select Material Title" />
          <Field as={Input} name="Message" label="My Message" placeholder="Message" displayInput="textArea" />
          <Field as={Input} name="Message" label="Lecturer Response" placeholder="Message" displayInput="textArea" />
          <div className={styles.buttonDiv}>
            <Button text="Send" onClick={() => setShowModal(true)} />
          </div>
        </FormikProvider>
      </div>
      <Modal open={showModal} footer="" onCancel={() => setShowModal(false)} centered closeIcon={<Cancel />} className="modal">
        {/* <PublishModal handleCloseModal={!showModal} /> */}
        <div className={styles.modalContent}>
          <MessageSent />
          <h1>Message Sent</h1>
          <p>Your message to Lecturer Akin has been sent successfully.</p>
        </div>
      </Modal>
    </section>
  );
};

export default MessagesResponse;
