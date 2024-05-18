import { NavLink } from "react-router-dom";
import { ReactComponent as Overview } from "../../../assets/overview.svg";
import { ReactComponent as Subscribe } from "../../../assets/subscribe.svg";
import { ReactComponent as Logout } from "../../../assets/logout.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Book } from "../../../assets/book.svg";
import { ReactComponent as Chat } from "../../../assets/chat.svg";
import { ReactComponent as Key } from "../../../assets/key.svg";

import styles from "./styles.module.scss";
import { logout } from "../../utils/logout";
// import { useAtomValue } from "jotai";

const Sidebar = () => {
  return (
    <>
      <nav className={styles.sidebarNav}>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/overview"}>
          <span>
            <Overview />
          </span>
          Overview
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/profile-update"}>
          <span>
            <Subscribe />
          </span>
          Profile Update
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/setup-bank"}>
          <span>
            {" "}
            <Search />
          </span>
          Setup Bank
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/content-management"}>
          <span>
            {" "}
            <Book />
          </span>
          Content Management
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/my-subscription"}>
          <span>
            <Chat />
          </span>
          My Subscription
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/messages"}>
          <span>
            {" "}
            <Key />
          </span>
          Messages
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/my-payment"}>
          <span>
            {" "}
            <Key />
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
            <Key />
          </span>
          View Payment Splitting
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={"/setup-category"}>   
        <span>        
            <Key />
          </span>
          Setup Category
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : "")} to={""} onClick={logout} style={{marginBlockStart:'18rem'}}>
          <span onClick={logout}>
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
