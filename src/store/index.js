import { createStore } from 'vuex';

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  try {
    return tasks ? JSON.parse(tasks) : [];
  } catch (e) {
    console.error("Error parsing tasks from localStorage", e);
    return [];
  }
};

export default createStore({
  state: {
    tasks: loadTasksFromLocalStorage()
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
      console.log('add task');
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    REMOVE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    }
  },
  actions: {
    addTask({ commit }, task) {
      const newTask = { ...task, id: task.id || Date.now() };
      commit('ADD_TASK', newTask);
    },
    updateTask({ commit }, task) {
      commit('UPDATE_TASK', task);
    },
    removeTask({ commit }, taskId) {
      commit('REMOVE_TASK', taskId);
    },
    loadTasks({ commit }) {
      const tasks = loadTasksFromLocalStorage();
      commit('SET_TASKS', tasks);
    }
  },
  getters: {
    allTasks: (state) => {
      return state.tasks;
    },
    tasksByDate: (state) => (date) => {
      return state.tasks.filter(task => task.date === date);
    }
  },
  modules: {
  }
});
