import BarMenu from "../../Components/BarMenu";
import Container from "../../Components/Container";
import img_no_img from "../../Assets/Images/img_no_img.png"
import PanelMisDatos from "../../Components/Administracion/Perfil/PanelMisDatos";
import {useEffect, useState} from "react";
import PanelMisCursos from "../../Components/Administracion/Perfil/PanelMisCursos";
import PanelMiAgenda from "../../Components/Administracion/Perfil/PanelMiAgenda";
import Session from "../../Services/Session";
import {BsFillCloudArrowUpFill} from "react-icons/bs";
import Services from "../../Services/Services";

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
const Perfil = () => {
    const user = Session.getUser()
    const [optionMenu, setOptionMenu] = useState(null)
    const [fotoPerfil, setFotoPerfil] = useState(img_no_img)
    const items=[
        {
            label:'Mis datos',
            icon:<i className={"pi pi-user-edit"}/>,
            panel:<PanelMisDatos title={'Mis datos'}/>
        },
        {
            label:'Mis cursos',
            icon:<i className={"pi pi-book"}/>,
            panel:<PanelMisCursos title={'Mis cursos'}/>
        },
        {
            label:'Mi agenda',
            icon:<i className={"pi pi-calendar"}/>,
            panel:<PanelMiAgenda title={'Mi agenda'}/>
        }
    ]

    const getFotoPerfil = () => {
        Services.getFotoPerfil(user).then(responds=>{
            if(responds.status === 200) {
                let data = {
                    ...user,
                    FOTO:responds?.data?.row[0]?.FOTO
                }
                Session.updateUser(data)
                setFotoPerfil(responds?.data?.row[0]?.FOTO)
            }
        })
    }
    const onChangeFile =(e)=>{
        getBase64(e.target.files[0]).then(res=> {
            console.log("enviando nueva imagen")
            Services.updateFotoPerfil(
                {
                    ID_USUARIO: user?.ID_USUARIO,
                    FOTO: res.base64
                }
            ).then(res=>{
                console.log(res)
                if(res.status === 200) {
                    getFotoPerfil()
                }

            })
        })
    }

    useEffect(()=>{
        if (!user){
            Session.removeUser()
        }
        setOptionMenu(items[0].panel)
        setFotoPerfil(user?.FOTO)
        getFotoPerfil()
    },[])
    const element = () => {
        return(
            <div className={"panel-p seccion-1"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <BarMenu/>
                    </div>
                </div>
                <div className={"row"} style={{height:"80vh"}}>
                    <div className={"col-sm-12 col-md-3 col-lg-2  row-left"}>
                        <div className={"row"}>
                            <div className={"col-sm-3 col-md-12"}>
                                <div className={"img-perfil"}>
                                    <img src={fotoPerfil || img_no_img} alt={""}/>
                                    <div className={"span-img"}>
                                        <span>
                                            <div className={"input-file"}>
                                                    <label htmlFor={"file-imgPerfil"}>
                                                        <BsFillCloudArrowUpFill/>
                                                    </label>
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
                            <div className={"col-sm-9 col-md-12"} style={{alignSelf: "center", marginBottom: "1rem"}}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <label className={"detalle-n"}>{user?.NOMBRE} </label>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <label className={"detalle-p"}>{user?.PUESTO} </label>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <label className={"detalle-p"}>N. Empleado: {user?.USER} </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{marginTop: "0.5rem"}}>
                            {
                                items.map((row)=>(
                                    <div key={row?.label} className={"col-4 col-sm-4 col-md-12"}>
                                        <div className={"perfil-panel-menu"} onClick={()=>setOptionMenu(row?.panel)}>
                                            <div className={"row"}>
                                                <div className={"col-sm-auto col-md-auto"} style={{padding: 0}}>
                                                    <div className={"menu-icon"}>{row?.icon}</div>
                                                </div>
                                                <div className={"col-sm-auto col-md-auto"}>
                                                    <div className={"menu-title"}>{row?.label}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={"col-sm-12 col-md-9 col-lg-10"}>
                        {optionMenu}
                    </div>
                </div>
            </div>
        )
    }

  return(
      <Container element = {element()}/>
  )
}

export default Perfil