import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import styles from "./styles.module.scss";
import { Drawer } from "antd";
import { useState } from "react";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpen = () => setOpenSidebar(true);
  const handleClose = () => setOpenSidebar(false);

  return (
    <main className={styles.container}>
      <Header handleOpenSidebar={handleOpen} />
      <section style={{ display: "flex", width:'100%' }}>
       
          <section className={styles.sidebar}>
            <Sidebar />
          </section>
          <Drawer placement={"left"} onClose={handleClose} open={openSidebar}  >
            <Sidebar />
          </Drawer>
       

        <section className={styles.mainContent}>
          <div className={styles.children}>
            <Outlet />
          </div>
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;


