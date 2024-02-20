import {InputText} from "primereact/inputtext";
import {InputSwitch} from "primereact/inputswitch";
import {ColorPicker} from "primereact/colorpicker";
const InputColorPicker = (props) => {
  return(
          <div className="input-box">
              {
                  props.title ? <label className={"input-title"}>{props.title}</label> : null
              }
              <div className="p-inputgroup" style={{border: props.important ? '2px solid #ef4444' : "none", borderRadius: "6px"}}>
                  <ColorPicker value={props.value}
                               inline
                               onChange={props.onChange}
                  />
              </div>
          </div>
  )
}

export default InputColorPicker