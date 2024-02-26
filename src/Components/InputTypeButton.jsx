import { Button } from 'primereact/button';
const InputTypeButton = props => {
  return(
      <Button className={"input-button"}
              label={props.label}
              icon={props.icon}
          onClick={props.onClick ? props.onClick : ()=>{}}
      />
  )
}

export default InputTypeButton