import styles from "./LoginForm.module.scss";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

function LoginForm() {
  const [isError, setIsError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  function submitHandler(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    console.log(email);
    const password = passwordRef.current.value;

    axios
      .post("/api/v1/users/login", { email, password })
      .then((res) => {
        navigate("/", { replace: true });
        setIsError(false);

        authCtx.login(res.data.data.user.name);
      })
      .catch(() => setIsError(true));
  }

  return (
    <form onSubmit={submitHandler} className={styles.container}>
      <label>Email:</label>
      <input ref={emailRef} type="text" />
      <label>Password:</label>
      <input ref={passwordRef} type="password" />
      {isError ? (
        <p className={styles.error}>Incorrect password or email</p>
      ) : (
        ""
      )}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
