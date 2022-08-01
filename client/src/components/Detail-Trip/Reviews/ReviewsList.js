import styles from "./ReviewsList.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);

  const params = useParams();
  const { tripId } = params;

  useEffect(() => {
    axios.get(`/api/v1/trips/${tripId}/reviews`).then((res) => {
      const data = res.data.review;

      setReviews(data);
    });
  }, []);

  const list = reviews.map((r) => (
    <ReviewItem review={r.review} key={r._id} rating={r.rating} user={r.user} />
  ));

  return <div className={styles.container}>{list}</div>;
}

export default ReviewsList;
