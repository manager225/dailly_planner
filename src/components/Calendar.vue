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
        <td v-for="(day, index) in week"
            :style="{'color': day.weekend, 'background-color': day.current}"
            @click="$emit('getDate',day.index, monthes[month], year); toggleActive"
        > {{ day.index }}
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: "Calendar",
  emits: ['getDate'],
  data() {
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      dFirstMonth: '1',
      day: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
      monthes: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      date: new Date(),
    }
  },
  methods: {
    calendar: function () {
      let days = [];
      let week = 0;
      days[week] = [];
      let dlast = new Date(this.year, this.month + 1, 0).getDate();
      for (let i = 1; i <= dlast; i++) {
        if (new Date(this.year, this.month, i).getDay() != this.dFirstMonth) {
          let a = {index: i};
          days[week].push(a);
          if (i == new Date().getDate() && this.year == new Date().getFullYear() && this.month == new Date().getMonth()) {
            a.current = '#747ae6'
          };
          if (new Date(this.year, this.month, i).getDay() == 6 || new Date(this.year, this.month, i).getDay() == 0) {
            a.weekend = '#ff0000'
          };
        } else {
          week++;

          days[week] = [];
          let a = {index: i};
          days[week].push(a);
          if ((i == new Date().getDate()) && (this.year == new Date().getFullYear()) && (this.month == new Date().getMonth())) {
            a.current = '#747ae6'
          };
          if (new Date(this.year, this.month, i).getDay() == 6 || new Date(this.year, this.month, i).getDay() == 0) {
            a.weekend = '#ff0000'
          };
        }
      }

      if (days[0].length > 0) {
        for (let i = days[0].length; i < 7; i++) {
          days[0].unshift('');

        }
      }
      return days;
    },
    decrease: function () {
      this.month--;
      if (this.month < 0) {
        this.month = 12;
        this.month--;
        this.year--;
      }
    },

    increase: function () {
      this.month++;
      if (this.month > 11) {
        this.month = -1;
        this.month++;
        this.year++;
      }
    },
  },
  computed: {}
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
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 25px;
  cursor: pointer;
}

.table thead tr:last-child {
  background-color: #dedada;
}

</style>