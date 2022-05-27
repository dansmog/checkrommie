import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import FullScreenLoader from "../../components/FullscreenLoader";

import AuthorizedNav from "../../components/Navigation/AuthorizedNav";
import qualities from "../../components/Tags/qaulities";
import Tags from "../../components/Tags";

import "../Profile/profile.styles.css";
import httpRequestHelper from "../utils/httpRequest.helper";
import Spinner from "../../assets/images/spinner";
import "./apartment.styles.css";
import ImageSlider from "../../components/ImageSlider";

const countrydata = require("countrycitystatejson");

const Apartment = () => {
  const [data, setData] = useState<any>({});
  const [shortName, setShortName] = useState("");
  const [state, setState] = useState("");
  const [personalities, setPersonality] = useState([...qualities]);
  const countries = countrydata.getCountries();
  const [files, setFiles] = useState([]);
  const [apartmentId, setApartmentId] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isCreatingApartment, setIsCreatingApartment] = useState(false);

  const getShortName = (country: string) => {
    const activeCountry = countries.find(
      (countryObject: any) => countryObject.name === country
    );
    return activeCountry.shortName;
  };

  const addFormData = (data: any) => {
    const formData = new FormData();

    if (Object.keys(data).length) {
      for (let key in data) {
        if (data[key] instanceof Array) {
          data[key].forEach((element: any, i: any) => {
            formData.append(key, data[key][i]);
          });
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    return formData;
  };

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
      preferred_religion: e.target.value,
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

    console.log(files);
  }, []);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 6,
  });

  const onRemovePreviewImage = (preview: string) => {
    const filterRemovedFile = files.filter(
      (file: any) => file.preview !== preview
    );
    setFiles(filterRemovedFile);
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

  const imageThumbs = (images: any[]) =>
    images.map((img) => (
      <div className="thumb__wrapper" key={`${img.id} ${img.name}`}>
        <div className="thumb">
          <img src={img.url} className="img" alt={img.name} />
        </div>
      </div>
    ));

  const onSubmit = async (e: any) => {
    e.preventDefault();
    let payload = data;
    const token = JSON.parse(localStorage.getItem("checkrommie__user")!).token;

    if (payload) {
      setIsCreatingApartment(true);

      try {
        if (apartmentId) {
          if (files.length !== 0) {
            const payload = addFormData({
              medias: files,
              apartment_id: apartmentId,
            });

            const { data } = await httpRequestHelper.post(
              `/apartments/images`,
              payload,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setFiles([]);
            const apartment_medias = data.data.apartment_medias;
            if (apartment_medias.length)
              setData({
                ...payload,
                apartment_medias,
              });
            toast.success("Apartment images updated succesfully");
          }

          const { data } = await httpRequestHelper.patch(
            `/apartments/${apartmentId}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast.success("Apartment updated successfully");
        } else {
          payload = addFormData({ ...payload, medias: files });
          const { data } = await httpRequestHelper.post(
            "/apartments",
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setData(data.data);
          toast.success("Apartment created successfully");
        }

        setIsCreatingApartment(false);
        setSuccess(true);
      } catch (err: any) {
        setIsCreatingApartment(false);
        setError(true);
        console.log({ err });
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
    const userId = JSON.parse(window.localStorage.getItem("checkrommie__user")!)
      .user.id;
    const token = JSON.parse(localStorage.getItem("checkrommie__user")!).token;

    if (userId) {
      setLoading(true);

      httpRequestHelper
        .get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          const apartmentData = data.data?.apartments[0];
          if (apartmentData) {
            setData(apartmentData);
            setApartmentId(apartmentData?.id);
            setShortName(getShortName(apartmentData?.country));
            setState(apartmentData?.state);
          }
          setLoading(false);
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <section>
      {loading && <FullScreenLoader />}
      <AuthorizedNav />
      <ToastContainer />
      <section className="profile__container apartment d-flex ">
        <div className="header">
          <h1>Your aparment details</h1>
          <p>
            Describe everything you want people to know about your aparment and
            what characters you would like to see your flatmates have
          </p>
        </div>
        {!loading && success && (
          <form>
            {data.length !== undefined &&
              data?.apartment_medias?.length !== 0 ||
              files?.length === 0 && (
                <div>
                  <p className="image-label">Your Apartment Images</p>
                  <div className="apartment__imageSlider">
                    <ImageSlider medias={data?.apartment_medias} />
                  </div>
                </div>
              )}
            <div className="input__wrapper">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>
                  Drag 'n' drop to change your apartment images here, or click
                  to select files
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
              <label>Your Apartment name</label>
              <input
                type="text"
                name="heading"
                value={data?.heading}
                onChange={onHandleInputChange}
              />
            </div>
            <div className="input__wrapper">
              <label>Describe your apartment</label>
              <input
                type="text"
                name="description"
                value={data?.description}
                onChange={onHandleInputChange}
              />
            </div>
            <div className="input__wrapper">
              <label>What gender are you looking for?</label>
              <div className="gender__container">
                <span>
                  <input
                    type="radio"
                    name="preferred_gender"
                    value="male"
                    checked={data?.preferred_gender === "male"}
                    onChange={onHandleInputChange}
                  />{" "}
                  Male
                </span>
                <span>
                  <input
                    type="radio"
                    name="preferred_gender"
                    checked={data?.preferred_gender === "female"}
                    value="female"
                    onChange={onHandleInputChange}
                  />{" "}
                  Female
                </span>
                <span>
                  <input
                    type="radio"
                    name="preferred_gender"
                    checked={data?.preferred_gender === "any"}
                    value="any"
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
                    <option
                      value={country.shortName}
                      selected={country.name === data?.country}
                    >
                      {country.name}
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
              <label>Which city is your apartment in?</label>
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
              <label>Your house address</label>
              <input
                type="text"
                name="address"
                value={data?.address}
                onChange={onHandleInputChange}
              />
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
              <input
                type="text"
                name="rent_fee"
                value={data?.rent_fee}
                onChange={onHandleInputChange}
              />
            </div>
            <div className="input__wrapper">
              <label>How many bedroom</label>
              <input
                type="text"
                name="number_of_bedroom"
                value={data?.number_of_bedroom}
                onChange={onHandleInputChange}
              />
            </div>
            <div className="input__wrapper">
              <label>How many bathroom</label>
              <input
                type="text"
                name="number_of_bathroom"
                value={data?.number_of_bathroom}
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
              disabled={isCreatingApartment}
            >
              {isCreatingApartment ? <Spinner /> : "Upload apartment"}
            </button>
          </form>
        )}
      </section>
    </section>
  );
};

export default Apartment;
