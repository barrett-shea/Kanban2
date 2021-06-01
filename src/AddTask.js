import React, {useState, useRef} from "react";
import {Form, Button, Container} from 'react-bootstrap'

export default function AddTask () {
  const [value, setValue] = useState({
    input: '',
    submitted: false
  })

  function handleChange(e) {
    setValue({input: {value}})
  }

  function handleSubmit(e) {
  
  }

  return (
    <Container className='w-25'>
    <form onSubmit={handleSubmit}>
        <input 
          type='text'
          value={value.input} 
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