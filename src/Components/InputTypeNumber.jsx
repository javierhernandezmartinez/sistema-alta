import {InputNumber} from "primereact/inputnumber";
const InputTypeNumber = (props) => {
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
                  <InputNumber id={props.id}
                               defaultValue={props.defaultValue}
                               value={props.value}
                               onValueChange={props.onChange}
                               mode={props.mode}
                               showButtons={props.showButtons}
                               min={props.min}
                               max={props.max}
                               placeholder={props.placeholder}
                               disabled={props.disabled}
                  />
              </div>
          </div>
  )
}

export default InputTypeNumber