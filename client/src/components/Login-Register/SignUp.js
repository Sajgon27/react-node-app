import SignUpForm from "./SignUpForm";
import styles from "./SignUp.module.scss";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <SignUpForm />
      <p>Already have an account login up here.</p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;
