const InitialData = {
  tasks: {
    'task1': { id: 'task1', content: 'Take out garbage'},
    'task2': { id: 'task2', content: 'Clean Dishes'},
    'task3': { id: 'task3', content: 'Make Bed'},
    'task4': { id: 'task4', content: 'Cook Dinner'},
  },

  columns: {
    'column1': {
      id: 'column1',
      title: 'To Do',
      taskIds: ['task1', 'task2', 'task3', 'task4'],
    },
    'column2': {
      id: 'column2',
      title: 'In Progress',
      taskIds: [],
    },
    'column3': {
      id: 'column3',
      title: 'Testing',
      taskIds: [],
    },
    'column4': {
      id: 'column4',
      title: 'Done',
      taskIds: [],
    },
  },

  // Needed to reorder columns
  columnOrder: ['column1', 'column2', 'column3', 'column4'], 

};

export default InitialData;



