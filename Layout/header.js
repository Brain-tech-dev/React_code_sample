import { useSelector } from "react-redux";
export default function Header(props) {
  const users = useSelector((state) => state.UserProfile.profile);
  const user = JSON.parse(localStorage.getItem("userData"));
  return (

    <>
  <div className="top_header d-flex align-items-center justify-content-between">
    <h1>{users?.companyName ? users?.companyName : user?.companyName}{" "} - {props.title}</h1>
    {/* <div className="header_notification">
      <div className="header_icon position-relative notification d-flex align-items-center justify-content-center">
        <img src="/image/notification.svg" alt=""/>
        <span className="notification_alert" />
      </div>
    </div> */}
  </div>
    </>
  )
}
