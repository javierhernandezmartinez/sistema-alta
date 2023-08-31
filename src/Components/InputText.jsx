import "../Styles/Components/Components.scss"
import {InputText} from "primereact/inputtext";
const InputTypeText = (props) => {
  return(
          <div className="input-text">
            <label>{props.title}</label>
            <InputText id={props.id}
                       defaultValue={props.defaultValue}
                       onChange={props.onChange}
                       value={props.value}
                       placeholder={props.placeholder}
            />
          </div>
  )
}

export default InputTypeText