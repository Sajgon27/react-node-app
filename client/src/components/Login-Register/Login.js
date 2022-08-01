import LoginForm from "./LoginForm";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <LoginForm />
      <p>Dont have an account register up here.</p>
      <Link to="/signup">
        <p>Sign up</p>
      </Link>
    </div>
  );
}

export default Login;
