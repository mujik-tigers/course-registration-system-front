<template>
  <div class="sessionClock">
    <span class="clock">{{ sessionView }}</span>
    <button class="renewButton" @click="renewSession">연장하기</button>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: "SessionClock",
  data() {
    return {
      fetchSessionTimeUrl: 'https://course-registration-system.site/clock/session',
      sessionSecond: null,
      sessionTimer: null,
      sessionView: "60:00",
      renewSessionUrl: 'https://course-registration-system.site/session',
    };
  },
  mounted() {
    this.fetchSessionRemainingTime();

    if (this.sessionTimer == null) {
      this.sessionTimer = this.timerUpdate();
    }
  },
  methods: {
    fetchSessionRemainingTime() {
      axios.get(this.fetchSessionTimeUrl)
        .then(res => {
          if (res.data.code == 200) {
            this.sessionSecond = res.data.data.sessionRemainingTime;
          }
        })
        .catch(error => {
            if (error.response && error.response.data.code == 401) {
              alert('세션이 만료되어 로그아웃되었습니다');
              window.location = '/';
            }
          }
        )
    },
    timerUpdate() {
      const interval = setInterval(() => {
        this.sessionSecond--;
        this.sessionView = this.generateView();

        if (this.sessionSecond <= 0) {
          clearInterval(this.sessionTimer);
          this.sessionSecond = 0;
          this.sessionView = "00:00";
          alert('세션이 만료되어 로그아웃되었습니다');
          window.location = '/';
        }
      }, 1000);

      return interval;
    },
    generateView() {
      let minute = Math.floor(this.sessionSecond / 60);
      let second = Math.floor(this.sessionSecond % 60 );

      return this.sessionView = minute.toString().padStart(2, '0')
        + ":"
        + second.toString().padStart(2, '0');
    },
    renewSession() {
      axios.post(this.renewSessionUrl)
        .then(res => {
          if (res.data.code == 201) {
            this.sessionSecond = res.data.data.sessionRemainingTime;
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
  }
};
</script>

<style>
.sessionClock {
  display: flex;
  justify-items: center;
  padding: 0px 10px 0px 40px;
}

.clock {
  width: 44px;
  height: 20px;
  padding: 6px 5px 0px 2px;
  border: 1px solid #edf0f2;
  border-right: none;
  border-radius: 20px 0px 0px 20px;
  background: #f1f3f6;
  font-size: 13px;
  font-weight: 500;
  text-align: right;
}

.renewButton {
  width: 50px;
  height: 28px;
  padding: 2px 5px 2px 2px;
  border: none;
  border-radius: 0px 20px 20px 0px;
  background: #70b5d5;
  color: white;
  font-size: 10.5px;
  font-weight: 400;
  transition: all ease-out 0.3s;
}

.renewButton:hover {
  cursor: pointer;
  background: #5fa3c3;
  color: white;
}
</style>
