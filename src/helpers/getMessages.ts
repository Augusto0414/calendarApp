export const getMessage = () => {
  return {
    allDay: "Todo el dia",
    previous: "<",
    next: ">",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango",
    showMore: (total: any) => `+ Ver nas (${total})`,
  };
};
