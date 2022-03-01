import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from "axios";


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  function bookInterview(id, interview) {
    //overwrite the existing interview object with the interview from argument
    const appointment = {...state.appointments[id], interview: { ...interview}};
    //update appointments object with the new appointment
    const appointments = {...state.appointments, [id]: appointment}

    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
      return setState({...state, appointments});
      })
      .catch(err => console.log(err));

  }
  const schedule = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);
    
    return (<Appointment 
    key={appointment.id} 
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={interviewers}
    bookInterview={bookInterview}
    />)
  });

  
  
  const setDay = (day) => setState({...state, day});
  // const setDays = (days) => setState(prev => ({...prev, days}));


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(response => {

      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
          days={state.days}
          value={state.day}
          onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
