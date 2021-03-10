<template>

  <div class="tasks_list">
    <h3 v-if="getDay == ''">Ежедневник</h3>
    <h3 v-else>Ежедневник <br>{{ getDay }}</h3>
    <div class="addTask">
      <input
          class="input_task"
          type="text"
          v-model="taskInput"

          placeholder="Добавьте задачу"
          @keyup.enter="addTask"
      >
      <button :disabled="taskInput.length === 0" @click="addTask">Добавить</button>
    </div>
    <div class="task_list">
      <ul>
        <template v-for="(task, idx) in tasks">
          <li
              v-if="task.date == getDayInApp"
              :key="task.id"
              :class="task.checked ? 'done' : ''"
              class="task"
          >

      <span>

      <span :class="task.checked ? 'dNone' : ''">
        <input class="checkbox" @click="check(task.id)" type="checkbox">
      </span>

        <input
            v-if="task.edit"
            v-model="form.text"
            @keyup.enter="changeTask"
            type="text"/>

      <span v-else @dblclick="showForm(idx)">{{ task.title }}</span>

      </span>
            <button @click="removeTask(task.id)" class="delete">X</button>
          </li>

        </template>

      </ul>
    </div>

    <p v-if="getDay == ''">Для просмотра/добавления списка задач выберите дату.</p>
  </div>
</template>

<script>

export default {
  name: 'Task',
  props: ['dayNum'],
  data() {
    return {
      taskInput: '',

      clickedIndex: Number,
      form: {
        text: ''
      },
      tasks: [
        {
          title: 'Первая задача',
          checked: false,
          edit: false,
          date: '9 Март 2021',
          id: 567
        },
        {
          title: 'Вторая задача',
          checked: false,
          edit: false,
          date: '4 Март 2021',
          id: 568
        },
        {
          title: 'Третья задача',
          checked: false,
          edit: false,
          date: '7 Март 2021',
          id: 569
        },
      ],
      getDayInApp: '',
    }
  },
  methods: {
    check(index) {
      for (let i of this.tasks) {
        if (i.id === index) {
          i.checked = true
        }
      }
    },
    addTask() {
      let newTask = {
        title: this.taskInput,
        checked: false,
        edit: false,
        date: this.getDayInApp,
        id: Math.random()
      }
      this.tasks.push(newTask)
      this.taskInput = ''
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
    showForm(id) {
      this.tasks[id].edit = true
      this.clickedIndex = id
      this.form.text = this.tasks[id].title
    },
    changeTask() {
      this.tasks[this.clickedIndex].title = this.form.text
      this.tasks[this.clickedIndex].edit = false
    },
  },
  computed: {
    getDay() {
      return this.getDayInApp = this.dayNum;
    }
  }
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

</style>