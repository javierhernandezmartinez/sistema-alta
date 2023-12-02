import React, {useEffect, useMemo, useState} from 'react';
import moment from 'moment';
import {Calendar, DateLocalizer, momentLocalizer, Views,} from 'react-big-calendar'
import {useSelector} from "react-redux";
import Services from "../../../Services/Services";
import PropTypes from "prop-types";
import Session from "../../../Services/Session";

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
    return new Date(y, m, d, hh, mm, ss)
}
export default function PanelMiAgenda ({
                          localizer = mLocalizer,
                          showDemoLink = true,
                          ...props
                      }){
    const user = Session.getUser()
    console.log("INFO: User ", !!user)
    const [eventos, setMisEventos] = useState([])
    const [culture, setCulture] = useState('es')
    const [rightToLeft, setRightToLeft] = useState(false)
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
                                start: formatDate(item.F_INICIO, item.H_INICIO),
                                end: formatDate(item.F_FIN, item.H_FIN),
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
            <div className={'containerEvent'} style={{background: `#${event?.COLOR}`}}>
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
        </div>
    );

}
PanelMiAgenda.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer)
}
