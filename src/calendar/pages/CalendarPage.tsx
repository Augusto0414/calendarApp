import { Calendar, View } from 'react-big-calendar';
import { addHours, differenceInSeconds, } from 'date-fns';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import React, { useEffect, useState } from 'react';
import { getMessage, localizer } from '../../helpers';
import { CalendarEvent, FabAdd, NavBar } from '../components';
import { CalendarModal } from '../components/CalendarModal';
import { Label, TextArea, Input } from '../../components';
import { useUIStore } from '../../hooks/useUIStore';
import { useCalendarStore, Event } from '../../hooks/useCalendarStore';
import { FabDelete } from '../components/FabDelete';


export const CalendarPage = (): JSX.Element => {

    const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'week');
    const [formSubmit, setFormSubmit] = useState<boolean>(true);
    const { isDateModalOpen, openDateModal, closeDateModal } = useUIStore()
    const { events, setActiveEvents, activeEvent, saveCalendart } = useCalendarStore();
    const [formValue, setformValue] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    })

    useEffect(() => {
        if (activeEvent !== null) {
            setformValue({ ...activeEvent })
        }
    }, [activeEvent])


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormSubmit(true);
        if (name === 'start' || name === 'end') {
            setformValue({ ...formValue, [name]: new Date(value) });
        } else {
            setformValue({ ...formValue, [name]: value });
        }
    }

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const diffrence = differenceInSeconds(formValue.end, formValue.start);
        if (diffrence <= 0 || isNaN(diffrence)) {
            Swal.fire('Fecha incorrecta', 'La fecha de inicio no puede ser posterior a la fecha de fin');
            return;
        }
        if (formValue.title.length <= 0) {
            setFormSubmit(false);
            return;
        }
        await saveCalendart(formValue);
        console.log(formValue);
    }

    const onDoucbleClick = () => {
        openDateModal();
    }
    const onSelected = (event: Event) => {
        setActiveEvents(event);
    }

    const onViewChanged = (event: View) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    }

    const eventStyleGetter = (event: any, start: Date, end: Date, isSelected: boolean) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            color: 'white',
            opacity: 0.8,
        }
        return { style }

    }
    return (
        <>
            <NavBar nickUser={"Augusto"} />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={getMessage()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoucbleClick}
                onSelectEvent={onSelected}
                onView={onViewChanged}
            />
            <CalendarModal isOpen={isDateModalOpen} onClose={closeDateModal} >
                <div className='w-full my-4'>
                    <h1 className='text-left mx-5 text-gray-700 text-2xl font-semibold'>
                        Añadir evento
                    </h1>
                </div>
                <form className="container mb-2 w-full p-4" onSubmit={onSubmit}>
                    <div className="flex flex-col space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="email">Fecha y hora de inicio</Label>
                                <Input
                                    type="datetime-local"
                                    id="date"
                                    name='start'
                                    placeholder="fecha y hora de inicio"
                                    value={formValue.start.toISOString().slice(0, 16)}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Fecha y hora fin</Label>
                                <Input
                                    type="datetime-local"
                                    id="date"
                                    name='end'
                                    placeholder="fecha y hora fin"
                                    value={formValue.end.toISOString().slice(0, 16)}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="title">Titulo de las notas</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={`${!formSubmit ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    placeholder="Título de las notas"
                                    value={formValue.title}
                                    onChange={onInputChange}
                                />
                                {!formSubmit &&
                                    (<small className='text-xs text-red-500 font-semibold'>Titulo requerido</small>)}

                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="description">Notas</Label>
                                <TextArea
                                    id="description"
                                    name="notes"
                                    placeholder="Notas"
                                    rows={5}
                                    value={formValue.notes}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <button className='w-full px-4 py-4 text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors'>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </CalendarModal>
            <FabAdd />
            <FabDelete />
        </>
    );
};
