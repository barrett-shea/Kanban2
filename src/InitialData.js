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
  },

  // Needed to reorder columns
  columnOrder: ['column1'], 

};

export default InitialData;



