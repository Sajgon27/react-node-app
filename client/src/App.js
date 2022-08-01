import "./App.css";
import Navbar from "./components/NavBar/NavBar";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login-Register/Login";
import TripsList from "./components/Trips/TripsList";
import SignUp from "./components/Login-Register/SignUp";
import DetailTrip from "./components/Detail-Trip/DetailTrip";
import { Helmet } from "react-helmet";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["jwt"]);
  console.log(cookies);
  library.add(faClock, faXmark);
  return (
    <Fragment>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/94857ca773.js"
          crossorigin="anonymous"
        ></script>
        <title>BTrips</title>
      </Helmet>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<TripsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/trips/:tripId" element={<DetailTrip />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
