
export function getAppointmentsForDay(state, selectedDay) {
  
  const filteredDay = state.days.filter((day) => day.name === selectedDay);
  

  const appointmentsArray = filteredDay[0].appointments.map((appointment) => {
      return {...state.appointments[`${appointment}`]};
  })

  return appointmentsArray;
}