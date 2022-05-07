import { ChangeEvent, useEffect, useState } from "react";
import AuthorizedNav from "../../components/Navigation/AuthorizedNav";

import "./profile.styles.css";
const countrydata = require("countrycitystatejson");

const Profile = () => {
  const [data, setData] = useState({});
  const countries = countrydata.getCountries();

  const onHandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, country: e.target.value });
  };

  const onStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      state: e.target.value,
    });
  };

  const onSubmit = (e:any) => {
    e.preventDefault();
    console.log(data)
  }
  
  return (
    <section>
      <AuthorizedNav />
      <section className="profile__container d-flex ">
        <div className="header">
          <h1>Set up your profile</h1>
          <p>Tell us abouy yourself to get a perfect match</p>
        </div>
        <form>
          <div className="input__wrapper">
            <label>What's Gender</label>
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
            </div>
          </div>
          <div className="input__wrapper">
            <label>Do you have an apartment?</label>
            <div className="gender__container">
              <span>
                <input
                  type="radio"
                  name="has_apartment"
                  value="Yes"
                  onChange={onHandleInputChange}
                />{" "}
                Yes
              </span>
              <span>
                <input
                  type="radio"
                  name="has_apartment"
                  value="No"
                  onChange={onHandleInputChange}
                />{" "}
                No
              </span>
            </div>
          </div>
          {/** @ts-ignore */}

          {data?.has_apartment === "Yes" && (
            <div className="apartment__alert">
              <p>
                Please your address should match the address of where your
                aparment is, since you have an apartment already
              </p>
            </div>
          )}
          <div className="input__wrapper">
            <label>Which Country are you from?</label>
            <select onChange={onCountryChange}>
              <option>Select country</option>
              {countries.map((country: any) => {
                return (
                  <option value={country.name}>
                    {country.emoji} {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="input__wrapper">
            <label>Which state do you live in?</label>
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
            <label>Which city do you live in?</label>
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
          </div> */}

          <div className="input__wrapper">
            <label>Employment status</label>
            <select onChange={onStateChange}>
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
            <label>What's the estimate of your income</label>
            <input
              type="text"
              name="income_estimate"
              onChange={onHandleInputChange}
            />
          </div>
          <div className="input__wrapper">
            <label>What's your religion?</label>
            <select onChange={onStateChange}>
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
          <button onClick={onSubmit}>Update your profile</button>
        </form>
      </section>
    </section>
  );
};

export default Profile;
