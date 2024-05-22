import { NavLink } from "react-router-dom";
import { ReactComponent as Overview } from "../../../assets/overview.svg";
import { ReactComponent as Logout } from "../../../assets/logout.svg";
import { ReactComponent as Chat } from "../../../assets/chat.svg";
import { ReactComponent as Key } from "../../../assets/key.svg";
import { ReactComponent as Category } from "../../../assets/category.svg";
import { ReactComponent as Analysis } from "../../../assets/analytics.svg";
import { ReactComponent as Account } from "../../../assets/account_balance.svg";
import { ReactComponent as Teach } from "../../../assets/how_to_reg.svg";
import { ReactComponent as Management } from "../../../assets/manage_accounts (1).svg";
import { ReactComponent as Contact } from "../../../assets/contract_edit.svg";

import styles from "./styles.module.scss";
import { logout } from "../../utils/logout";
// import { useAtomValue } from "jotai";

const Sidebar = () => {
  return (
    <>
      <nav className={styles.sidebarNav}>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/lecturer-overview"}>
          <span>
            <Overview />
          </span>
          Overview
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/lecturer-profile"}>
          <span>
            <Management />
          </span>
          Profile Update
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/setup-bank"}>
          <span>
            {" "}
            <Account />
          </span>
          Setup Bank
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/lecturer-category"}>
          <span>
            {" "}
            <Account />
          </span>
          SetUp Category
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/content-management"}>
          <span>
            {" "}
            <Contact />
          </span>
          Content Management
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/my-subscription"}>
          <span>
            <Teach />
          </span>
          My Subscription
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/lecturer-messages"}>
          <span>
            {" "}
            <Chat />
          </span>
          Messages
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/my-payment"}>
          <span>
            {" "}
            <Account />
          </span>
          My Payments
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/lecturer-change-password"}>
          <span>
            {" "}
            <Key />
          </span>
          Change Password
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/View-payment-splitting"}>
          <span>
            {" "}
            <Analysis />
          </span>
          View Payment Splitting
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/setup-category"}>   
        <span>        
            <Category />
          </span>
          Setup Category
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={""} onClick={logout} style={{marginBlockStart:'18rem'}}>
          <span>
            {" "}
            <Logout />
          </span>
          Logout
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
