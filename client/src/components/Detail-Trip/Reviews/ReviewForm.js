import styles from "./ReviewForm.module.scss";
import { useParams } from "react-router-dom";
import { useRef, Fragment } from "react";
import axios from "axios";

import { useContext, useState } from "react";
import AuthContext from "../../../store/auth-context";

function ReviewForm() {
  const reviewRef = useRef();
  const ratingRef = useRef();
  const [rating, setRating] = useState();
  const [isError, setIsError] = useState();
  const params = useParams();
  const { tripId } = params;
  const authCtx = useContext(AuthContext);
  function submitHandler(e) {
    setIsError(false);
    e.preventDefault();
    if (authCtx.login) {
      const review = reviewRef.current.value;
      console.log(rating);
      axios.post(`/api/v1/trips/${tripId}/reviews`, { review, rating });
    } else {
      setIsError(true);
    }
  }

  function bez(e) {
    setRating(e.target.value);
  }
  return (
    <Fragment>
      <form onSubmit={submitHandler} className={styles.formReview}>
        <p>Add review</p>
        <div className={styles.container}>
          {isError ? <p>Enter valid Data</p> : ""}
          <textarea className={styles.inputText} ref={reviewRef} type="text" />

          <div onChange={bez}>
            <span>
              <input type="radio" name="radio" value="1" id="radio1" />
              <label htmlFor="radio1">1</label>
            </span>

            <span>
              <input type="radio" name="radio" value="2" id="radio2" />
              <label htmlFor="radio1">2</label>
            </span>

            <span>
              <input type="radio" name="radio" value="3" id="radio3" />
              <label htmlFor="radio1">3</label>
            </span>

            <span>
              <input type="radio" name="radio" value="4" id="radio4" />
              <label htmlFor="radio1">4</label>
            </span>

            <span>
              <input type="radio" name="radio" value="5" id="radio5" />
              <label htmlFor="radio1">5</label>
            </span>

            <span>
              <input type="radio" name="radio" value="6" id="radio6" />
              <label htmlFor="radio1">6</label>
            </span>

            <span>
              <input type="radio" name="radio" value="7" id="radio7" />
              <label htmlFor="radio1">7</label>
            </span>

            <span>
              <input type="radio" name="radio" value="8" id="radio8" />
              <label htmlFor="radio1">8</label>
            </span>

            <span>
              <input type="radio" name="radio" value="9" id="radio9" />
              <label htmlFor="radio1">9</label>
            </span>

            <span>
              <input type="radio" name="radio" value="10" id="radio10" />
              <label htmlFor="radio1">10</label>
            </span>
          </div>

          <button>ADD</button>
        </div>
      </form>
    </Fragment>
  );
}

export default ReviewForm;
