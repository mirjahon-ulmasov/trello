import { Fragment } from "react";
import avatar1 from "../../assets/img/avatar-1.png";
import avatar2 from "../../assets/img/avatar-2.png";
import avatar3 from "../../assets/img/avatar-3.png";
import avatar4 from "../../assets/img/avatar-4.png";

export default function Layout(props) {
  return (
    <Fragment>
      <div className="navbar">
        <h1>Project Management</h1>
        <div className="nav__profiles">
          <img onClick={() => {}} src={avatar1} alt="avatar 1" />
          <img onClick={() => {}} src={avatar2} alt="avatar 2" />
          <img onClick={() => {}} src={avatar3} alt="avatar 3" />
          <img onClick={() => {}} src={avatar4} alt="avatar 4" />
          <button>All</button>
        </div>
      </div>
      <main className="main">{props.children}</main>
    </Fragment>
  );
}
