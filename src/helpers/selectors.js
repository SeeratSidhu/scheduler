//get an array of appointments for a day
export function getAppointmentsForDay(state, day) {
  
  //grab the day object
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

//get an interview object for an appointment
export function getInterview(state, interview) {
  
  if(!interview) {
    return null;
  }

  const interviewerObj = state.interviewers[`${interview.interviewer}`];

  return {...interview, interviewer: interviewerObj};
}

//get an array of interviewers for a day
export function getInterviewersForDay(state, day) {
  
  //grab the day object from the days array
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