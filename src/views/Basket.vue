<template>
  <div style="padding-bottom: 40px;">
    <h4 class="basketPageSubTitle">> 수강 바구니 신청 내역</h4>
    <table class="basketPageTable">
      <tr>
        <th v-for="(value, index) in basketCategories" :key="index" scope="col">{{ value }}</th>
      </tr>
      <tr v-for="(value, index) in studentBasket" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ value.targetGrade }}</td>
        <td>{{ value.subjectDivision }}</td>
        <td>{{ value.lectureNumber }}</td>
        <td>{{ value.subjectName }}</td>
        <td>{{ value.credits }}</td>
        <td>{{ value.hoursPerWeek }}</td>
        <td>{{ value.schedule }}</td>
        <td>{{ value.professorName }}</td>
        <td><button class="basketPageButton">취소</button></td>
      </tr>
    </table>
  </div>
  <div>
    <h4 class="basketPageSubTitle">> 개설 과목 조회 / 신청</h4>
    <table class="basketPageTable">
      <tr>
        <th v-for="(value, index) in lectureCategories" :key="index" scope="col">{{ value }}</th>
      </tr>
      <tr v-for="(value, index) in lectures" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ value.lectureNumber }}</td>
        <td>{{ value.subjectDivision }}</td>
        <td>{{ value.subjectName }}</td>
        <td>{{ value.credits }}</td>
        <td>{{ value.hoursPerWeek }}</td>
        <td>{{ value.schedule }}</td>
        <td>{{ value.targetGrade }}</td>
        <td>{{ value.departmentName }}</td>
        <td>{{ value.professorName }}</td>
        <td>{{ value.applicants }}/{{ value.totalCapacity }}</td>
        <td><button class="basketPageButton">새로고침</button></td>
      </tr>
    </table>
    <div class="pagenation">
      <button class="basketPageButton">이전</button>
      <button class="basketPageButton">다음</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: "WebBasket",
  data() {
    return {
      fetchStudentBasketUrl: "https://course-registration-system.site/baskets",
      basketCategories: ["NO.", "학년", "이수구분", "강의번호", "교과목명", "학점", "시간", "일정", "담당교수", "취소"],
      studentBasket: [],
      fetchLecturesUrl: "https://course-registration-system.site/lectures",
      lectureCategories: ["NO.", "강의번호", "이수구분", "교과목명", "학점", "시간", "일정", "대상학년", "개설학과", "교강사", "신청/정원", "새로고침"],
      lectures: [],
      openingYear: 2024,
      semester: 'FIRST',
    };
  },
  mounted() {
    this.fetchStudentBasket();
    this.fetchLecutures();
  },
  methods: {
    fetchStudentBasket() {
      if (this.studentBasket.length === 0) {
        axios.get(this.fetchStudentBasketUrl)
        .then(res => {
          if (res.data.code == 200) {
            this.studentBasket = res.data.data.baskets
          }
        })
        .catch(error => {
            if (error.response && error.response.data.code == 401) {
              alert('세션이 만료되어 로그아웃되었습니다');
              window.location = '/';
            }
          }
        )
      }
    },
    fetchLecutures() {
      if (this.lectures.length === 0) {
        axios.get(this.fetchLecturesUrl, {params:{openingYear: this.openingYear, semester: this.semester}})
        .then(res => {
          if (res.data.code == 200) {
            this.lectures = res.data.data.lectures;
          }
        })
        .catch(error => {
            if (error.response && error.response.data.code == 401) {
              alert('세션이 만료되어 로그아웃되었습니다');
              window.location = '/';
            }
          }
        )
      }
    },
  }
}
</script>

<style>
.basketPageSubTitle {
  font-size: 15px;
  font-weight: 550;
}

.basketPageTable {
  width: 1000px;
  text-align: center;
  font-size: 13px;
}

.basketPageTable, .basketPageTable th, .basketPageTable td {
  border: 1px solid #e4e6e9;
  border-collapse: collapse;
}

.basketPageTable th {
  font-weight: 550;
  background: #f1f6f8;
}

.basketPageTable tr {
  height: 36px;
}

.basketPageButton {
  border: none;
  border-radius: 8px;
  padding: 6px 9px 6px 9px;
  font-size: 11px;
  font-weight: 450;
  transition: all ease-out 0.2s;
}

.basketPageButton:hover {
  cursor: pointer;
  background: #70b5d5;
  color: white;
}

.pagenation {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
}
</style>