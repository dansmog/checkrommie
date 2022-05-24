import { MouseEventHandler, ReactNode } from "react";
// import "./types/rodal/index";
import Rodal from "rodal";

// include styles
import "rodal/lib/rodal.css";
import "./modal.styles.css";

interface modalInterface {
  visible?: boolean;
  onClose?: MouseEventHandler<HTMLSpanElement>;
  title?: string;
  children?: ReactNode;
  width?: number;
  subTitle?: string;
}
/**
 *
 * @param {Boolean} visible: the boolean state to show or hide the modal
 * @param {Function} onClose: the callback function to toggle visibility
 * @param {String} title: the title of the modal
 * @param {String} width: the width of the modal
 * @param {React} children: the modal content
 * @returns
 */
const ModalWrapper = ({
  visible,
  onClose,
  title,
  children,
  width,
  subTitle,
}: modalInterface) => {
  return (
    <Rodal
      visible={visible}
      showCloseButton={false}
      onClose={onClose}
      enterAnimation="slideUp"
      leaveAnimation="slideDown"
    >
      <div className="modal__container w-full">
        <div
          /** @ts-ignore */
          onClick={() => onClose()}
          className="close"
        >
          X
        </div>
        {children}
      </div>
    </Rodal>
  );
};

export default ModalWrapper;
