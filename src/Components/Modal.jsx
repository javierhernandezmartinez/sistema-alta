import {Dialog} from "primereact/dialog";
import {useDispatch, useSelector} from "react-redux";
import {closeModalForm, openModalForm} from "../App/Features/rootModalFormSlice";

const Modal = (props) => {
    const modalOpen = useSelector(state => state.rootModalForm.modalFormReducer)
    const dispatch = useDispatch()

    return(
      <Dialog header="Nuevo registro"
              visible={modalOpen} style={{ width: '50vw' }}
              onHide={() => {dispatch(closeModalForm())}}
              className={"ad-modal"}
      >
          {props.element}
      </Dialog>
  )
}

export default Modal