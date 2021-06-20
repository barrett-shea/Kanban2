import React, {useState} from "react";
import Column from './Column' 
import {DragDropContext} from 'react-beautiful-dnd'
import InitialData from './InitialData'
import AddTask from './AddTask'


export default function Dnd() {
  
  const [state, setState] = useState(InitialData)
  
  const onDragEnd = result => {     //used to persist new order after drag
    const {destination, source, draggableId} = result

    if (!destination) {
      return
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return
    }

    const start = state.columns[result.source.droppableId]
// InitialData.columns['column1'] = start = {id:column1, title:, taskIds: [task1, task2, task3, task4]}
    const finish = state.columns[result.destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
// newTaskIds = [task1, task2, task3, task4]
      newTaskIds.splice(result.source.index, 1)
    
      newTaskIds.splice(result.destination.index, 0, draggableId)
// example: moving top of list to bottom 
//newTaskIds = [task2, task3, task4, task1]

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }
// newColumn = {id:column1, title:, taskIds: [task2, task3, task4, task1]}
      const newState = {
        ...state, // spread syntax to maintian properties of of InitialData.tasks
        columns: {
          ...state.columns, //not needed for only one column
          [newColumn.id]: newColumn, //overrides existing column-- 'column1': {id, title, taskIds:[newTaskIds]}
        }, //since only 1 column, InitialData.columnOrder is not updated in newState
      } 
    
    
        setState(newState)
// Save updated state (list order) to database here
        return
      } 

    //Moving from one column to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(result.source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(result.destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }

    setState(newState)
  };

  return (
  <>
  <DragDropContext onDragEnd={onDragEnd}>
      <div className='d-flex'>
        {state.columnOrder.map(columnId => {
          const column= state.columns[columnId];
          const tasks= column.taskIds.map(taskId=> state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />
        })}

      </div>
    </DragDropContext>
    <AddTask state={state} setState={setState}/>
    </>
  )
}