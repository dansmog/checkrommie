import { MouseEventHandler, ReactNode } from "react";
// import "./types/rodal/index";
import Rodal from 'rodal';

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
      width={width}
      onClose={onClose}
      enterAnimation="slideDown"
      leaveAnimation="slideUp"
    >
      <div className="modal__container">
        <header>
          <h1>{title}</h1>
          <span>{subTitle}</span>
          <span onClick={onClose}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.85198 4.85186C5.20996 4.49388 5.79036 4.49388 6.14834 4.85186L11.0002 9.70368L15.852 4.85186C16.21 4.49388 16.7904 4.49388 17.1483 4.85186C17.5063 5.20984 17.5063 5.79024 17.1483 6.14822L12.2965 11L17.1483 15.8519C17.5063 16.2098 17.5063 16.7902 17.1483 17.1482C16.7904 17.5062 16.21 17.5062 15.852 17.1482L11.0002 12.2964L6.14834 17.1482C5.79036 17.5062 5.20996 17.5062 4.85198 17.1482C4.494 16.7902 4.494 16.2098 4.85198 15.8519L9.7038 11L4.85198 6.14822C4.494 5.79024 4.494 5.20984 4.85198 4.85186Z"
                fill="#0D0D0D"
              />
            </svg>
          </span>
        </header>
        {children}
      </div>
    </Rodal>
  );
};

export default ModalWrapper;
