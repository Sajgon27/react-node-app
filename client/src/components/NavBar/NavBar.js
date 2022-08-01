import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import plane from "../../assets/icons/plane.png";
import Modal from "../UI/Modal";

function Navbar() {
  const [modal, setModal] = useState(false);
  const [cookies, setCookie] = useCookies();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (cookies.jwt === undefined || cookies.jwt === "loggedout") {
      console.log("g");
    } else {
      axios
        .get("/api/v1/users/getUser")
        .then((res) => authCtx.login(res.data.user.name));
    }
  }, []);

  let g;

  function logoutHandler() {
    setModal(true);
    //axios.get("api/v1/users/logout").then(() => authCtx.logout());
  }

  if (authCtx.isLoggedIn) {
    g = (
      <li className={styles.nickLogout}>
        {authCtx.name}
        <span className={styles.logout} onClick={logoutHandler}>
          Logout
        </span>
      </li>
    );
  } else {
    g = (
      <li>
        <Link to="/login">Login</Link>
      </li>
    );
  }

  function closeModal() {
    setModal(false);
  }
  function logoutUser() {
    axios.get("/api/v1/users/logout").then(() => authCtx.logout());
    setModal(false);
  }
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.imgContainer}>
          <img src={plane} />
        </li>
        <li>
          <Link to="/">BTrip</Link>
        </li>
        {g}
      </ul>
      {modal ? (
        <Modal close={closeModal}>
          <div className={styles.modal}>
            <p>Are u sure u wanna logout?</p>
            <span>
              <button onClick={logoutUser}>Yes</button>
              <button onClick={closeModal}>No,get back</button>
            </span>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;
