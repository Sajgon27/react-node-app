import Modal from "../UI/Modal";
import styles from "./BuyModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, Fragment } from "react";

function BuyModal(props) {
  const participantsRef = useRef();
  const [totalPrice, setTotalPrice] = useState(props.price);
  const [congrats, setCongrats] = useState(false);

  function handler(e) {
    console.log(participantsRef.current.value);
    setTotalPrice(props.price * participantsRef.current.value);
  }

  function orderDone() {
    props.close();
    props.congrats();
  }
  return (
    <Fragment>
      <Modal close={props.close}>
        <div className={styles.container}>
          <i onClick={props.close}>
            <FontAwesomeIcon icon="fa-xmark" size="4x" />
          </i>

          <span onChange={handler}>
            <p>Participants:</p>
            <input ref={participantsRef} type="number" min="1" max="20" />
          </span>
          <div>
            <h2>{props.name}</h2>
            <p>{props.location}</p>
            <p>{props.price}$</p>
            <p>Total price: {totalPrice}</p>
          </div>

          <button onClick={orderDone}>BUY</button>
        </div>
      </Modal>
    </Fragment>
  );
}

export default BuyModal;
