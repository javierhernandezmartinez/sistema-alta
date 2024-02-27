import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";
import InputTypeText from "../../InputTypeText";
import InputTypeSwitch from "../../InputTypeSwitch";
import InputTypeButton from "../../InputTypeButton";
import InputColorPicker from "../../InputColorPicker";
import logoBM from "../../../Assets/logoBM.png";
import {BsFillCloudArrowUpFill} from "react-icons/bs";
import GlobalFunctions from "../../../Global/GlobalFunctions";
import {PiTrash} from "react-icons/pi";
import {Tooltip} from "primereact/tooltip";

const getCursos = (dispatch)=>{
    Services.getCursos().then(res=> {
        if(res.status === 200 && res?.data?.row?.length > 0) {
            dispatch(listDataTable(res?.data?.row))
            dispatch(closeModalForm())
        }
    })
}

const addCurso = (dispatch, array, props) => {
    Services.addCurso(array).then(res => {
            console.log(res)
        if(res.status === 200) {
            props.toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getCursos(dispatch)
        }

        }
    )
}
const updateCurso = (dispatch, array, props) => {
    Services.updateCurso(array).then(res => {
            console.log(res)
        if(res.status === 200) {
            props.toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getCursos(dispatch)
        }

        }
    )
}

const onCloseModal = (dispatch) => {
    dispatch(closeModalForm())
}

const FormCurso = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedActivo, setSelectedActivo] = useState(false)
    const [message, setMessage] = useState(null);

    const onChange = (e,campo) => {
        arrayList[campo] = e
        setArrayList({...arrayList})
        console.log(arrayList)
        setMessage(null)
    }
    const onSaveModal = () => {
        console.log("POST JSON::",arrayList)
        if (!arrayList.NOMBRE ||
            !arrayList.COLOR ||
            !arrayList.STATUS
        ){
            setMessage("Llene los campos importantes.!")
        }else {
            if (arrayList.ID_CURSO){
                updateCurso(dispatch, arrayList, props)
            }else {
                addCurso(dispatch, arrayList, props)
            }
        }
    }
    const onChangeFile =(e)=>{
        GlobalFunctions.getBase64(e.target.files[0]).then(res=> {
            console.log("enviando nueva imagen", res.base64)
            onChange(res.base64, "BANNER")
        })
    }
    useEffect(()=>{
        setSelectedActivo(props.arrayList.STATUS === 1)
    },[])
    return(
        <div className={"row row-form"}>
            <div className={"col-sm-6 col-md-6"}>
                <InputTypeText
                    title={"Nombre curso *"}
                    defaultValue={arrayList.NOMBRE}
                    placeholder={"nombre curso"}
                    onChange={(e)=>onChange(e.target.value, "NOMBRE")}
                    important={message}
                />
            </div>
            <div className={"col-sm-6 col-md-6"}>
                <InputTypeText
                    title={"Descripción"}
                    defaultValue={arrayList.DESCRIPCION}
                    placeholder={"descripción"}
                    onChange={(e)=>onChange(e.target.value,"DESCRIPCION")}
                    />
            </div>
            <div className={"col-auto col-sm-auto col-md-auto"}>
                <InputColorPicker
                    title={"Color *"}
                    important={message}
                    value={arrayList.COLOR}
                    onChange={(e)=>onChange(e.value, "COLOR")}
                />
            </div>
            <div className={"col-auto col-sm-4 col-md-4"}>
                <div className="input-text"
                     style={{
                         height: "100%",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center"
                     }}
                >
                    <label
                        style={
                        {
                            color:`#${arrayList.COLOR}`,
                            border: "2px solid",
                            width: "70px",
                            height: "70px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 24px",
                            textShadow: "0 0 10px",
                            borderRadius: "50%",
                            fontWeight: "500"
                        }}
                    >{arrayList.COLOR}</label>
                </div>
            </div>
            <div className={"col-12 col-sm-12 col-md-12"}>
                <label className={"input-title"}>Banner</label>
                <div className={"img-banner"}>
                    <img src={arrayList?.BANNER || logoBM} alt={""}/>

                    <div className={"span-img"}>
                                        <span>
                                            <div className={"input-file"}>
                                                <div className={"div-icons"}>
                                                    <Tooltip target=".upload" mouseTrack mouseTrackLeft={10} />
                                                     <label htmlFor={"file-imgPerfil"}
                                                            className={"upload"}
                                                            data-pr-tooltip="Seleccionar imagen"
                                                     >
                                                        <BsFillCloudArrowUpFill/>
                                                    </label>
                                                    {
                                                        arrayList?.BANNER?
                                                            <>
                                                                <Tooltip target=".clean" mouseTrack mouseTrackLeft={10} />
                                                                <label  className={"clean"}
                                                                        data-pr-tooltip="Quitar imagen"
                                                                        onClick={()=>{onChange(null, "BANNER")}}
                                                                >
                                                                    <PiTrash />
                                                                </label>
                                                            </>: null
                                                    }

                                                </div>
                                                    <input type={"file"}
                                                           id={"file-imgPerfil"}
                                                           accept={"image/png, image/jpeg, image/jpg"}
                                                           onChange={(e)=>onChangeFile(e)}
                                                    />
                                                </div>
                                        </span>
                    </div>
                </div>
            </div>
            <div className={"col-sm-12 col-md-12"}>
                <InputTypeSwitch
                    title={"Estatus"}
                    checked={selectedActivo}
                    onChange={(e) => {
                        setSelectedActivo(e.value)
                        onChange(e.value ? 1 : 0, "STATUS")
                    }}
                />
            </div>
            <div className={"col-md-12"}>
                <div className={"row"} style={{justifyContent: "right"}}>
                    {
                        message ?
                            <div className={"col-md-12"}>
                                <label style={{color: "#ef4444"}}>{message}</label>
                            </div>
                            : null
                    }
                    <div className={"col-6 col-sm-auto col-md-auto"}>
                        <InputTypeButton
                            icon={"pi pi-times"}
                            label={"Cancelar"}
                            onClick={()=>onCloseModal(dispatch, arrayList)}
                        />
                    </div>
                    <div className={"col-6 col-sm-auto col-md-auto"}>
                        <InputTypeButton
                            icon={"pi pi-check"}
                            label={"Guardar"}
                            onClick={(e)=> {
                                onSaveModal()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCurso