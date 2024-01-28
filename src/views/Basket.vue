<template>
  <div style="padding-bottom: 40px">
    <h4 class="basketPageSubTitle">> 수강 바구니 신청 내역 - 현재 담은 학점 {{totalCredit}}</h4>
    <div style="width: 100%; max-height: 150px; overflow: auto">
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
          <td>
            <button @click="cancelLecture(value.id, index)" class="basketPageButton">취소</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h4 class="basketPageSubTitle" style="float: left">> 개설 과목 조회 / 신청</h4>
      <WebFilter></WebFilter>
    </div>
    <div style="width: 100%; height: 300px; overflow: auto">
      <table class="basketPageTable">
        <tr>
          <th v-for="(value, index) in lectureCategories" :key="index" scope="col">{{ value }}</th>
        </tr>
        <tr v-for="(value, index) in lectures" :key="index">
          <td style="width: 4%">{{ currentPage * 20 + index + 1 }}</td>
          <td style="width: 10%">{{ value.lectureNumber }}</td>
          <td style="width: 6%">{{ value.subjectDivision }}</td>
          <td style="width: 22%">{{ value.subjectName }}</td>
          <td style="width: 4%">{{ value.credits }}</td>
          <td style="width: 4%">{{ value.hoursPerWeek }}</td>
          <td style="width: 7%">{{ value.schedule }}</td>
          <td style="width: 5%">{{ value.targetGrade }}</td>
          <td style="width: 13%">{{ value.departmentName }}</td>
          <td style="width: 9%">{{ value.professorName }}</td>
          <td style="width: 6%">{{ applicants[index] }}/{{ value.totalCapacity }}</td>
          <td style="width: 6%">
            <button @click="fetchApplicants(value.id, index)" class="basketPageButton">새로고침</button>
          </td>
          <td style="width: 4%">
            <button @click="registerLecture(value.id)" class="basketPageButton">신청</button>
          </td>
        </tr>
      </table>
    </div>
    <button
        @click="fetchLectures(currentPage - 1)"
        v-show="hasPrevious"
        class="basketPageButton"
        style="float: left; margin: 10px 2px">
      이전 페이지
    </button>
    <button
        @click="fetchLectures(currentPage + 1)"
        v-show="hasNext"
        class="basketPageButton"
        style="float: right; margin: 10px 2px">
      다음 페이지
    </button>
  </div>
</template>

<script>
import WebFilter from "@/components/Filter.vue";
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "WebBasket",
  components: {
    WebFilter,
  },
  data() {
    return {
      fetchYearAndSemesterUrl: "https://course-registration-system.site/clock/current-year-and-semester",
      basketBaseUrl: "https://course-registration-system.site/baskets",
      basketCategories: ["NO.", "학년", "이수구분", "강의번호", "교과목명", "학점", "시간", "일정", "담당교수", "취소"],
      studentBasket: [],
      totalCredit: 0,
      lectureBaseUrl: "https://course-registration-system.site/lectures",
      lectureCategories: [
        "NO.",
        "강의번호",
        "이수구분",
        "교과목명",
        "학점",
        "시간",
        "일정",
        "대상학년",
        "개설학과",
        "교강사",
        "신청/정원",
        "새로고침",
        "신청",
      ],
      lectures: [],
      openingYear: null,
      semester: null,
      applicants: [],
      hasPrevious: true,
      hasNext: true,
      currentPage: 0,
    };
  },
  mounted() {
    this.fetchStudentBasket();
    this.fetchLectures(this.currentPage);
  },
  methods: {
    fetchStudentBasket() {
      if (this.studentBasket.length === 0) {
        axios.get(this.basketBaseUrl).then((res) => {
          if (res.data.code == 200) {
            this.studentBasket = res.data.data.baskets;

            this.totalCredit = 0;
            this.studentBasket.forEach(basket => {
              this.totalCredit += basket.credits;
            });
          }
        });
      }
    },
    async fetchLectures(pageNumber) {
      if (this.openingYear === null || this.semester === null) {
        await this.fetchCurrentYearAndSemester();
      }
      axios.get(this.lectureBaseUrl, {
        params: {openingYear: this.openingYear, semester: this.semester, page: pageNumber},
      })
          .then((res) => {
            if (res.data.code == 200) {
              this.lectures = res.data.data.lectures;
              this.applicants = Array.from({length: this.lectures.length}, () => null);
              this.currentPage = res.data.data.number;
              this.hasPrevious = !res.data.data.first;
              this.hasNext = !res.data.data.last;
            }
          });
    },
    cancelLecture(basketId, index) {
      axios.delete(this.basketBaseUrl + "/" + basketId)
          .then((res) => {
            if (res.data.code == 200) {
              this.totalCredit -= this.studentBasket[index].credits;
              this.studentBasket.splice(index, 1);
            }
          })
          .catch((error) => {
            if (error.response && error.response.data.code == 400) {
              alert(error.response.data.message);
            }
          });
    },
    fetchApplicants(lectureId, index) {
      axios.get(this.lectureBaseUrl + "/" + lectureId + "/basket-count")
          .then((res) => {
            if (res.data.code == 200) {
              this.applicants[index] = res.data.data.currentBasketStoringCount;
            }
          })
          .catch((error) => {
            if (error.response && error.response.data.code == 400) {
              alert(error.response.data.message);
            }
          });
    },
    async fetchCurrentYearAndSemester() {
      await axios.get(this.fetchYearAndSemesterUrl)
          .then((res) => {
            if (res.data.code == 200) {
              this.openingYear = res.data.data.year;
              this.semester = res.data.data.semester;
            }
          })
          .catch((error) => {
            if (error.response && error.response.data.code == 400) {
              alert(error.response.data.message);
            }
          });
    },
    registerLecture(lectureId) {
       axios.post(this.basketBaseUrl + "/" + lectureId)
          .then((res) => {
            if (res.data.code === 200) {
              window.location = '/basket';
            }
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
    },
  },
};
</script>

<style>
.basketPageSubTitle {
  width: fit-content;
  font-size: 15px;
  font-weight: 550;
}

.basketPageTable {
  width: 1200px;
  text-align: center;
  font-size: 13px;
}

.basketPageTable,
.basketPageTable th,
.basketPageTable td {
  border: 1px solid #e4e6e9;
  border-collapse: collapse;
}

.basketPageTable th {
  position: sticky;
  top: -1px;
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
</style>
