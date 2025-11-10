import IconSuccess from "@/assets/success.svg";
import IconDelete from "@/assets/delete.svg";
import IconClose from "@/assets/close.svg";
import "./Modal.scss";

type ModalType = "success" | "delete";

type Props = {
  type: ModalType;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
};

const Modal = ({ type, title, message, onClose, onConfirm }: Props) => {
  const icon = type === "success" ? IconSuccess : IconDelete;
  const circleBg = type === "success" ? "#CEFFE1" : "#FDEEEE";

  return (
    <div className="ModalOverlay">
      <div className="ModalContent">
          <img
            src={IconClose}
            alt="Close"
            className="CloseIcon"
            onClick={onClose}
          />

        <div className="IconWrapper" style={{ backgroundColor: circleBg }}>
          <img src={icon} alt={type} className="ModalIcon" />
        </div>

        <p className="ModalTitle">{title}</p>
        <p className="ModalMessage">{message}</p>

        <div className={`ButtonArea ${type}`}>
          {type === "success" ? (
            <button className="OkButton" onClick={onClose}>
              OK
            </button>
          ) : (
            <>
              <button className="NoButton" onClick={onClose}>
                No
              </button>
              <button className="YesButton" onClick={onConfirm}>
                Yes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
