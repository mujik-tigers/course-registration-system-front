<template>
  <form class="filterOptions" @submit.prevent=submitFilterOptions>
    <div class="options">
      <label class="optionLabels" for="departmentOption">개설학과</label>
      <select id="departmentOption" v-model="selectedDepartment">
        <optgroup label="개설학과">
          <option v-for="(value, index) in departments" :key="index" :value="value.id">{{ value.name }}</option>
        </optgroup>
      </select>
    </div>
    <div class="options">
      <label class="optionLabels" for="subjectDivisionOption">이수구분</label>
      <select id="subjectDivisionOption" v-model="selectedSubjectDivision">
        <optgroup label="이수구분">
          <option value="ALL">전체</option>
          <option value="MR">전공 필수</option>
          <option value="ME">전공 선택</option>
          <option value="GR">교양 필수</option>
          <option value="GE">교양 선택</option>
        </optgroup>
      </select>
    </div>
    <div>
      <label class="optionLabels" for="subjectNameOption">교과목명</label>
      <input type="text" id="subjectNameOption" v-model="subjectName"/>
    </div>
    <button class="enrollPageButton" style="margin: 0px 10px">검색</button>
  </form>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "FilterOption",
  emits: ['set-lecture-filter-options'],
  data() {
    return {
      fetchYearAndSemesterUrl: "https://course-registration-system.site/clock/current-year-and-semester",
      departments: [
        {
          "id": null,
          "name": null
        }
      ],
      selectedDepartment: null,
      selectedSubjectDivision: null,
      subjectName: null,
    };
  },
  mounted() {
    this.fetchDepartments();
  },
  methods: {
    fetchDepartments() {
      axios.get("https://course-registration-system.site/departments")
          .then(res => {
            if (res.data.code === 200) {
              this.departments = res.data.data.departments;
              this.departments.unshift({
                "id": 0,
                "name": "전체"
              });
            }
          })
          .catch(error => {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
    },
    submitFilterOptions() {
      if (this.selectedDepartment === 0) {
        this.selectedDepartment = null;
      }
      if (this.selectedSubjectDivision === 'ALL') {
        this.selectedSubjectDivision = null;
      }
      if (this.subjectName === '') {
        this.subjectName = null;
      }
      this.$emit('set-lecture-filter-options', this.selectedSubjectDivision, this.selectedDepartment, this.subjectName);
      this.subjectName = null;
    },
  }
};
</script>

<style>
.filterOptions {
  width: fit-content;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 13px;
}

.options {
  padding: 0px 10px;
}

.optionLabels {
  padding-right: 6px;
}
</style>
