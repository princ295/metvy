import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectStateModal } from "../reducer/selector";

const ModalBlock = ({ title, children }) => {

  const visible = useSelector(selectStateModal);
  const dispatch = useDispatch();

  return (
    <Modal show={visible} animation={true} onHide={() => dispatch({
       type: 'CLOSE_MODAL'
      })}
      >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children} 
      </Modal.Body>
    </Modal>
  );
}
 
export default ModalBlock;