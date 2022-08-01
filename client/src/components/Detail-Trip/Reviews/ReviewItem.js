import styles from "./ReviewItem.module.scss";

function ReviewItem(props) {
  return (
    <div className={styles.container}>
      <span>
        <img src={props.user.photo} />
        {props.user.name}
      </span>
      {props.review} {props.rating}
    </div>
  );
}

export default ReviewItem;
