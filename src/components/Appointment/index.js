import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Error from './Error';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
import "./styles.scss";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  const deleteBooking = () => {
    transition(CONFIRM);
  }
  
  const confirmDelete = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={deleteBooking} onEdit={() => transition(EDIT)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={confirmDelete} onCancel={() => back()}/>}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={() => transition(SHOW)}/>}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={() => console.log("close")}/>}
      {mode === ERROR_SAVE && <Error message="Could not delete appointment." onClose={() => console.log("close")}/>}
    </article>
  );
}