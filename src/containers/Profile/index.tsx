import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDropzone } from "react-dropzone";
import Spinner from "../../assets/images/spinner";
import AuthorizedNav from "../../components/Navigation/AuthorizedNav";
import Tags from "../../components/Tags";
import qualities from "../../components/Tags/qaulities";
import httpRequestHelper from "../utils/httpRequest.helper";

import "./profile.styles.css";
import FullScreenLoader from "../../components/FullscreenLoader";
const countrydata = require("countrycitystatejson");

const Profile = () => {
  const [data, setData] = useState<any>({});
  const [shortName, setShortName] = useState("");
  const [state, setState] = useState("");
  const [personalities, setPersonality] = useState([...qualities]);
  const countries = countrydata.getCountries();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [files, setFile] = useState([]);

  const getShortName = (country: string) => {
    if (country) {
      const activeCountry = countries.find(
        (countryObject: any) => countryObject.name === country
      );
      return activeCountry.shortName;
    }

    return "";
  };

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

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const onSubmit = async (e: any) => {
    const token = JSON.parse(localStorage.getItem("checkrommie__user")!).token;
    const payload = data;
    e.preventDefault();
    if (data) {
      setLoading(true);
      try {
        const { data } = await httpRequestHelper.patch(`/users`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Profile updated successfully");
        setLoading(false);
        setSuccess(true);
        if (payload.has_apartment === true) {
          setTimeout(() => {
            window.location.replace("/apartment");
          }, 2000);
        } else if (payload.has_apartment === false) {
          setTimeout(() => {
            window.location.replace("/explore");
          }, 2000);
        }
      } catch (err: any) {
        setLoading(false);
        setError(true);
        console.log({ err });
        if (
          err.response.status === 401 &&
          err.response.data.message === "Kindly confirm your email address"
        ) {
          return toast.error(err.response.data.message);
        }
        if (err.response.status === 400) {
          if (Array.isArray(err.response.data.message)) {
            err.response.data.message.map((message: string) => {
              return toast.error(message);
            });
          }
        }
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const userId = JSON.parse(window.localStorage.getItem("checkrommie__user")!)
      .user.id;
    const token = JSON.parse(localStorage.getItem("checkrommie__user")!).token;
    httpRequestHelper
      .get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const newData = data.data;
        setData(newData);
        console.log(newData);
        setShortName(getShortName(newData?.country));
        setState(newData?.state);
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  const onSubmitPhoto = async (e: any) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("checkrommie__user")!).token;
    const payload = new FormData();
    /** @ts-ignore */
    console.log(files.size);
    payload.append("avatar", files[0]);
    console.log(payload.get("avatar"));
    if (data) {
      setLoading(true);
      try {
        const { data } = await httpRequestHelper.post(
          `/users/upload/profile/image`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Profile photo updated successfully");
        setLoading(false);
        setSuccess(true);
      } catch (err: any) {
        setLoading(false);
        if (err.response.status === 400) {
          if (Array.isArray(err.response.data.message)) {
            err.response.data.message.map((message: string) => {
              return toast.error(message);
            });
          }
        }
        setError(true);
        console.log(err.response.data.message);
      }
    }
  };
  const thumbs = files.map((file) => (
    /** @ts-ignore */
    <div className="thumb__wrapper" key={file.name}>
      <div className="thumb">
        <div onClick={() => setFile([])} className="cancel">
          x
        </div>
        <img
          /** @ts-ignore */
          src={file.preview}
          className="img"
          /** @ts-ignore */
          onLoad={() => {
            /** @ts-ignore */
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
      <button onClick={onSubmitPhoto}>Save photo</button>
    </div>
  ));

  const Avatar = ({ avatar }: { avatar: string }) => (
    <div className="thumb__wrapper">
      <div className="thumb">
        <img
          /** @ts-ignore */
          src={avatar}
          className="img"
        />
      </div>
      <button onClick={onSubmitPhoto}>Save photo</button>
    </div>
  );

  return (
    <section>
      {loading && <FullScreenLoader />}
      <AuthorizedNav />
      <ToastContainer />
      <section className="profile__container d-flex ">
        <div className="header">
          <h1>Set up your profile</h1>
          <p>Tell us about yourself to get a perfect match</p>
        </div>
        {!loading && success && (
          <form>
            {data?.avatar ? (
              <Avatar avatar={data?.avatar} />
            ) : files.length !== 0 ? (
              thumbs
            ) : (
              <div {...getRootProps({ className: "profile__photo" })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop your profile photo here ...</p>
                ) : (
                  <p> Upload photo</p>
                )}
              </div>
            )}

            <div className="input__wrapper">
              <label>What's Gender</label>
              <div className="gender__container">
                <span>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={data?.gender === "male"}
                    onChange={onHandleInputChange}
                  />{" "}
                  Male
                </span>
                <span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={data?.gender === "female"}
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
                    checked={data?.has_apartment === true ? true : false}
                  />{" "}
                  Yes
                </span>
                <span>
                  <input
                    type="radio"
                    name="has_apartment"
                    value="No"
                    checked={data?.has_apartment === true ? false : true}
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
                    <option
                      value={country.shortName}
                      selected={country.name === data?.country}
                    >
                      {country.emoji} {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input__wrapper">
              <label>Which state are you from?</label>
              <select onChange={onStateChange}>
                <option>Select state</option>

                {shortName &&
                  countrydata.getStatesByShort(shortName).map((state: any) => {
                    return (
                      <option
                        value={state}
                        key={state}
                        selected={state === data?.state}
                      >
                        {state}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="input__wrapper">
              <label>Which city are you from?</label>
              <select onChange={onCityChange}>
                <option>Select city</option>
                {shortName &&
                  state &&
                  countrydata
                    .getCities(shortName, state)
                    .map((city: string) => {
                      return (
                        <option
                          value={city}
                          key={city}
                          selected={
                            city.toLowerCase() === data?.city?.toLowerCase()
                          }
                        >
                          {city}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div className="input__wrapper">
              <label>Your address</label>
              <input
                type="text"
                name="address"
                value={data?.address}
                onChange={onHandleInputChange}
              />
            </div>

            <div className="input__wrapper">
              <label>Your Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={data?.phone_number}
                onChange={onHandleInputChange}
              />
            </div>

            <div className="input__wrapper">
              <label>Employment status</label>
              <select onChange={onChangeEmploymentStatus}>
                <option>Select status</option>
                {/** @ts-ignore */}
                {["Employed", "Self Employed", "Student", "Not Employed"].map(
                  (status: string) => {
                    return (
                      <option
                        value={status}
                        key={status}
                        selected={status === data?.employment_status}
                      >
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
                value={data?.income_estimate}
                onChange={onHandleInputChange}
              />
            </div>
            <div className="input__wrapper">
              <label>What's your religion?</label>
              <select onChange={onChangeReligion}>
                <option>Select religion</option>
                {/** @ts-ignore */}
                {["christian", "islam", "other"].map((religion: string) => {
                  return (
                    <option
                      value={religion}
                      key={religion}
                      selected={religion === data?.religion}
                    >
                      {religion}
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
                      isSelected={data?.qualities?.includes(personality.title)}
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
        )}
      </section>
    </section>
  );
};

export default Profile;