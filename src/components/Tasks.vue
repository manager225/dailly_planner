<template>

  <div class="tasks_list">
    <h3 v-if="getDayInApp === ''">Ежедневник</h3>
    <h3 v-else>Ежедневник <br>{{ getDayInApp }}</h3>
    <div class="addTask">
      <input
          class="input_task"
          type="text"
          v-model="taskInput"

          placeholder="Добавьте задачу"
          @keyup.enter="handleAddTask"
      >
      <button :disabled="taskInput.length === 0" @click="handleAddTask">Добавить</button>
    </div>
    <div class="task_list">
      <ul>
        <template v-for="task in filteredTasks" :key="task.id">
          <li
              :class="task.checked ? 'done' : ''"
              class="task"
          >

      <span>

      <span :class="task.checked ? 'dNone' : ''">
        <input class="checkbox" @click="check(task.id)" type="checkbox">
      </span>

        <input
            v-if="editingTaskId === task.id"
            v-model="form.text"
            @keyup.enter="changeTask"
            @keyup.esc="cancelEdit"
            @blur="cancelEdit"
            type="text"
            ref="editInput" />

      <span v-else @dblclick="showForm(task.id)">{{ task.title }}</span>

      </span>
            <div>
              <button v-if="editingTaskId === task.id" @click="changeTask" class="save-btn">✔</button>
              <button v-else @click="showForm(task.id)" class="edit-btn">✎</button>
              <button @click="handleRemoveTask(task.id)" class="delete">X</button>
            </div>
          </li>

        </template>

      </ul>
    </div>

    <p v-if="getDayInApp === ''">Для просмотра/добавления списка задач выберите дату.</p>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Task',
  props: {
    dayNum: { type: String, default: '' }
  },
  data() {
    return {
      taskInput: '',
      editingTaskId: null,
      errorMessage: '',
      form: { text: '' },
    }
  },
  computed: {
    ...mapGetters(['tasksByDate']),

    getDayInApp() {
      return (this.dayNum || '').trim();
    },

    filteredTasks() {
      return this.tasksByDate(this.getDayInApp);
    }
  },
  methods: {
    ...mapActions(['addTask', 'updateTask', 'removeTask']),

    check(id) {
      const task = this.filteredTasks.find(t => t.id === id);
      if (task) {
        const updatedTaskData = { ...task, checked: !task.checked };
        this.updateTask(updatedTaskData);
      }
    },

    handleAddTask() {
      if (!this.taskInput.trim() || !this.getDayInApp) return;
      const newTask = {
        id: Date.now(),
        title: this.taskInput.trim(),
        checked: false,
        date: this.getDayInApp,
      };
      this.addTask(newTask);
      this.taskInput = '';
    },

    handleRemoveTask(id) {
      this.removeTask(id);
    },

    showForm(id) {
      const task = this.filteredTasks.find(t => t.id === id);
      if (!task) return;
      this.editingTaskId = id;
      this.form.text = task.title;
    },

    changeTask() {
      if (!this.form.text.trim() || this.editingTaskId === null) return;
      const task = this.filteredTasks.find(t => t.id === this.editingTaskId);
      if (task) {
        const updatedTaskData = {
          ...task,
          title: this.form.text.trim()
        };
        this.updateTask(updatedTaskData);
        this.editingTaskId = null;
        this.form.text = '';
      }
    },

    cancelEdit() {
        this.editingTaskId = null;
        this.form.text = '';
    }
  },
}
</script>

<style scoped>
.tasks_list {
  font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
  border: 1px solid black;
  margin-left: 10px;
  max-width: 492px;
}

.addTask {
  margin-top: 10px;
  padding: 0 10px;
}

.tasks_list h3, p {
  text-align: center;
}

.task_list ul {
  padding: 15px;
}

.input_task {
  width: 300px;
  font-size: 13px;
  padding: 6px 0 4px 10px;
  border: 1px solid #cecece;
  background: #F6F6f6;
  border-radius: 8px;
}

button {
  border: 1px solid limegreen;
  border-radius: 40px;
  width: 150px;
  height: 30px;
  margin-left: 10px;
}

button:active {
  border: 3px solid lightseagreen;
}

button:active, button:focus, input:active, input:focus {
  outline: none;
}

button::-moz-focus-inner {
  border: 0;
}

button:disabled {
  cursor: not-allowed;
  opacity: 1 !important;
  background: #eee !important;
  border-color: #ddd !important;
  color: #999 !important;
}

.task {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  cursor: pointer;
  border: 1px solid #00ffb1;
  border-radius: 10px;
  background: #fff;
  color: black;
  padding: 10px;
  margin-bottom: 5px;
}

.delete {
  border: 1px solid red;
  width: 25px;
  height: 25px;
  background: #ed9d9d;
}
.delete:active {
  border: 3px solid crimson;
}

.edit-btn {
  border: 1px solid #2196F3;
  width: 25px;
  height: 25px;
  background: #90CAF9;
  color: #0D47A1;
}

.edit-btn:active {
  border: 3px solid #1976D2;
}


.done {
  color: #7d7e82;
  text-decoration: line-through;
}

.dNone {
  display: none;
}

.checkbox {
  margin-right: 10px;
}

.save-btn {
  border: 1px solid limegreen;
  width: 25px;
  height: 25px;
  background: lightgreen;
  color: darkgreen;
  margin-left: 5px; /* Add some space between input and button */
}

.save-btn:active {
  border: 3px solid darkgreen;
}

</style>
