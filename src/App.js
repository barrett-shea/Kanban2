import React, {useState} from "react";
import InitialData from './InitialData'
import Column from './Column' 
import {DragDropContext} from 'react-beautiful-dnd'


export default function App () {
  const [order, setOrder] = useState(InitialData)
  
  const onDragEnd = result => {     //used to persist new order after drag
    const {destination, source, draggableId} = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const column = InitialData.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }

    const newState = {
      ...InitialData,
      columns: {
        ...InitialData.columns,
      },
      [newColumn.id]: newColumn, 
    }

    setState(newState)
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        {InitialData.columnOrder.map(columnId => {
          const column= InitialData.columns[columnId];
          const tasks= column.taskIds.map(taskId=> InitialData.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />
        })}
    </DragDropContext>
  );
}
