/* This example requires Tailwind CSS v2.0+ */
import { formatCurrency } from "../../utils/currencyFormatter";

import "./moredetails.styles.css";
import ModalWrapper from "../Modal";
import ImageSlider from "../ImageSlider";
import { useEffect, useState } from "react";
import httpRequestHelper from "../../containers/utils/httpRequest.helper";
import Spinner from "../../assets/images/spinner";


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
          // onCloseModal();
          // alert("error");
        });
    }
  }, [id, onCloseModal, open]);

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
                        {console.log(data)}
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
