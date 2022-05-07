import { ChangeEvent, useEffect, useState } from "react";
import AuthorizedNav from "../../components/Navigation/AuthorizedNav";

import "../Profile/profile.styles.css";
const countrydata = require("countrycitystatejson");

const Apartment = () => {
  const [data, setData] = useState({});
  const [hasCountry, setHasCountry] = useState(false);
  const [shortName, setShortName] = useState("");
  const [hasState, setHasState] = useState(false);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const countries = countrydata.getCountries();

  console.log(countrydata);
  const onHandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setShortName(e.target.value);
    setHasCountry(true);
  };

  const onStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      state: e.target.value,
    });
    setState(e.target.value);
  };

  const onChangeReligion = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      religion: e.target.value,
    });
  };
  const onChangeEmploymentStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      employment_status: e.target.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
  };

  useEffect(() => {
    console.log(countrydata.getStatesByShort(shortName));
    const states = countrydata.getStatesByShort(shortName);
    setStates(states);
  }, [shortName]);

  useEffect(() => {
    /** @ts-ignore */
    const cities = countrydata.getCities(shortName, data.state);
    console.log(cities);
    /** @ts-ignore */
  }, [shortName, data.state]);

  return (
    <section>
      <AuthorizedNav />
      <section className="profile__container d-flex ">
        <div className="header">
          <h1>Your aparment details</h1>
          <p>
            Describe everything you want people to know about your aparment and
            what characters you would like to see your flatmates have
          </p>
        </div>
        <form>
          <div className="input__wrapper">
            <label>What gender are you looking for?</label>
            <div className="gender__container">
              <span>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={onHandleInputChange}
                />{" "}
                Male
              </span>
              <span>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={onHandleInputChange}
                />{" "}
                Female
              </span>
              <span>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={onHandleInputChange}
                />{" "}
                M & F
              </span>
            </div>
          </div>
          <div className="input__wrapper">
            <label>Which Country is your apartment?</label>
            <select onChange={onCountryChange}>
              <option>Select country</option>
              {countries.map((country: any) => {
                return (
                  <option value={country.shortName}>
                    {country.emoji} {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input__wrapper">
            <label>Which state is your apartment in?</label>
            <select onChange={onStateChange}>
              <option>Select state</option>

              {shortName &&
                countrydata.getStatesByShort(shortName).map((state: any) => {
                  return (
                    <option value={state} key={state}>
                      {state}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="input__wrapper">
            <label>Which city is your apartment in?</label>
            <select onChange={onStateChange}>
              <option>Select city</option>

              {/** @ts-ignore */}
              {shortName &&
                state &&
                countrydata.getCities(shortName, state).map((city: any) => {
                  return (
                    <option value={city} key={city}>
                      {city}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="input__wrapper">
            <label>Employment status</label>
            <select onChange={onChangeEmploymentStatus}>
              <option>Select status</option>
              {/** @ts-ignore */}
              {["Employed", "Self Employed", "Student", "Not Employed"].map(
                (status: string) => {
                  return (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  );
                }
              )}
            </select>
          </div>

          <div className="input__wrapper">
            <label>How many bedroom</label>
            <input
              type="text"
              name="number_of_bedroom"
              onChange={onHandleInputChange}
            />
          </div>
          <div className="input__wrapper">
            <label>How many bathroom</label>
            <input
              type="text"
              name="number_of_bathroom"
              onChange={onHandleInputChange}
            />
          </div>
          <div className="input__wrapper">
            <label>What religion should your flatmmate be?</label>
            <select onChange={onChangeReligion}>
              <option>Select religion</option>
              {/** @ts-ignore */}
              {[
                "Christian",
                "Muslim",
                "Atheist",
                "Buhdist",
                "Hinduism",
                "Judaism",
                "Shinto",
                "Gnosticism",
              ].map((status: string) => {
                return (
                  <option value={status} key={status}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          <button onClick={onSubmit} className="action__button">
            Upload apartment
          </button>
        </form>
      </section>
    </section>
  );
};

export default Apartment;
