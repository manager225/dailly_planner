<template>
  <div class="calendar">
    <calendar @getDate="getDate"></calendar>
    <tasks :dayNum="dayNum"></tasks>
  </div>
</template>

<script>
import Calendar from "./components/Calendar";
import Tasks from "./components/Tasks";

export default {
  name: 'App',
  data() {
    return {
      dayNum: '',
    }
  },
  components: {
    Calendar,
    Tasks
  },
  methods: {
    getDate(dateString) {
      this.dayNum = dateString;
    },
  }
}
</script>

<style>
body {
  background: #a0a4c842;
}

.calendar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
