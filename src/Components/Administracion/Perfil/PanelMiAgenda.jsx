import React, {useEffect, useMemo, useState} from 'react';
import moment from 'moment';
import {Calendar, DateLocalizer, momentLocalizer, Views,} from 'react-big-calendar'
import {useDispatch, useSelector} from "react-redux";
import Services from "../../../Services/Services";
import PropTypes from "prop-types";
import Session from "../../../Services/Session";
import Modal from "../../Modal";
import logoBM from "../../../Assets/logoBM.png";
import {Divider} from "primereact/divider";
import {closeModalForm, openModalForm} from "../../../App/Features/rootModalFormSlice";

//moment.tz.setDefault('America/Mexico_City')
const mLocalizer = momentLocalizer(moment)
const cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']
const lang = {
    en: null,
    'en-GB': null,
    es: {
        week: 'Semana',
        work_week: 'Semana de trabajo',
        day: 'Día',
        month: 'Mes',
        previous: 'Atrás',
        next: 'Después',
        today: 'Hoy',
        agenda: 'El Diario',

        showMore: (total) => `+${total} más`,
    }
}
const formatDate = (date, time) => {
    let y = date.split('T')[0].split('-')[0]
    let m = date.split('T')[0].split('-')[1]
    let d = date.split('T')[0].split('-')[2]
    let hh = time.split(':')[0]
    let mm = time.split(':')[1]
    let ss = time.split(':')[2]
    console.log("aqui toy",new Date(y, m, d, hh, mm, ss))
    return new Date(y, m, d, hh, mm, ss)
}
export default function PanelMiAgenda ({
                          localizer = mLocalizer,
                          showDemoLink = true,
                          ...props
                      }){
    const user = Session.getUser()
    let dispatch = useDispatch()
    console.log("INFO: User ", !!user)
    const [eventos, setMisEventos] = useState([])
    const [culture, setCulture] = useState('es')
    const [rightToLeft, setRightToLeft] = useState(false)
    const [cursoSelected, setCursoSelected] = useState({})
    const getMisEventos=()=>{
        Services.getMisCursos({ID_USUARIO:user?.ID_USUARIO})
            .then(res=>{
                console.log("mis eventos::", res)
                let data = []
                new Date(2023, 9, 30, 0, 0, 0)
                if(res?.status === 200){
                    if(res?.data?.row?.length > 0){
                        data = res?.data?.row?.map(item=>{
                            return {
                                ...item,
                                /*start: formatDate(item.F_INICIO, item.H_INICIO),
                                end: formatDate(item.F_FIN, item.H_FIN),*/
                                start: `${item.F_INICIO.split("T")[0]}T${item.H_INICIO}.000Z`,
                                end: `${item.F_FIN.split("T")[0]}T${item.H_FIN}.000Z`,
                                allDay: false,
                                //start: new Date(2023, 11, 14, 17, 30, 0),
                                //end: new Date(2023, 11, 14, 20, 30, 0),
                            }
                        })
                    }
                }
                console.log(data)
                setMisEventos(data)
            })
    }
    let containerEvent=(event)=>{
        console.log("-->",event)
        return(
            <div className={'containerEvent'} style={{background: `#${event?.COLOR}`}}
                 onClick={()=>{
                     console.log(event)
                     setCursoSelected(event)
                     dispatch(openModalForm())
                 }}
            >
                        <span>
                              <em>{event.NOMBRE}</em>
                              {/*<p>{event.DESCRIPCION}</p>*/}
                            </span>
            </div>
        )
    }
    const { components, defaultDate, views } = useMemo(
        () => ({
            components: {
                eventWrapper:({event})=>containerEvent(event),
            },
            views: Object.keys(Views).map((k) => Views[k]),
        }),
        []
    )
    const {  messages } = useMemo(
        () => ({
            messages: lang[culture],
        }),
        [culture]
    )
    const panelCurseDetail = (item) => {
        return(
            <div className={"row"}>
                <div className={"col-12 col-sm-12 col-md-12 col-lg-12"}>
                    <div className={"div-card div-card-modal"}>
                        <div className={"row"} style={{height: "100%", alignContent: "space-between"}}>
                            <div className={"col-md-12"}>
                                <p className={"title-card"}>Programacion: #{item.ID_PROGRAMACION || '---'}</p>
                            </div>
                            <div className={"col-5 col-sm-5 col-md-5 col-lg-5"} style={{alignSelf: "center"}}>
                                <img src={item?.BANNER || logoBM}/>
                            </div>

                            <div className={"col-7 col-sm-7 col-md-7 col-lg-7"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <p className={"title-card"}>{item.CURSO || item.NOMBRE}</p>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <p className={"description-card"}>{item.DESCRIPCION}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12"}>
                                <Divider />
                                <p className={"subtitle-modal"}>Horario</p>
                            </div>
                            <div className={"col-md-12"}>
                                <div className={"row"}>
                                    <div className={"col-auto col-sm-6 col-md-6 col-lg-6"}>
                                        <p className={"horario"}>
                                            <label>Del</label> <span>{item?.F_INICIO?.split("T")[0]}</span> al <span>{item?.F_FIN?.split("T")[0]}</span>
                                        </p>
                                    </div>
                                    <div className={"col-auto col-sm-6 col-md-6 col-lg-6"}>
                                        <p className={"horario"}>
                                            <label>Horario: </label> <span>{item?.H_INICIO?.split(":")[0]}:{item?.H_INICIO?.split(":")[1]} hrs.</span> a <span>{item.H_FIN?.split(":")[0]}:{item.H_FIN?.split(":")[0]} hrs.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12"}>
                                <Divider />
                                <p className={"subtitle-modal"}>Ubicacion</p>
                            </div>

                            <div className={"col-sm-6 col-md-6"}>
                                <p className={"capacitador-card"}>Empresa: {item.EMPRESA || '---'}</p>
                            </div>

                            <div className={"col-sm-6 col-md-6"}>
                                <p className={"capacitador-card"}>Liga: {item.LIGA || '---'}</p>
                            </div>
                            <div className={"col-sm-6 col-md-6"}>
                                <p className={"capacitador-card"}>Lugar: {item.LUGAR || '---'}</p>
                            </div>
                            <div className={"col-sm-6 col-md-6"}>
                                <p className={"capacitador-card"}>Sala: {item.SALA || '---'}</p>
                            </div>
                            <div className={"col-sm-12 col-md-12"}>
                                <Divider />
                                <p className={"subtitle-modal"}>Impartido por: {item.CAPACITADOR || '---'}</p>
                            </div>

                            <div className={"col-md-12"}>
                                <div className={"row card-options"} style={{justifyContent: "end"}}>
                                    <div className={"col-6 col-sm-auto col-md-auto"}>
                                        <label onClick={()=>dispatch(closeModalForm())}>
                                            Cerrar
                                        </label>
                                    </div>

                                </div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
        )
    }

    useEffect(()=>{
        getMisEventos()
    },[])
    return (
        <div className={"row row-form"}>
            <div className={"col-md-12"}>
                <p className={"title-seccion"}>{props?.title}</p>
            </div>
            <div className={"col-md-12"}>
                <div className={"calendar"} style={{ height: 500 }}>
                    <Calendar
                        components={components}
                        culture={culture}
                        events={eventos}
                        localizer={localizer}
                        showMultiDayTimes
                        views={views}
                        defaultView={Views.MONTH}
                        selectable
                        timeslots={8}
                        step={60}
                        messages={messages}
                        dayLayoutAlgorithm="no-overlap"
                        rtl={rightToLeft}
                        popup
                    />
                </div>
            </div>
            <Modal header={"Detalle de curso"}
                   element = {panelCurseDetail(cursoSelected)}
            />
        </div>
    );

}
PanelMiAgenda.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer)
}
