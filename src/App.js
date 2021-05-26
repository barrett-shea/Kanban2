import React, {useState} from "react";
import InitialData from './InitialData'
import Column from './Column' 
import {DragDropContext} from 'react-beautiful-dnd'


export default function App () {
  const onDragEnd = result => {
    // TODO: reorder column
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
