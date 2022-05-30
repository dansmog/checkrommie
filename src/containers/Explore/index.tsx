import { ChangeEvent, Key, useCallback, useRef, useState } from "react";
import Spinner from "../../assets/images/spinner";
import RommieCard from "../../components/Card";
import FullScreenLoader from "../../components/FullscreenLoader";
import MoreDetailModal from "../../components/Modals/MoreDetails";
import AuthorizedNav from "../../components/Navigation/AuthorizedNav";
import { Footer } from "../LandingPage";

import "./explore.styles.css";
import useGetApartments from "./useGetApartments";
const countrydata = require("countrycitystatejson");

const Explore = () => {
  const [userRequest, setUserRequest] = useState({});
  const [filter, setFilter] = useState({});
  const countries = countrydata.getCountries();
  const [shortName, setShortName] = useState("");
  const [state, setState] = useState("");
  const [apartmentId, setApartmentId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const { apartments, hasMore, success, loading, pageLoading, error } =
    useGetApartments(filter, pageNumber);

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

  const onSubmit = (e: any) => {
    e.preventDefault();

    setFilter({ ...userRequest });
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastApartmentElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer?.current?.observe(node);
    },
    [loading, hasMore]
  );

  const onOpenDetailModal = (id: string) => {
    setApartmentId(id);
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
                <div className="row g-3">
                  <div className="col-sm-3 col-lg-3">
                    <select onChange={onCountryChange}>
                      <option>select country</option>
                      {countries.map((country: any) => {
                        return (
                          <option value={country.shortName} key={country.name}>
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
                    <select onChange={onCityChange}>
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
            <button onClick={onSubmit}>Filter result</button>
          </div>
        </div>
      </header>
      {pageLoading && <FullScreenLoader />}
      {!pageLoading && success && apartments.length > 0 && (
        <section className="rommie__list">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 mb-2">
                <h6>Total result: {apartments.length}</h6>
              </div>
              <MoreDetailModal
                open={showModal}
                onCloseModal={() => setShowModal(false)}
                id={apartmentId}
              />
              {apartments.map(
                (datum: { id: Key | null | undefined }, index: number) => {
                  if (apartments.length === index + 1) {
                    return (
                      <div
                        className="col-12 col-sm-4 col-md-6 col-lg-4"
                        ref={lastApartmentElementRef}
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
                  } else {
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
                  }
                }
              )}
              <div className="col-12">
                {loading && !pageLoading && <Spinner />}
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </section>
  );
};

export default Explore;
