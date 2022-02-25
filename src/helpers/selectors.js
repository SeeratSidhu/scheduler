
export function getAppointmentsForDay(state, day) {
  
  const filteredDay = state.days.filter((dayItem) => dayItem.name === day);

  if (filteredDay.length === 0) {
    return filteredDay;
  }

  const appointmentsArray = filteredDay[0].appointments.map((appointment) => {
      return {...state.appointments[`${appointment}`]};
  })

  return appointmentsArray;
}


export function getInterview(state, interview) {
  
  if(!interview) {
    return null;
  }

  const interviewerObj = state.interviewers[`${interview.interviewer}`];

  return {...interview, interviewer: interviewerObj};
}