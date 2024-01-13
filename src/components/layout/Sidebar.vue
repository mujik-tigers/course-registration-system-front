<template>
  <div class="infoSidebar">
    <h3 class="semester">2024학년도 1학기</h3>
    <table class="infoTable">
      <tr v-for="(category, index) in categories" :key="index">
        <th style="width: 20%">{{ category }}</th>
        <td style="text-align: right">{{ info[index] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "WebSidebar",
  data() {
    return {
      categories: ["이름", "학번", "소속", "학년"],
      info: ['김서연', '171000962', '커뮤니케이션디자인학과', '4']
    };
  },
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
