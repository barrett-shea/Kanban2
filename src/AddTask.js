import React, {useState} from "react";
import {Form, Button, Container} from 'react-bootstrap'

export default function AddTask (props) {
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleSubmit() {
    newTask = props.tasks.concat()
    setState(newTask)

    newList = props.columns.column1.taskIds.concat({value})
    setState(newList)

    setValue('')
  }

  return (
    <Container className='w-25'>
    <form onSubmit={handleSubmit}>
        <input 
          type='text'
          value={value} 
          placeholder='Start Typing...' onChange={handleChange} />
    <Button 
      variant="primary"
      type='submit'
    >
        Add Task
    </Button>
    </form>
    </Container>
  )
}