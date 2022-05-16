import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FullScreenLoader from "../../components/FullscreenLoader";

import AuthorizedNav from "../../components/Navigation/AuthorizedNav";

import "../Profile/profile.styles.css";
import httpRequestHelper from "../utils/httpRequest.helper";
const countrydata = require("countrycitystatejson");

const Apartment = () => {
  const [data, setData] = useState<any>({});
  const [hasCountry, setHasCountry] = useState(false);
  const [shortName, setShortName] = useState("");
  const [hasState, setHasState] = useState(false);
  const [state, setState] = useState("");
  const countries = countrydata.getCountries();
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  console.log(countrydata);
  const onHandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
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
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  useEffect(() => {
    console.log("i am here");
    setLoading(true);
    const userId = JSON.parse(window.localStorage.getItem("checkrommie__user")!)
      .user.id;
    const token = JSON.parse(localStorage.getItem("checkrommie__user")!).token;
    httpRequestHelper
      .get(`/apartments/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const newData = data.data;
        console.log({data})
        setData(newData);
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 6,
  });

  const onRemovePreviewImage = (preview: string) => {
    console.log(preview);
  };

  const thumbs = files.map((file) => (
    /** @ts-ignore */
    <div className="thumb__wrapper" key={file.name}>
      <div className="thumb">
        <div
          /** @ts-ignore */
          onClick={() => onRemovePreviewImage(file.preview)}
          className="cancel"
        >
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
    </div>
  ));

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <section>
      {loading && <FullScreenLoader />}
      <AuthorizedNav />
      <section className="profile__container apartment d-flex ">
        <div className="header">
          <h1>Your aparment details</h1>
          <p>
            Describe everything you want people to know about your aparment and
            what characters you would like to see your flatmates have
          </p>
        </div>
        <form>
          <div className="input__wrapper">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>
                Drag 'n' drop your apartment images here, or click to select
                files
              </p>
              <em>
                (6 files are the maximum number of files you can drop here)
              </em>
            </div>
          </div>
          {files.length !== 0 && (
            <div className="apartment__photoWrapper">{thumbs}</div>
          )}
          <div className="input__wrapper">
            <label>What gender are you looking for?</label>
            <div className="gender__container">
              <span>
                <input
                  type="radio"
                  name="preferred_gender"
                  value="Male"
                  onChange={onHandleInputChange}
                />{" "}
                Male
              </span>
              <span>
                <input
                  type="radio"
                  name="preferred_gender"
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
            <label>Your house address</label>
            <input type="text" name="address" onChange={onHandleInputChange} />
          </div>

          <div className="input__wrapper">
            <label>What employment status are you looking for?</label>
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
            <label>How much is your annual rent</label>
            <input type="text" name="rent_fee" onChange={onHandleInputChange} />
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
              {["christian", "islam", "other"].map((religion: string) => {
                return (
                  <option
                    value={religion}
                    key={religion}
                    selected={religion === data?.preferred_religion}
                  >
                    {religion}
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
