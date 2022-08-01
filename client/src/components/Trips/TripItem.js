import styles from "./TripItem.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TripItem(props) {
  const rating = Math.round(props.ratingsAverage);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div>{rating}/10</div>
        <img src={props.imageCover} />
      </div>
      <span>
        <FontAwesomeIcon icon="fa-clock" /> {props.duration} days
      </span>
      <div className={styles.title}>
        <h1>{props.name}</h1>
        <h3>{props.location}</h3>
      </div>
      <div className={styles.buttonPrice}>
        <p>{props.price} $</p>
        <Link to={`trips/${props.id}`}>
          <button> CHECKOUT </button>
        </Link>
      </div>
    </div>
  );
}

export default TripItem;
