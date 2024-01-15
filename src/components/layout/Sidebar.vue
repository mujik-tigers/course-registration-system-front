<template>
  <div class="infoSidebar">
    <h3 class="semester">2024학년도 1학기</h3>
    <table class="infoTable">
      <tr v-for="(value, key, index) in info" :key="key">
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
      fetchStudentInfoUrl: "http://localhost:8080/students",
      categories: ["이름", "학번", "소속", "학년"],
      info: [],
    };
  },
  mounted() {
    this.fetchStudentInfo();
  },
  methods: {
    fetchStudentInfo() {
      if (this.info.length === 0) {
        axios.get(this.fetchStudentInfoUrl)
        .then(res => {
          if (res.data.code == 200) {
            this.info = res.data.data;
          }
        })
        .catch(error => {
            if (error.response &&error.response.data.code == 401) {
              alert('세션이 만료되어 로그아웃되었습니다');
              window.location = '/';
            }
          }
        )
      }
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
