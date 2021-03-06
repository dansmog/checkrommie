import User from "../../assets/images/user";
import { formatCurrency } from "../../utils/currencyFormatter";

import empty from "../../assets/images/emptystateimage.png";

import "./rommieCard.styles.css";

const RommieCard = ({ data, showDetail }: { data: any; showDetail: any }) => {
  return (
    <div className="rommie__card" onClick={showDetail}>
      {data?.apartment_medias.length === 0 ? (
        <img src={empty} alt="" />
      ) : (
        <img src={data?.apartment_medias[0]?.url} alt="" />
      )}
      <div className="card__footer">
        <div className="rommie--details">
          {data?.user?.avatar !== null ? (
            <img src={data?.user?.avatar} alt="" />
          ) : (
            <User />
          )}
          <div className="rommie--detailsUser">
            <h6>{data?.user?.name}</h6>
            <span>
              {data?.user?.gender} looking for {data?.preferred_gender}
            </span>
          </div>
        </div>
        <div className="house--details">
          <span>Annual rent</span>
          <h6>NGN {formatCurrency(data?.rent_fee)}</h6>
        </div>
      </div>
    </div>
  );
};

export default RommieCard;
