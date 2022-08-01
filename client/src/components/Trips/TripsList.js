import TripItem from "./TripItem";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./TripsList.module.scss";

function TripsList() {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/trips").then((res) => {
      const trips = res.data.data.trips;
      setTrips(trips);
    });
  }, []);
  const tripsList = trips.map((t) => (
    <TripItem
      name={t.name}
      id={t._id}
      key={t._id}
      duration={t.duration}
      ratingsAverage={t.ratingsAverage}
      ratingsQuantity={t.ratingsQuantity}
      price={t.price}
      desc={t.description}
      imageCover={t.imageCover}
      location={t.location}
      startDates={t.startDates}
    />
  ));

  return <div className={styles.container}>{tripsList}</div>;
}

export default TripsList;
