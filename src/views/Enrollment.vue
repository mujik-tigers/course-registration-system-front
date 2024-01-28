<template>
  <div style="padding-bottom: 50px">
    <h4 class="enrollmentPageSubTitle">{{ openingYear }}년도 {{ semesterView }}학기 수강 신청 내역 - 현재 담은 학점 {{ totalCredit }}</h4>
    <div style="width: 100%; max-height: 200px; overflow: auto">
      <table class="enrollPageTable">
        <thead>
        <tr>
          <th v-for="(value, index) in basketCategories" :key="index" scope="col">{{ value }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, index) in enrolledLectures" :key="index">
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
            <button @click="cancelLecture(value.id, index)" class="enrollPageButton">취소</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div id="enrollTabs">
    <button
        class="enrollTab"
        v-for="(tab, index) in tabs"
        :key="index"
        v-bind:class="{ active: currentTab === index }"
        v-on:click="currentTab = index">
      {{ tab }}
    </button>
    <div
        style="float: right; width: fit-content; display: flex; align-items: flex-end; justify-content: center"
        v-if="currentTab == 1">
      <WebFilter/>
      <form class="filterOptions" style="padding-left: 20px" @submit.prevent="registerLectureByNumber(lectureNumber)">
        <label class="optionLabels" for="fastEnroll">빠른 수강 신청</label>
        <input id="fastEnroll" placeholder="강의번호" type="text" style="width: 70px" v-model.trim="lectureNumber"/>
        <button class="enrollPageButton" style="margin: 0px 10px" @click.stop>신청</button>
      </form>
    </div>
    <div class="enrollTabContent">
      <div v-show="currentTab == 0">
        <div style="width: 100%; max-height: 300px; overflow: auto">
          <table class="enrollPageTable">
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
                <button class="enrollPageButton" @click="registerLectureByNumber(value.lectureNumber)">신청</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-show="currentTab == 1">
        <div>
          <div style="width: 100%; height: 300px; overflow: auto">
            <table class="enrollPageTable">
              <tr>
                <th v-for="(value, index) in lectureCategories" :key="index" scope="col">
                  {{ value }}
                </th>
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
                  <button @click="fetchApplicants(value.id, index)" class="enrollPageButton">새로고침</button>
                </td>
                <td style="width: 4%">
                  <button class="enrollPageButton" @click="registerLecture(value.id)">신청</button>
                </td>
              </tr>
            </table>
          </div>
          <button
              @click="fetchLectures(currentPage - 1)"
              v-show="hasPrevious"
              class="enrollPageButton"
              style="float: left; margin: 10px 2px">
            이전 페이지
          </button>
          <button
              @click="fetchLectures(currentPage + 1)"
              v-show="hasNext"
              class="enrollPageButton"
              style="float: right; margin: 10px 2px">
            다음 페이지
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebFilter from "@/components/Filter.vue";
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "WeEnrollment",
  components: {
    WebFilter,
  },
  data() {
    return {
      currentTab: 0,
      tabs: ["나의 수강 바구니", "개설 과목 조회 / 신청"],
      fetchYearAndSemesterUrl: "https://course-registration-system.site/clock/current-year-and-semester",
      basketBaseUrl: "https://course-registration-system.site/baskets",
      basketCategories: ["NO.", "학년", "이수구분", "강의번호", "교과목명", "학점", "시간", "일정", "담당교수", "신청"],
      studentBasket: [],
      enrollmentBaseUrl: "https://course-registration-system.site/enrollments",
      enrolledLectures: [],
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
      semesterView: null,
      applicants: [],
      hasPrevious: true,
      hasNext: true,
      currentPage: 0,
      totalCredit: 0,
      lectureNumber: null
    };
  },
  mounted() {
    this.fetchStudentBasket();
    this.fetchStudentEnrollment();
    this.fetchLectures(this.currentPage);
  },
  methods: {
    fetchStudentEnrollment() {
      axios.get(this.enrollmentBaseUrl).then((res) => {
        if (res.data.code == 200) {
          this.enrolledLectures = res.data.data.enrolledLectures;

          this.totalCredit = 0;
          this.enrolledLectures.forEach(lecture => {
            this.totalCredit += lecture.credits;
          });
        }
      });
    },
    fetchStudentBasket() {
      if (this.studentBasket.length === 0) {
        axios.get(this.basketBaseUrl).then((res) => {
          if (res.data.code == 200) {
            this.studentBasket = res.data.data.baskets;
          }
        });
      }
    },
    async fetchLectures(pageNumber) {
      if (this.openingYear === null || this.semester === null) {
        await this.fetchCurrentYearAndSemester();
      }
      axios
          .get(this.lectureBaseUrl, {
            params: {
              openingYear: this.openingYear,
              semester: this.semester,
              page: pageNumber,
            },
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
    fetchApplicants(lectureId, index) {
      axios
          .get(this.enrollmentBaseUrl + "/" + lectureId + "/enrollment-count")
          .then((res) => {
            if (res.data.code == 200) {
              this.applicants[index] = res.data.data.currentEnrollmentCount;
            }
          })
          .catch((error) => {
            if (error.response && error.response.data.code == 400) {
              alert(error.response.data.message);
            }
          });
    },
    async fetchCurrentYearAndSemester() {
      await axios
          .get(this.fetchYearAndSemesterUrl)
          .then((res) => {
            if (res.data.code == 200) {
              this.openingYear = res.data.data.year;
              this.semester = res.data.data.semester;
              if (this.semester == "FIRST") {
                this.semesterView = 1;
              } else {
                this.semesterView = 2;
              }
            }
          })
          .catch((error) => {
            if (error.response && error.response.data.code == 400) {
              alert(error.response.data.message);
            }
          });
    },
    registerLecture(lectureId) {
      axios.post(this.enrollmentBaseUrl + "/" + lectureId)
          .then((res) => {
            if (res.data.code == 201) {
              this.fetchStudentEnrollment();
            }
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
    },
    registerLectureByNumber(lectureNumber) {
      axios.post(this.enrollmentBaseUrl + "/fast/" + lectureNumber)
          .then((res) => {
            if (res.data.code == 201) {
              this.fetchStudentEnrollment();
            }
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      this.lectureNumber = null;
    },
    cancelLecture(enrollmentId, index) {
      axios.delete(this.enrollmentBaseUrl + "/" + enrollmentId)
          .then((res) => {
            if (res.data.code == 200) {
              this.totalCredit -= this.enrolledLectures[index].credits;
              this.enrolledLectures.splice(index, 1);
            }
          })
          .catch((error) => {
            if (error.response && error.response.data.code == 400) {
              alert(error.response.data.message);
            }
          });
    },
  },
};
</script>

<style>
.enrollmentPageSubTitle {
  font-size: 15px;
  font-weight: 550;
}

#enrollTabs {
  width: 100%;
}

.enrollTab {
  float: left;
  padding: 10px 24px;
  border: none;
  border-radius: 8px 8px 0px 0px;
  transition: all 0.3s;
}

.enrollTab:hover {
  cursor: pointer;
  background: #e3e3e3;
  color: rgb(54, 54, 54);
}

.enrollTabContent {
  width: 100%;
}

.enrollPageTable {
  width: 1200px;
  text-align: center;
  font-size: 13px;
}

.enrollPageTable,
.enrollPageTable th,
.enrollPageTable td {
  border: 1px solid #e4e6e9;
  border-collapse: collapse;
}

.enrollPageTable th {
  position: sticky;
  top: -1px;
  font-weight: 550;
  background: #f1f6f8;
}

.enrollPageTable tr {
  height: 36px;
}

.enrollPageButton {
  border: none;
  border-radius: 8px;
  padding: 6px 9px 6px 9px;
  font-size: 11px;
  font-weight: 450;
  transition: all ease-out 0.2s;
}

.enrollPageButton:hover {
  cursor: pointer;
  background: #70b5d5;
  color: white;
}

.filterOptions input,
.filterOptions select {
  border: 1px solid #e3e3e3;
  border-radius: 6px;
  padding: 4px 4px;
  transition: all 0.3s ease-out;
}

.filterOptions input:focus,
.filterOptions select:focus {
  border: 1px solid #8ecae6;
  outline: none;
}

.filterOptions input::placeholder {
  color: #d3d3d3;
}
</style>
