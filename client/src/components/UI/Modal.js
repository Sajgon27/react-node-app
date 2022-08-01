import styles from "./Modal.module.scss";
import { Fragment } from "react";

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.close}></div>;
}

function Modal(props) {
  return (
    <Fragment>
      <Backdrop close={props.close} />
      <div className={styles.modal}>{props.children}</div>
    </Fragment>
  );
}

export default Modal;
