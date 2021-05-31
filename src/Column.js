import React from 'react'
import Task from './Task'
import {Droppable} from 'react-beautiful-dnd'

export default function Column (props) {
  return (
    <div className='border rounded m-2 w-25 d-flex flex-column'>
      <h1 classname='p-2'>{props.column.title}</h1>
      <Droppable droppableId = {props.column.id}>
        {(provided, snapshot) => (
          <div className={`flex-grow-1 p-2 ${snapshot.isDraggingOver ? 'bg-success' : 'bg-white'}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task, index) => (<Task key={task.id} task= {task} index={index}/>))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}