<template>
  <div class="table_container">
    <table class="table">
      <thead>
      <tr>
        <td>
          <button class="decrease" v-on:click="decrease">&lt;</button>
        </td>
        <td colspan="5"> {{ monthes[month] }} {{ year }}</td>
        <td>
          <button v-on:click="increase">></button>
        </td>
      </tr>
      <tr>
        <td v-for="d in day">{{ d }}</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="week in calendar()">
        <td v-for="(day, dIndex) in week"
            :key="dIndex"
            :style="{'color': day.weekend, 'background-color': day.current}"
            @click="day.index && $emit('getDate', `${day.index} ${monthes[month]} ${year}`)"
            class="day-cell"
            :class="{ 'has-tasks': hasTasks(day.index) }">
          {{ day.index }}
          <span v-if="hasTasks(day.index)" class="task-indicator"></span>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Calendar",
  emits: ['getDate'],
  data() {
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      day: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
      monthes: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    }
  },
  methods: {
    calendar() {
      const days = []
      const firstDay = new Date(this.year, this.month, 1).getDay()
      const lastDate = new Date(this.year, this.month + 1, 0).getDate()
      const today = new Date()
      let week = []
      const startDay = firstDay === 0 ? 6 : firstDay - 1
      
      for (let i = 0; i < startDay; i++) week.push('')
      
      for (let day = 1; day <= lastDate; day++) {
        const date = new Date(this.year, this.month, day)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6
        const isToday = day === today.getDate() &&
                       this.month === today.getMonth() &&
                       this.year === today.getFullYear()
        
        week.push({
          index: day,
          weekend: isWeekend ? '#ff0000' : undefined,
          current: isToday ? '#747ae6' : undefined
        })
        
        if (week.length === 7) {
          days.push(week)
          week = []
        }
      }
      
      if (week.length) {
        while (week.length < 7) week.push('')
        days.push(week)
      }
      
      return days
    },
    decrease() {
      this.month = (this.month - 1 + 12) % 12
      if (this.month === 11) this.year--
    },
    increase() {
      this.month = (this.month + 1) % 12
      if (this.month === 0) this.year++
    },
    hasTasks(day) {
      if (!day) return false
      const dateStr = `${day} ${this.monthes[this.month]} ${this.year}`
      return this.allTasks.some(task => task.date === dateStr)
    },
  },
  computed: {
    ...mapGetters(['allTasks'])
  }
}
</script>

<style>
.table_container {
  max-width: 365px;
  border: 1px solid black;
}

.table {
  border-collapse: collapse;
  width: 100%;
}

.format-week {
  float: right;
}

.table td {
  position: relative;
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 25px;
  cursor: pointer;
}

.day-cell {
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 25px;
  cursor: pointer;
}

.task-indicator {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background-color: #ff4444;
  border-radius: 50%;
}

.table thead tr:last-child {
  background-color: #dedada;
}

.table td:hover:not(:empty) {
  background-color: #f0f0f0;
}

</style>
