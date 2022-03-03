import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //find the spots and the index of the selected day
  function findRemainingSpots(id, state) {
    const selectedDay = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );

    const emptyInterviews = state.days[selectedDay].appointments.filter(
      (appointment) => !state.appointments[`${appointment}`].interview
    );
    const spots = emptyInterviews.length;

    return { spots, selectedDay };
  }

  //update the state on booking an interview
  function bookInterview(id, interview) {
    //overwrite the existing interview object with the interview from argument
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    //update appointments object with the new appointment
    const appointments = { ...state.appointments, [id]: appointment };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        return setState({ ...state, appointments });
      })
      .then(() => {
        return setState((prev) => {
          const { spots, selectedDay } = findRemainingSpots(id, prev);
          return {
            ...prev,
            days: [
              ...prev.days.slice(0, selectedDay),
              {
                ...prev.days[selectedDay],
                spots: spots,
              },
              ...prev.days.slice(selectedDay + 1),
            ],
          };
        });
      });
  }

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        return setState({ ...state, appointments });
      })
      .then(() => {
        return setState((prev) => {
          const { spots, selectedDay } = findRemainingSpots(id, prev);
          return {
            ...prev,
            days: [
              ...prev.days.slice(0, selectedDay),
              {
                ...prev.days[selectedDay],
                spots: spots,
              },
              ...prev.days.slice(selectedDay + 1),
            ],
          };
        });
      });
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
