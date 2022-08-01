import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import styles from "./DetailTrip.module.scss";
import ReviewForm from "./Reviews/ReviewForm";
import ReviewsList from "./Reviews/ReviewsList";
import Description from "./Description";
import Modal from "../UI/Modal";
import BuyModal from "./BuyModal";
import { useNavigate, Link } from "react-router-dom";

function DetailTrip() {
  const [trip, setTrip] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { tripId } = params;

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/v1/trips/getTrip/${tripId}`).then((res) => {
      const trip = res.data.data.data;
      setTrip(trip);
      setLoading(false);
    });
  }, [tripId]);

  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }
  function congratsHandler() {
    setCongrats(true);
    setTimeout(() => {
      setCongrats(false);
      navigate("/", { replace: true });
    }, 1500);
  }
  return (
    <Fragment>
      {congrats ? (
        <p className={styles.congrats}>
          Congratulations you just bought a new trip.
        </p>
      ) : (
        ""
      )}
      {modal ? (
        <BuyModal
          name={trip.name}
          duration={trip.duration}
          location={trip.location}
          price={trip.price}
          close={closeModal}
          congrats={congratsHandler}
        />
      ) : (
        ""
      )}
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <Fragment>
          <div className={styles.container}>
            <div className={styles.imgContainer}>
              <img src={trip.imageCover} />
            </div>

            <h1>{trip.name}</h1>
            <div className={styles.summary}>
              <h3>Price:</h3>
              <p>Trip: {trip.price}$</p>
              <p>Insurance for one person: 50$</p>
              <p>Total: {trip.price + 50}$</p>
              <button onClick={openModal}>BUY</button>
            </div>
          </div>
          <Description desc={trip.description} />
          <div className={styles.review}>
            {trip.ratingsAverage}
            <ReviewForm />
            <ReviewsList />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default DetailTrip;
