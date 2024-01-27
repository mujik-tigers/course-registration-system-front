<template>
  <div class="noticeContent">
    <div id="tabs">
      <button
          v-for="(tab, index) in tabs"
          :key="index"
          v-bind:class="{ active: currentTab === index }"
          v-on:click="currentTab = index">
        {{ tab }}
      </button>
      <div class="tabContent">
        <div v-show="currentTab == 0">
          <h4 style="font-size: 13px; margin-top: 10px">학부 수강 신청 전용 시스템으로 대상자만 접속할 수 있습니다!</h4>

          <h4 class="noticeTitle">> 매크로 프로그램 방지</h4>
          <p>타인에게 피해를 주는 <span class="textBold">매크로 사용을 금지</span>합니다.</p>
          <p>수강 신청 시스템 로그인 시 추가 정보로써 <span class="textBold">보안 숫자</span>를 입력하도록 하여 매크로
            사용자를 제한하는 서비스를 운영합니다.</p>
          <p>따라서 로그인 시 화면에 팝업되는 보안 숫자를 입력하셔야 로그인 됨을 알려드립니다.</p>
          <p>또한 저장을 <span class="textBold">50회 이상</span> 시도하면 화면에 나타나는 보안 숫자를 입력해야 계속 사용할 수 있습니다.</p>
          <p class="textBold">실제 매크로를 사용하지 않더라도 지속적으로 저장 버튼을 클릭하면 매크로 사용으로 탐지될 수 있으니 유의하시기 바랍니다.</p>

          <h4 class="noticeTitle">> 멀티 로그인 방지</h4>
          <p>중복 로그인 및 멀티 탭을 중복하여 사용할 수 없습니다.</p>

          <h4 class="noticeTitle">> 팝업 차단 해제</h4>
          <p>팝업 차단 설정이 해제되지 않았을 경우 차단을 해제해 주세요.</p>
          <p>브라우저에서 '도구 → 인터넷 옵션 → 팝업 차단 설정 → 현재 사이트의 팝업을 항상 허용' 선택</p>

          <h4 class="noticeTitle">> 브라우저</h4>
          <p>크롬, 사파리 브라우저에 최적화되어 있습니다.</p>
        </div>
        <div v-show="currentTab == 1">
          <!--          <h4 style="font-size: 13px; margin-top: 10px">-->
          <!--            > 수강 신청 시스템 로그인 가능 시간-->
          <!--          </h4>-->
          <!--          <p>2023. 12. 4. (월) 19:00 부터</p>-->
          <h4 class="noticeTitle">> 장바구니 신청 시간</h4>
          <p>{{ basketRegistrationPeriod.startTime }} ~ {{ basketRegistrationPeriod.endTime }}</p>
          <!--          <h4 class="noticeTitle">> 장바구니 우선 신청 결과 확인</h4>-->
          <!--          <p>2023. 12. 19. (화) 10:00 ~ 12. 20. (수) 18:00</p>-->
          <h4 class="noticeTitle">> 본 수강 신청 기간</h4>
          <p>1학년 : {{ enrollmentRegistrationPeriods["FRESHMAN"].startTime }} ~ {{ enrollmentRegistrationPeriods["FRESHMAN"].endTime }}</p>
          <p>2학년 : {{ enrollmentRegistrationPeriods["SOPHOMORE"].startTime }} ~ {{ enrollmentRegistrationPeriods["SOPHOMORE"].endTime }}</p>
          <p>3학년 : {{ enrollmentRegistrationPeriods["JUNIOR"].startTime }} ~ {{ enrollmentRegistrationPeriods["JUNIOR"].endTime }}</p>
          <p>4학년 : {{ enrollmentRegistrationPeriods["SENIOR"].startTime }} ~ {{ enrollmentRegistrationPeriods["SENIOR"].endTime }}</p>
          <!--          <h4 class="noticeTitle">> 수강 신청 확인 및 정정 기간</h4>-->
          <!--          <p>2024. 2. 26.(월) 10:00 ~ 3. 4.(월) 23:00</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WebNoticeContent",
  data() {
    return {
      currentTab: 0,
      tabs: ["시스템 유의사항", "일정 안내"],
      basketRegistrationPeriod: {
        startTime: null,
        endTime: null
      },
      enrollmentRegistrationPeriods: {
        "FRESHMAN": {
          grade: null,
          startTime: null,
          endTime: null
        },
        "SOPHOMORE": {
          grade: null,
          startTime: null,
          endTime: null
        },
        "JUNIOR": {
          grade: null,
          startTime: null,
          endTime: null
        },
        "SENIOR": {
          grade: null,
          startTime: null,
          endTime: null
        }
      }
    };
  },
  mounted() {
    this.fetchBasketRegistrationPeriod();
    this.fetchEnrollmentRegistrationPeriods();
  },
  methods: {
    fetchBasketRegistrationPeriod() {
      axios.get("https://course-registration-system.site/registration-period/baskets")
          .then((res) => {
            if (res.data.code === 200) {
              this.basketRegistrationPeriod.startTime = this.ISODateTimeToKoreanDateTime(res.data.data.startTime);
              this.basketRegistrationPeriod.endTime = this.ISODateTimeToKoreanDateTime(res.data.data.endTime);
            }
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
    },
    fetchEnrollmentRegistrationPeriods() {
      axios.get("https://course-registration-system.site/registration-period/enrollments")
          .then((res) => {
            if (res.data.code === 200) {
              const periods = res.data.data.enrollmentRegistrationPeriods;
              periods.forEach(period => {
                this.enrollmentRegistrationPeriods[period.targetGrade].startTime = this.ISODateTimeToKoreanDateTime(period.startTime);
                this.enrollmentRegistrationPeriods[period.targetGrade].endTime = this.ISODateTimeToKoreanDateTime(period.endTime);
              });
            }
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
    },
    ISODateTimeToKoreanDateTime(isoDateTimeString) {
      return new Date(isoDateTimeString).toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });
    }
  }
}
;
</script>

<style>
.noticeContent {
  display: flex;
  justify-content: space-between;
}

#tabs {
  width: 800px;
  min-height: 400px;
  padding: 10px;
}

#tabs button {
  padding: 10px 24px;
  border: none;
  border-radius: 8px 8px 0px 0px;
  transition: all 0.3s;
}

#tabs button:hover {
  cursor: pointer;
  background: #e3e3e3;
  color: rgb(54, 54, 54);
}

.active {
  background: #8ecae6;
  color: white;
  font-weight: 500;
}

button {
  margin: 0.2px;
  color: rgb(54, 54, 54);
}

.tabContent {
  min-width: 500px;
  min-height: inherit;
  padding: 18px 22px;
  background: #f8f9fa;
  font-size: 13px;
  white-space: pre-wrap;
}

.tabContent p {
  margin: 0px 0px 10px 0px;
}

.noticeTitle {
  margin-top: 40px;
  font-size: 13px;
}

.textBold {
  color: #3c81a1;
  font-weight: 500;
}

.tabContent h4 {
  font-weight: 550;
}
</style>
