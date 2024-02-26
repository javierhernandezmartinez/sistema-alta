import { Password } from 'primereact/password';
import {InputText} from "primereact/inputtext";
const InputTypePassword = (props) => {
  return(
          <div className="input-box">
              {
                  props.title ? <label className={"input-title"}>{props.title}</label> : null
              }
              <div className="p-inputgroup" style={{border: props.important ? '2px solid #ef4444' : "none", borderRadius: "6px"}}>
                  {
                      props.icon ?
                          <span className="p-inputgroup-addon">
                              <i className={`pi ${props.icon}`}></i>
                          </span> : null
                  }
                  <Password id={props.id}
                            value={props.value}
                            defaultValue={props.defaultValue}
                            onChange={props.onChange}
                            placeholder={props.placeholder}
                            toggleMask
                            feedback={props.feedback}
                  />
              </div>

          </div>
  )
}

export default InputTypePassword