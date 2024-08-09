import "../../styling/modal/modal.css";

function Modal(props: ModalProps) {
  return <div className="modal">{props.component}</div>;
}

export default Modal;

interface ModalProps {
  component: JSX.Element;
}
