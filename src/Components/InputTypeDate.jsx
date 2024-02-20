import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
const InputTypeDate = (props) => {
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
                  <Calendar value={props.value}
                            onChange={props.onChange}
                            showTime={props.showTime}
                            hourFormat={props.hourFormat}
                            timeOnly={props.timeOnly}
                            dateFormat={props.dateFormat}
                  />
              </div>
          </div>
  )
}

export default InputTypeDate