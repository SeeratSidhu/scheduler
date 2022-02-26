
export function getAppointmentsForDay(state, day) {
  
  const filteredDay = state.days.filter((dayItem) => dayItem.name === day);

  if (filteredDay.length === 0) {
    return filteredDay;
  }
  //do not alter the state
  const appointmentsArray = filteredDay[0].appointments.map((appointmentId) => {
      return {...state.appointments[`${appointmentId}`]};
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

export function getInterviewersForDay(state, day) {
  
  const filteredDay = state.days.filter((dayItem) => dayItem.name === day);

  if (filteredDay.length === 0) {
    return filteredDay;
  }
  /// do not alter the state 
  const interviewersArray = filteredDay[0].interviewers.map((interviewerId) => {
      return {...state.interviewers[`${interviewerId}`]};
  })

  return interviewersArray;
} 