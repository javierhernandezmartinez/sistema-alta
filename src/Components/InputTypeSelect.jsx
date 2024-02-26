import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
const InputTypeSelect = (props) => {
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

                  <Dropdown value={props.value}
                            onChange={props.onChange}
                            options={props.options}
                            optionLabel="name"
                            placeholder="Selecciona una opcion"/>
              </div>
          </div>
  )
}

export default InputTypeSelect