import styles from "./styles.module.scss";
// import avatar from "../../assets/user.png";
import { ReactComponent as Bell } from "../../assets/bell.svg";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { ReactComponent as Avatar } from "../../assets/user.svg";
// import { ReactComponent as ArrowDown } from "../../assets/arrow.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomDropdown from "../../custom/dropdown/dropdown";
import { useQuery } from "@tanstack/react-query";
// import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
// import { studentProfile, userData } from "../../store";
// import { getStudentDetailsByMatricNo } from "../../request";
import Button from "../../custom/button/button";
import { logout } from "../utils/logout";

const Header = ({ handleOpenSidebar }: { handleOpenSidebar: () => void }) => {
  const navigate = useNavigate();
  // const user = useAtomValue(userData);
  // const [profile, setProfile] = useAtom(studentProfile);
  const location = useLocation();

  // const profileData = useQuery({
  //   queryKey: ["get-profile"],
  //   queryFn: () => getStudentDetailsByMatricNo(user?.MatNo!),
  // });

  // useEffect(() => {
  //   if (profileData.isSuccess) {
  //     setProfile(profileData?.data?.Data);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [profileData?.data, profileData.isSuccess]);

  return (
    <header className={styles.header}>
      <section className={styles.headerMenuGroup}>
        <button onClick={handleOpenSidebar} className={styles.menuBtn}>
          <Menu />
        </button>
        <h1 className={styles.title}>Teach Me Portal</h1>
      </section>
      <section className={styles.headerGroup}>
        {/* <label>{today}</label> */}
        <CustomDropdown
          dropdownButton={
            <button className={styles.notifications}>
              <Bell />
              {/* {parseInt(notificationsAlert) > 0 ? (
                <span className={styles.notifyCount}>{notificationsAlert}</span>
              ) : null} */}
            </button>
          }
          dropdownContent={
            <div>
              {/* {isLoading ? (
                <Spin />
              ) : isError ? (
                <div>{(error as AxiosError)?.message}</div>
              ) : (
                <>
                  <h2>Notifications</h2>
                  <hr className={styles.divider} />
                  {sortedNotifications?.slice(0, 3)?.map((item) => (
                    <section className={styles.alerts} key={item.ActivityId}>
                      <button className={styles.notifications}>
                        <Bell className={styles.smallBell} />
                        {item.IsActive ? (
                          <span className={styles.notifyCount}></span>
                        ) : (
                          ""
                        )}
                      </button>
                      <div className={styles.alertContent}>
                        <b>{item.ActivityDescription}</b>
                        <label className={styles.alertDetails}>
                          <span>{timeAgo(item.CreatedDate)}</span>
                         
                        </label>
                      </div>
                    </section>
                  ))}
                  {sortedNotifications?.length > 0 ? (
                    <div className={styles.alertActions}>
                      <NavLink to="/notifications">
                        View all notifications
                      </NavLink>
                   
                    </div>
                  ) : (
                    <Empty
                      description="No notifications"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </>
              )} */}
            </div>
          }
          placement="bottomLeft"
        />
        <CustomDropdown
          dropdownButton={
            // <button className={styles.account}>
            //   {/* <img src={ avatar} alt="woman" /> */}
            //   <Avatar />
            //   {/* <ArrowDown /> */}
            // </button>
             <Avatar />
          }
          dropdownContent={
            <div>
              
              <hr className={styles.divider} />
              <Button
                className={styles.transparentButton}
                text="Logout"
                iconBefore={<Logout />}
                onClick={logout}
              />
            </div>
          }
        />
      </section>
    </header>
  );
};

export default Header;
