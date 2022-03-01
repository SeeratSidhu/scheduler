import { useState, useEffect } from 'react';
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    //overwrite the existing interview object with the interview from argument
    const appointment = {...state.appointments[id], interview: { ...interview}};
    //update appointments object with the new appointment
    const appointments = {...state.appointments, [id]: appointment}

    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
      return setState({...state, appointments});
    })

  }

  function cancelInterview(id) {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment};
    
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        return setState({...state, appointments});
      })
  }

  const setDay = (day) => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(response => {

      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
    })
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

export default useApplicationData;