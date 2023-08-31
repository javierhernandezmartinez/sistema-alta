import {Button} from 'primereact/button';
import InputTypeText from "../../InputText";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import img_no_img from "../../../Assets/Images/img_no_img.png"
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import InputTypePassword from "../../InputPassword";


const defaultData = {
    name:'',
    puesto:'',
    num_empleado:'',
    correo:'',
    password:'',
    new_password:'',
    image:''
}
const getBase64=(file)=> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({
            base64:reader.result,
            name: file.name
        });
        reader.onerror = error => reject(error);
    });
}

const onChangeData = (array,valor, setValue, campo) => {
    array[campo] = valor
    setValue({...array})
}

const cleanData =(setValue,defaultData)=>{
    setValue({...defaultData})
}


const PanelMisDatos = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [imageSelected, setImageSelected] = useState(null)
    const [value, setValue] = useState({...defaultData});
    const onChangeFile =(e)=>{
        console.log(e)
        getBase64(e.target.files[0]).then(res=> {
            console.log(res)
            setImageSelected(res)
        })
    }

    useEffect(()=>{
    },[])

    return(
        <div className={"row row-form"}>
            <div className={"col-md-12"}>
                <p className={"title-seccion"}>{props.title}</p>
            </div>
            <div className={"col-md-4"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <InputTypeText id="username" title={"Nombre"}
                                       value={value.name}
                                       placeholder={"nombre"}
                                       onChange={(e)=>{onChangeData(value,e.target.value,setValue, "name")}}

                        />
                    </div>
                    <div className={"col-md-12"}>
                        <InputTypeText id="username"
                                       title={"Puesto"}
                                       value={value.puesto}
                                       placeholder={"puesto"}
                                       onChange={(e)=>{onChangeData(value,e.target.value,setValue, "puesto")}}

                        />
                    </div>
                    <div className={"col-md-12"}>
                        <InputTypeText id="username"
                                       title={"Num. Empleado"}
                                       value={value.num_empleado}
                                       placeholder={"num. empleado"}
                                       onChange={(e)=>{onChangeData(value,e.target.value,setValue, "num_empleado")}}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <InputTypeText
                            id="username"
                            title={"Correo"}
                            defaultValue={arrayList.nombre}
                            placeholder={"correo"}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <InputTypePassword
                            id="username"
                            title={"Nueva Contrasena"}
                            placeholder={"nueva contrasena"}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <InputTypePassword
                            id="username"
                            title={"Confirma Contrasena"}
                            placeholder={"confirma contrasena"}
                        />
                    </div>
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className={"row"}>
                    <div className={"col-sm-10 col-md-8 col-lg-12"}>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <div className="input-text">
                                    <label>Imagen perfil</label>
                                    <div className={"input-file"}>
                                        <label htmlFor={"file-imgPerfil"}>
                                            <BsFillCloudArrowUpFill/>
                                            {imageSelected ? imageSelected?.name : "Seleccione un archivo"}
                                        </label>
                                        <input type={"file"}
                                               id={"file-imgPerfil"}
                                               accept={"image/png, image/jpeg, image/jpg"}
                                               onChange={(e)=>onChangeFile(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12"}>
                                <img src={imageSelected ? imageSelected?.base64 : img_no_img} className={"img-preview"}/>
                            </div>
                            <div className={"col-md-12"}>
                                <diV class={"div-buttons"}>
                                    <Button onClick={()=>{
                                        console.log("POST VALUE DATA:: ",value)
                                    }}>
                                        Guardar
                                    </Button>
                                    <Button onClick={()=> {
                                        cleanData(setValue, defaultData)
                                    }}
                                    >
                                        Cancelar
                                    </Button>
                                </diV>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default PanelMisDatos