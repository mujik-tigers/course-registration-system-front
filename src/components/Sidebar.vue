<template>
  <div class="infoSidebar">
    <h3 class="semester">{{ openingYear }}학년도 {{ semester }}학기</h3>
    <table class="infoTable">
      <tr v-for="(value, index) in info" :key="index">
        <th style="text-align: left; width: 20%">{{ categories[index] }}</th>
        <td style="text-align: right">{{ value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: "WebSidebar",
  data() {
    return {
      fetchYearAndSemesterUrl: "https://course-registration-system.site/clock/current-year-and-semester",
      fetchStudentInfoUrl: "https://course-registration-system.site/students",
      categories: ["이름", "학번", "소속", "학년"],
      info: [],
      openingYear: null,
      semester: null,
    };
  },
  mounted() {
    this.fetchStudentInfo();
    this.fetchCurrentYearAndSemester();
  },
  methods: {
    fetchStudentInfo() {
      if (this.info.length === 0) {
        axios.get(this.fetchStudentInfoUrl)
        .then(res => {
          if (res.data.code == 200) {
            const info = res.data.data
            this.info = [info.name, info.studentId, info.departmentName, info.grade];
          }
        })
      }
    },
    fetchCurrentYearAndSemester() {
      axios.get(this.fetchYearAndSemesterUrl)
        .then(res => {
          if (res.data.code == 200) {
            this.openingYear = res.data.data.year;
            const semester = res.data.data.semester;
            if (semester == 'FIRST') {
              this.semester = 1;
            } else {
              this.semester = 2;
            }
          }
        })
        .catch(error => {
          if (error.response && error.response.data.code == 400) {
            alert(error.response.data.message);
          }
        });
    },
  }
};
</script>

<style>
.semester {
  margin: 0px 0px 40px 15px;
  font-weight: 550;
}

.infoSidebar {
  width: 250px;
  padding: 0px 40px 0px 20px;
  font-size: 13px;
}

.infoTable {
  width: 100%;
}

.infoTable tr {
  height: 45px;
  border-bottom: 1px solid gray;
}
</style>
