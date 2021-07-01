import React from 'react'
import Task from './Task'
import {Droppable} from 'react-beautiful-dnd'

export default function Column ({ column, tasks }) {
  return (
    <div className='border rounded w-25 m-3 d-flex flex-column'>
      <h1 className='p-2 text-white bg-primary'>{column.title}</h1>
      <Droppable droppableId = {column.id}>
        {(provided, snapshot) => (
          <div className={`flex-grow-1 p-2 ${snapshot.isDraggingOver ? 'bg-warning' : 'bg-white'}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (<Task key={task.id} task= {task} index={index} columnDetails={column}/>))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}