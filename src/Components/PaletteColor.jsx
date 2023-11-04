import { ColorPicker } from 'primereact/colorpicker';
import {useState} from "react";
const PaletteColor = (props) => {
    const [color, setColor] = useState(null);
  return(
          <div className="input-text">
            <label>{props.title}</label>
              <ColorPicker value={color} inline/>
          </div>
  )
}

export default PaletteColor