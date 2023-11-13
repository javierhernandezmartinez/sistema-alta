import { Button } from 'primereact/button';
const Button = props => {
  return(
      <Button
          onClick={props.onClick ? props.onClick : ()=>{}}
      />
  )
}

export default Button