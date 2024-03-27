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

const difFechas = (f_inicio, f_fin) => {
    var fechaInicio = new Date(f_inicio).getTime();
    var fechaFin    = new Date(f_fin).getTime();

    var diff = fechaFin - fechaInicio;
    let diferencia =diff/(1000*60*60*24)
    console.log( diferencia);
    return diferencia
}
const eventForDay = (events) => {
  let event = []

    events.map(item=>{
        console.log('--F_INICIO: ', item.F_INICIO, 'F_FIN: ', item.F_FIN)
        //F_INICIO:  2024-02-20T06:00:00.000Z F_FIN:  2024-02-22T06:00:00.000Z
        let diff = new Date(item.F_FIN).getTime() - new Date(item.F_INICIO).getTime();
        let diferencia =diff/(1000*60*60*24)
        console.log(diferencia)
        let fecha = new Date(item.F_INICIO)
        console.log('Fecha inicio:', fecha)
        event.push(
            {
                ...item,
                title: item?.NOMBRE,
                //start: `${item.F_INICIO.split("T")[0]}T${item.H_INICIO}.000Z`,
                //end: `${item.F_FIN.split("T")[0]}T${item.H_FIN}.000Z`,
                start:new Date(`${moment(fecha).format("YYYY-MM-DD")}T${item.H_INICIO}.000`),
                end:new Date(`${moment(fecha).format("YYYY-MM-DD")}T${item.H_FIN}.000`),
                allDay: false,
            }
        )

        for (let i = 0; i < diferencia; i++){
            fecha.setDate(fecha.getDate()+1)
            console.log(moment(fecha).format("YYYY-MM-DD"))

            event.push(
                {
                    ...item,
                    title: item?.NOMBRE,
                    //start: `${item.F_INICIO.split("T")[0]}T${item.H_INICIO}.000Z`,
                    //end: `${item.F_FIN.split("T")[0]}T${item.H_FIN}.000Z`,
                    start:new Date(`${moment(fecha).format("YYYY-MM-DD")}T${item.H_INICIO}.000`),
                    end:new Date(`${moment(fecha).format("YYYY-MM-DD")}T${item.H_FIN}.000`),
                    allDay: false,
                }
            )
        }
    })

    console.log('List Event full day', event)
    return event
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
    const [now, setNow] = useState(new Date())
    const getMisEventos=()=>{
        Services.getMisCursos({ID_USUARIO:user?.ID_USUARIO})
            .then(res=>{
                console.log("mis eventos::", res)
                let data = []
                if(res?.status === 200){
                    if(res?.data?.row?.length > 0){
                        console.log('->',res?.data?.row)
                        //console.log('-*',events)
                        data = eventForDay(res?.data?.row)
                    }
                }

                setMisEventos(data)
            })
    }
    let containerEvent=(eventWrapperProps)=>{
        console.log("-->",eventWrapperProps)
        let style = {
            ...eventWrapperProps?.children?.props?.style,
            background: `#${eventWrapperProps?.event?.COLOR}`,
            color: 'initial'
        }
        return(
            <>
                {/*{eventWrapperProps.children}*/}
                <div className={'rbc-event containerEvent'}
                     style={style}
                     title={eventWrapperProps?.event?.NOMBRE}
                     onClick={()=>{
                         console.log(eventWrapperProps?.event)
                         setCursoSelected(eventWrapperProps?.event)
                         dispatch(openModalForm())
                     }}
                >
                    <div className={'rbc-event-label'}>
                        {eventWrapperProps?.label}
                    </div>
                    <div className={'rbc-event-content'}>
                        {eventWrapperProps?.event?.NOMBRE}
                    </div>

                </div>
                                </>

        )
    }

    const { components, defaultDate, views } = useMemo(
        () => ({
            components: {
                //eventWrapper:({event})=>containerEvent(event),
                eventWrapper:(eventWrapperProps)=>{
                    return containerEvent(eventWrapperProps)
                }
            },
            views: Object.keys(Views).map((k) => Views[k]),
        }),[]
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
                                            <label>Horario: </label> <span>{item?.H_INICIO?.split(":")[0]}:{item?.H_INICIO?.split(":")[1]} hrs.</span> a <span>{item.H_FIN?.split(":")[0]}:{item.H_FIN?.split(":")[1]} hrs.</span>
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
                        //events={events}
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
