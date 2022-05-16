import { ChangeEvent, useEffect, useState } from "react";
import RommieCard from "../../components/Card";
import FullScreenLoader from "../../components/FullscreenLoader";
import MoreDetailModal from "../../components/Modals/MoreDetails";
import AuthorizedNav from "../../components/Navigation/AuthorizedNav";
import { Footer } from "../LandingPage";

import httpRequestHelper from "../utils/httpRequest.helper";

import "./explore.styles.css";
const countrydata = require("countrycitystatejson");

const fakedata = [
  {
    id: 1,
    heading: "2 Bed Room Flat",
    rent_fee: 230000,
    preferred_religion: "christian",
    user: {
      id: 4,
      name: "John Doe",
      status: "active",
      gender: "male",
      religion: "islam",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2960&q=80",
      employment_status: "employed",
    },
    apartment_img:
      "https://images.unsplash.com/photo-1506188232657-23c9c893ac2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 1,
    heading: "2 Bed Room Flat",
    rent_fee: 230000,
    preferred_religion: "christian",
    user: {
      id: 4,
      name: "Daniel juwon",
      status: "active",
      gender: "male",
      religion: "islam",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      employment_status: "employed",
    },
    apartment_img:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    id: 1,
    heading: "2 Bed Room Flat",
    rent_fee: 230000,
    preferred_religion: "christian",
    user: {
      id: 4,
      name: "John Doe",
      status: "active",
      gender: "male",
      religion: "islam",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2960&q=80",
      employment_status: "employed",
    },
    apartment_img:
      "https://images.unsplash.com/photo-1506188232657-23c9c893ac2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 1,
    heading: "2 Bed Room Flat",
    rent_fee: 230000,
    preferred_religion: "christian",
    user: {
      id: 4,
      name: "Daniel juwon",
      status: "active",
      gender: "male",
      religion: "islam",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      employment_status: "employed",
    },
    apartment_img:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
];

const Explore = () => {
  const [data, setData] = useState([]);
  const [userRequest, setUserRequest] = useState({});
  const countries = countrydata.getCountries();
  const [shortName, setShortName] = useState("");
  const [state, setState] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const onCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserRequest({
      ...userRequest,
      city: e.target.value,
    });
  };
  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setShortName(e.target.value);
    const country = countrydata.getCountryByShort(e.target.value).name;
    setUserRequest({
      ...userRequest,
      country,
    });
  };

  const onStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserRequest({
      ...userRequest,
      state: e.target.value,
    });
    setState(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    httpRequestHelper
      .get(`/apartments`)
      .then(({ data }) => {
        setLoading(false);
        setSuccess(true);
        setData(data.data.data);
        console.log({ data: data.data });
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const onOpenDetailModal = (id: string) => {
    setShowModal(!showModal);

  };

  return (
    <section>
      <header className="explore__header">
        <AuthorizedNav />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Find your new flatmates or Roommates</h1>
              <p>
                Check out our recent roomie request by other roommies on our
                platform
              </p>
            </div>
            <div className="filter__wrapper mt-4">
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-3 col-lg-3">
                    <select onChange={onCountryChange}>
                      <option>select country</option>
                      {countries.map((country: any) => {
                        return (
                          <option value={country.shortName}>
                            {country.emoji} {country.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-sm-3 col-lg-3">
                    <select onChange={onStateChange}>
                      <option>select state</option>
                      {shortName &&
                        countrydata
                          .getStatesByShort(shortName)
                          .map((state: any) => {
                            return (
                              <option value={state} key={state}>
                                {state}
                              </option>
                            );
                          })}
                    </select>
                  </div>
                  <div className="col-sm-3 col-lg-3">
                    <select>
                      <option>select city</option>
                      {shortName &&
                        state &&
                        countrydata
                          .getCities(shortName, state)
                          .map((city: string) => {
                            return (
                              <option value={city} key={city}>
                                {city}
                              </option>
                            );
                          })}
                    </select>
                  </div>
                  <div className="col-sm-3 col-lg-3">
                    <select>
                      <option>Sex of flatmate</option>
                      <option value="male">Male</option>
                      <option value="female">Male</option>
                      <option value="any">Both Male or Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="row">
                  <div className="col-sm-3 col-lg-3">
                    <select>
                      <option>Religion of flatmate</option>
                      <option value="christian">Christian</option>
                      <option value="islam">Islam</option>
                      <option value="any">Any</option>
                    </select>
                  </div>
                  <div className="col-sm-3 col-lg-3">
                    <select>
                      <option>Employment status</option>
                      <option value="employed">Employed</option>
                      <option value="self employed">Self employed</option>
                      <option value="entreprenuer">Entreprenuer</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button>Filter result</button>
          </div>
        </div>
      </header>
      {loading && <FullScreenLoader />}
      {!loading && success && data.length > 0 && (
        <section className="rommie__list">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 mb-2">
                <h6>Total result: {data.length}</h6>
              </div>
              {console.log(data)}
              {data.map((datum) => {
                return (
                  <div
                    className="col-12 col-sm-4 col-md-6 col-lg-4"
                    /** @ts-ignore */
                    key={datum.id}
                  >
                    <RommieCard
                      data={datum}
                      /** @ts-ignore */
                      showDetail={() => onOpenDetailModal(datum.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* <MoreDetailModal
        onCloseModal={() => setShowModal(false)}
        open={showModal}
      /> */}

      <Footer />
    </section>
  );
};

export default Explore;
