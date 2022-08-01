import styles from "./SignUpForm.module.scss";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

function SignUpForm() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  function submitHandler(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    axios
      .post("/api/v1/users/signup", {
        email,
        password,
        passwordConfirm,
        name,
      })
      .then(() => {
        setIsError(false);
        navigate("/", { replace: true });
        authCtx.login();
      })
      .catch((err) => setIsError(true));
  }
  return (
    <form onSubmit={submitHandler} className={styles.container}>
      <label>Name:</label>
      <input ref={nameRef} type="text" />
      <label>Email:</label>
      <input ref={emailRef} type="text" />
      <label>Password:</label>
      <input ref={passwordRef} type="password" />
      <label>PasswordConfirm:</label>
      <input ref={passwordConfirmRef} type="password" />
      {isError ? <p className={styles.error}>Enter valid data</p> : ""}
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignUpForm;
