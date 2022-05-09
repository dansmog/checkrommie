import { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../assets/images/spinner";
import AuthorizedNav from "../../components/Navigation/AuthorizedNav";
import Tags from "../../components/Tags";
import qualities from "../../components/Tags/qaulities";
import httpRequestHelper from "../utils/httpRequest.helper";

import "./profile.styles.css";
const countrydata = require("countrycitystatejson");

const Profile = () => {
  const [data, setData] = useState({});
  const [shortName, setShortName] = useState("");
  const [state, setState] = useState("");
  const [personalities, setPersonality] = useState([...qualities]);
  const countries = countrydata.getCountries();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onHandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeApartment = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      has_apartment: e.target.value === "Yes" ? true : false,
    });
  };
  const onCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      city: e.target.value,
    });
  };
  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setShortName(e.target.value);
    const country = countrydata.getCountryByShort(e.target.value).name;
    setData({
      ...data,
      country,
    });
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

  const onChangePersonality = (title: string) => {
    const newPersonality = personalities.map((personality) => {
      if (personality.title === title) {
        return {
          selected: !personality.selected,
          title: personality.title,
        };
      }
      return personality;
    });
    setPersonality(newPersonality);
    let qualities: string[] = [];
    newPersonality.forEach((element) => {
      if (element.selected === true) {
        qualities.push(element.title);
      }
    });
    setData({
      ...data,
      qualities,
    });
  };

  const onSubmit = async (e: any) => {
    const userId = JSON.parse(localStorage.getItem("checkrommie__user")!)?.user
      ?.id;
    const token = JSON.parse(localStorage.getItem("checkrommie__user")!).token;
    const payload = data;
    e.preventDefault();
    if (data) {
      setLoading(true);
      try {
        const { data } = await httpRequestHelper.patch(
          `/users/${userId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Profile updated successfully");
        setLoading(false);
        setSuccess(true);
      } catch (err: any) {
        setLoading(false);
        setError(true);
        console.log({ err });
        if(err.response.status === 401 && err.response.data.message === "Kindly confirm your email address"){
          toast.error(err.response.data.message)
        }
      }
    }
  };

  return (
    <section>
      <AuthorizedNav />
      <ToastContainer />
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
                  onChange={onChangeApartment}
                />{" "}
                Yes
              </span>
              <span>
                <input
                  type="radio"
                  name="has_apartment"
                  value="No"
                  onChange={onChangeApartment}
                />{" "}
                No
              </span>
            </div>
          </div>

          <div className="input__wrapper">
            <label>Which Country are you from?</label>
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
            <select onChange={onCityChange}>
              <option>Select city</option>

              {shortName &&
                state &&
                countrydata.getCities(shortName, state).map((city: string) => {
                  return (
                    <option value={city} key={city}>
                      {city}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input__wrapper">
            <label>Your address</label>
            <input type="text" name="address" onChange={onHandleInputChange} />
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
            <label>What's the estimate of your income</label>
            <input
              type="text"
              name="income_estimate"
              onChange={onHandleInputChange}
            />
          </div>
          <div className="input__wrapper">
            <label>What's your religion?</label>
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
          <div className="input__wrapper">
            <label>What are you qualities</label>
            <div className="qualities__wrapper">
              {personalities.map((personality) => {
                return (
                  <Tags
                    title={personality.title}
                    isSelected={personality.selected}
                    onClick={onChangePersonality}
                  />
                );
              })}
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="action__button"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Update your profile"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default Profile;
