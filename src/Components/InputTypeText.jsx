import {InputText} from "primereact/inputtext";
const InputTypeText = (props) => {
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

                  <InputText id={props.id}
                             defaultValue={props.defaultValue}
                             onChange={props.onChange}
                             value={props.value}
                             placeholder={props.placeholder}
                             disabled={props.disabled}
                  />
              </div>
          </div>
  )
}

export default InputTypeText