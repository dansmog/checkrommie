/* This example requires Tailwind CSS v2.0+ */
import { formatCurrency } from "../../utils/currencyFormatter";

import "./moredetails.styles.css";
import ModalWrapper from "../Modal";
import ImageSlider from "../ImageSlider";
import { useEffect, useState } from "react";
import httpRequestHelper from "../../containers/utils/httpRequest.helper";
import Spinner from "../../assets/images/spinner";
import ErrorHandler from "../../utils/ErrorHandler";
import { Link } from "react-router-dom";
import User from "../../assets/images/user";

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

  useEffect(() => {
    if (open) {
      setLoading(true);

      httpRequestHelper
        .get(`/apartments/${id}`)
        .then(({ data }) => {
          const newData = data.data;
          setData(newData);
          setLoading(false);
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          ErrorHandler(err);
        });
    }
  }, [id, onCloseModal, open]);

  const userContact = () => {
    const user = JSON.parse(window.localStorage.getItem("checkrommie__user")!);
    if (user) {
      return (
        <a href={`tel:${data?.user?.phone_number}`} className="contactBtn">
          Click here to contact
        </a>
      );
    } else {
      return (
        <Link to="/login" className="contactBtn">
          Login to view contact
        </Link>
      );
    }
  };

  return (
    <ModalWrapper visible={open} onClose={onCloseModal}>
      {loading && <Spinner />}
      {!loading && success && (
        <>
          <div className="moredetails">
            <div className="container">
              <div className="row">
                <div className="apartment-owner">
                  <div className="row g-3">
                    <div className="left col-12 col-md-12 col-lg-7 user-title">
                      {data?.user?.avatar !== null ? (
                        <img
                          src={data?.user?.avatar}
                          className="apartment-owner__avatar"
                          alt="apartment owner profile pic"
                        />
                      ) : (
                        <User />
                      )}
                      <div>
                        {console.log(data)}
                        <h4>{data?.user?.name}</h4>
                        <p>{`looking for ${data?.preferred_gender} flatmate`}</p>
                      </div>
                    </div>
                    <div className="right col-12 col-md-12 col-lg-5">
                      <div>
                        <h6>Annual Rent:</h6>
                        <p>NGN {formatCurrency(`${data?.rent_fee}`)}</p>
                      </div>
                      <div className="filler" />

                      {userContact()}
                    </div>
                  </div>
                </div>
                <div className="apartment__image-carousel">
                  {data?.apartment_medias?.length ? (
                    <ImageSlider medias={data?.apartment_medias} />
                  ) : null}
                  {data?.apartment_medias?.length === 0 && (
                    <div
                      style={{
                        width: "100%",
                        padding: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>{data?.user?.name} haven't uploaded any image yet</p>
                    </div>
                  )}
                </div>
                <div className="apartment-details__list">
                  <div className="row g-4">
                    <div className="apartment-details__items col-12">
                      <h6>Title</h6>
                      {console.log(data?.user.has_apartment)}
                      <p>
                        {data?.description}
                      </p>
                    </div>
                    <div className="apartment-details__items col-12">
                      <h6>Apartment is {!data?.user?.has_apartment && "prefferably "}in</h6>
                      <p>{data?.country}</p>
                    </div>
                    <div className="apartment-details__items col-12">
                      <h6>Apartment is {!data?.user?.has_apartment && "prefferably "} located at</h6>
                      <p>{data?.state}</p>
                    </div>
                    <div className="apartment-details__items col-12">
                      <h6>{!data?.user?.has_apartment && "prefferably "} In the city of</h6>
                      <p>{data?.city}</p>
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
                      <h6>{!data?.user?.has_apartment && "Preffered"} Flatmate employment status</h6>
                      <p>{data?.employment_status}</p>
                    </div>
                    <div className="apartment-details__items col-12 col-sm-12 col-md-6 col-lg-3">
                      <h6> Should be from?</h6>
                      <p>Any country</p>
                    </div>

                    <div className="apartment-details__items col-12 col-sm-12 col-md-5 col-lg-5">
                      <h6>{!data?.user?.has_apartment && "Preffered"} Qualities I want from a flatmate</h6>
                      <div className="apartment-details__qualities">
                        {data?.qualities.map((quality: any, i: any) => (
                          <div className="apartment-details__quality" key={i}>
                            {quality}
                          </div>
                        ))}
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
