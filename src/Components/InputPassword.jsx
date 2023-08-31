import "../Styles/Components/Components.scss"
import { Password } from 'primereact/password';
const InputTypePassword = (props) => {
  return(
          <div className="input-text">
            <label>{props.title}</label>
            <Password id={props.id}
                      defaultValue={props.defaultValue}
                      onChange={props.onChange}
                      placeholder={props.placeholder}
                      toggleMask
            />
          </div>
  )
}

export default InputTypePassword