import { Link, NavLink } from "react-router-dom";
import SideBarLink from "./SideBarLink";
import { Dashboardsvg } from "../SvgFile/Index";
import { useState } from "react";
import Logout from "../Component/Pages/Auth/Logout";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const admin_links = JSON.parse(localStorage.getItem("userData"))?.menu;
  

  const handleClose = () => {
    setOpen(false);
  };

  const users = useSelector((state) => state.UserProfile.profile);
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div className="intersight_menu">
        <div className="top_menu">
          {/*Start Logo Dropdown*/}
          <div className="brand">
            <div className="dropdown">
              <button
                className="border-0 w-100 d-flex align-items-center"
                type="button"
              
              >
                <span className="d-flex align-items-center justify-content-center" style={{overflow:"hidden"}}>
                  <img
                    src={users?.logo ? users?.logo : user?.logo}
                    alt=""
                    srcSet=""
                    style={{maxHeight: "30px",
                      maxWidth: "100%"}}
                  />
                </span>{" "}
                {users?.companyName ? users?.companyName : user?.companyName}{" "}
              </button>
              
            </div>
          </div>

          {/*End Logo Dropdown*/}
          {/*Start Menu*/}
          <div className="intersight_home">
            <div className="menu_div">
              <ul>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <span>
                      <Dashboardsvg />
                    </span>
                    Dashboard
                  </NavLink>
                </li>
                <li className="without_label">Workspace</li>
                </ul>
                <ul className="menu_scrollbar">
                {admin_links?.map(
                  (item, i) =>
                    item.roleName !== "Roles" && item.roleName !== "Address" && item.roleName !== "Estimate"  && item.roleName !== "Reports" && item.roleName !=="Window" &&  item.roleName !=="Invoice"  &&  item.roleName !=="JobSchedule" &&  item.roleName !=="VendorOrder" && item.roleName !=="JobContact"  && (
                      <SideBarLink
                        key={i}
                        href={item?.url}
                        name={item.roleName}
                        icon={item.icon}
                      />
                    )
                )}
              </ul>
              <div className="bottom_menu">
                <p className="text-white">
                  {/* Looking for something?{" "}
                  <Link to="#" className="d-block text-decoration-underline">
                    Help &amp; Support
                  </Link> */}
                </p>
                <div className="user_person">
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle border-0 w-100 d-flex align-items-center p-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="d-flex align-items-center justify-content-center person_icon">
                        <img src="/image/person.svg" alt="" />
                      </span>
                      <label className="person_name">
                        {users?.firstName ? users?.firstName : user?.firstName}{" "}
                        {users?.lastName ? users?.lastName : user?.lastName}
                        <span className="d-block">
                          {users?.email ? users?.email : user?.email}
                        </span>
                      </label>
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <Link className="dropdown-item" to="/update-profile">
                          Profile Info
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/chnage-password">
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={() => setOpen(true)}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*End Start Menu*/}
        </div>
      </div>
      <Logout open={open} handleClose={handleClose} />
    </>
  );
}
