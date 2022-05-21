/* This example requires Tailwind CSS v2.0+ */
import { formatCurrency } from "../../utils/currencyFormatter";

import "./moredetails.styles.css";
import ModalWrapper from "../Modal";
import ImageSlider from "../ImageSlider";
import qualities from "../Tags/qaulities";
import { useEffect, useState } from "react";
import httpRequestHelper from "../../containers/utils/httpRequest.helper";
import FullScreenLoader from "../FullscreenLoader";

// const testdata = {
//   id: 1,
//   heading: "2 Bed Room Flat",
//   description:
//     "This is if there is any description of the apartment, we are to show this particular one and make sure it is beautiful and sweet, forget about the things that has been happening to you in a long time and i would bring them to pass for you",
//   date_of_posting: null,
//   number_of_bedroom: 2,
//   number_of_bathroom: 4,
//   on_floor: 1,
//   has_balcony: false,
//   is_active: true,
//   country: "Nigeria",
//   state: "Lagos",
//   city: "Ikeja",
//   address: "34, Ogundiran, Surulere, Ikeja Lagos",
//   qualities: '{"Smoking","Partying","Drinking","Cooking"}',
//   rent_fee: 230000,
//   preferred_religion: "christian",
//   preferred_gender: "male",
//   created_at: "2022-05-13T14:59:45.949Z",
//   updated_at: "2022-05-19T15:02:49.194Z",
//   deleted_at: null,
//   user: {
//     id: 2,
//     name: "John Doe",
//     email: "realolamilekan@gmail.com",
//     phone_number: "07086556010",
//     status: "active",
//     gender: "male",
//     religion: "christian",
//     avatar:
//       "https://res.cloudinary.com/ocean-one-homes/image/upload/v1652989110/pr7zb6ftxheelo2yl72u.png",
//     email_verified_at: "2022-05-13T14:44:38.245Z",
//     country: "Nigeria",
//     state: "Lagos",
//     city: "ikeja",
//     address: "38, Ogbomoso avenue",
//     employment_status: "employed",
//     income_estimate: "200000",
//     has_apartment: false,
//     qualities: ["Smoking", "clubbbing", "Enjoyment", "Feminism"],
//     created_at: "2022-05-13T14:42:55.829Z",
//     updated_at: "2022-05-19T19:38:43.416Z",
//   },
//   apartment_medias: [
//     {
//       id: 1,
//       created_at: "2022-05-13T14:59:45.410Z",
//       updated_at: "2022-05-13T14:59:45.949Z",
//       url: "https://res.cloudinary.com/ocean-one-homes/image/upload/v1652453984/idfumdqqjg84n9qgf2za.gif",
//       name: "confused-travolta.gif",
//     },
//     {
//       id: 2,
//       created_at: "2022-05-13T14:59:45.943Z",
//       updated_at: "2022-05-13T14:59:45.949Z",
//       url: "https://res.cloudinary.com/ocean-one-homes/image/upload/v1652453985/v9atwzb5ymslgvnfrbos.png",
//       name: "cropped.png",
//     },
//   ],
// };

export default function MoreDetailModal({
  open,
  onCloseModal,
  id,
}: {
  open: boolean;
  onCloseModal: any;
  id: string;
}) {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const getQualitiesArray = (qualities: string) => {
    let newQualities = qualities
      .replaceAll('"', "")
      .replaceAll("{", "")
      .replaceAll("}", "")
      .split(",");
    return newQualities;
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      const token = JSON.parse(
        localStorage.getItem("checkrommie__user")!
      ).token;
      httpRequestHelper
        .get(`/apartments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          const newData = data.data;
          setData(newData);
          setLoading(false);
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          onCloseModal();
          alert("error");
        });
    }
  }, [id, onCloseModal, open]);

  return (
    <ModalWrapper visible={open} onClose={onCloseModal}>
      {loading && <FullScreenLoader />}
      {!loading && success && (
        <>
          <div className="moredetails">
            <div className="container">
              <div className="row">
                <div className="apartment-owner">
                  <div className="row g-3">
                    <div className="left col-12 col-md-12 col-lg-7">
                      <img
                        src={data?.user?.avatar}
                        className="apartment-owner__avatar"
                        alt="apartment owner profile pic"
                      />
                      <div>
                        <h4>{data?.user?.name}</h4>
                        <p>Male looking for male or female flatmate</p>
                      </div>
                    </div>
                    <div className="right col-12 col-md-12 col-lg-5">
                      <div>
                        <h6>Annual Rent:</h6>
                        <p>NGN {formatCurrency(`${data?.rent_fee}`)}</p>
                      </div>
                      <div className="filler" />
                      <a
                        href={`tel:${data?.user?.phone_number}`}
                        className="contactBtn"
                      >
                        Click here to contact
                      </a>
                    </div>
                  </div>
                </div>
                <div className="apartment__image-carousel">
                  {data?.apartment_medias?.length && (
                    <ImageSlider medias={data?.apartment_medias} />
                  )}
                </div>
                <div className="apartment-details__list">
                  <div className="row g-4">
                    <div className="apartment-details__items col-12">
                      <h6>Title</h6>
                      <p>
                        I am looking for a male flatmate in my 3 bedroom
                        apartment
                      </p>
                    </div>
                    <div className="apartment-details__items col-12">
                      <h6>Description</h6>
                      <p>{data?.description}</p>
                    </div>
                    <div className="apartment-details__items col-12">
                      <h6>Preffered Religion</h6>
                      <p>{data?.preferred_religion}</p>
                    </div>
                    <div className="apartment-details__items col-12 col-sm-12 col-md-6 col-lg-5">
                      <h6>Flatmate employment status</h6>
                      <p>I need an employed flatmate</p>
                    </div>
                    <div className="apartment-details__items col-12 col-sm-12 col-md-6 col-lg-3">
                      <h6>Should be from?</h6>
                      <p>Any country</p>
                    </div>
                    <div className="apartment-details__items col-12 col-sm-12 col-md-6 col-lg-3">
                      <h6>Should be from?</h6>
                      <p>Any country</p>
                    </div>
                    <div className="apartment-details__items col-12 col-sm-12 col-md-5 col-lg-5">
                      <h6>Qualities I want from a flatmate</h6>
                      <div className="apartment-details__qualities">
                        {getQualitiesArray(data?.qualities).map(
                          (quality, i) => (
                            <div className="apartment-details__quality" key={i}>
                              {quality}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </ModalWrapper>
  );
}
