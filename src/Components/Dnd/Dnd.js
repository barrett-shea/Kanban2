import React, {useState} from "react";
import Column from './Column' 
import {DragDropContext} from 'react-beautiful-dnd'
import AddTask from './AddTask'
import TaskCounter from './TaskCounter'
import useData from '../hooks/useData'
import { useAuth } from "../../Contexts/AuthContext"
import { database } from "../../firebase"
import InitialData from './InitialData'

const Dnd = () => {
  const {currentUser} = useAuth()
  
  //const [state, setState] = useState(InitialData)
  
  const {state, setState} = useData(currentUser)
  
  //console.log(`Dnd State: ${JSON.stringify(state)}`)
  
  const onDragEnd = result => {     //used to persist new order after drag
    const {destination, source, draggableId} = result

    if (!destination) return

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
        ...finish, taskIds: newTaskIds,
      }
// newColumn = {id:column1, title:, taskIds: [task2, task3, task4, task1]}
      const newState = {
        ...state, // spread syntax to maintian properties of of InitialData.tasks
        columns: {
          ...state.columns, //not needed for only one column
          [finish.id]: newColumn, //overrides existing column-- 'column1': {id, title, taskIds:[newTaskIds]}
        }, //since only 1 column, InitialData.columnOrder is not updated in newState
      } 
    
      setState(newState)
      
      console.log(start.id)
      //updates db, then crashes dnd
      database.columns.doc(start.id).update({taskIds: newTaskIds})
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
        [start.id]: newStart,
        [finish.id]: newFinish,
      },
    }

    setState(newState)
    
    database.columns
      .doc(newStart.id).update({taskIds: startTaskIds})

    database.columns
      .doc(newFinish.id).update({taskIds: finishTaskIds})
  };

  return (
  <>
  {state ?
    (
    <>
  <TaskCounter state={state}/>
  <DragDropContext onDragEnd={onDragEnd}>
      <div className='d-flex'>
        {state.columnOrder.map(columnId => {
          const column= state.columns[columnId];
          const tasks= column.taskIds.map(taskId=> state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} state={state} setState={setState}/>
        })}
      </div>
    </DragDropContext>
    <AddTask state={state} setState={setState}/>
  </>
  )
  :
  <div>loading</div>
}
</>
  )
}

export default Dnd