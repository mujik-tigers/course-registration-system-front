<template>
  <div id="login">
    <img :src="require('../assets/school.png')" id="logo"/>
    <h2 class="loginTitle">수강 신청 시스템 로그인</h2>
    <form class="loginForm">
      <label for="studentNumber">학번</label>
      <input
        style="margin-bottom: 20px"
        type="text"
        id="studentNumber"
        placeholder="학번을 입력해주세요"
        v-model="loginForm.studentId"
        required
        autofocus/>
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요"
        v-model="loginForm.password"
        required/>
    <button class="loginButton" @click="login" :disabled='isNotFilled'>로그인</button>
    <span class="loginFailMessage" v-if='isNotAllowed'>로그인 정보가 유효하지 않습니다</span>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: "WebLogin",
  data() {
    return {
      loginUrl: 'http://localhost:8080/login',
      loginForm: {
        studentId: "",
        password: "",
      },
      isNotFilled: true,
      isNotAllowed: false,
    }
  },
  watch: {
    loginForm: {
      deep: true,
      handler () {
        if (!this.loginForm.studentId || !this.loginForm.password) {
          this.isNotFilled = true;
        } else {
          this.isNotFilled = false;
        }
      }
    }
  },
  methods: {
    login(event) {
      event.preventDefault();
      
      axios.post(this.loginUrl, this.loginForm)
      .then(res => {
        if (res.data.code == 201) {
          window.location = "/notice";
        }
      })
      .catch(error => {
        console.log(error.response.data);
        if (error.response.data.code == 400 || error.response.data.code == 401) {
          this.isNotAllowed = true;
        }
      })
    },
  }
};
</script>

<style>
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 700px;
}

#logo {
  align-self: center;
  width: 200px;
}

.loginTitle {
  align-self: center;
  font-weight: 550;
}

.loginForm {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px 0px;
}

.loginForm label {
  padding: 10px 4px;
  font-size: 15px;
  font-weight: 500;
}

.loginForm input {
  height: 18px;
  padding: 14px;
  border: 1.5px solid #e3e3e3;
  border-radius: 14px;
  font-size: 14px;
  transition: .5s ease-in;
}

.loginForm input:focus {
  border: 1.5px solid #8ecae6;
  outline: none;
}

.loginForm input::placeholder {
  color: #d3d3d3;
}

.loginButton {
  align-self: center;
  width: 100%;
  padding: 14px;
  margin-top: 40px;
  border: none;
  border-radius: 14px;
  background: #8ecae6;
  color: white;
  font-size: 16px;
  font-weight: 500;
  transition: all .2s ease-in;
}

.loginButton:hover {
  cursor: pointer;
  background-color: #70b5d5;
}

.loginButton:disabled {
  cursor: not-allowed;
  background-color: #b8c0c4;
}

.loginFailMessage {
  padding-top: 20px;
  position: absolute;
  left: 65px;
  top: 310px;
  color:rgb(72, 127, 153);
  font-size: 13px;
  text-align: center;
}
</style>
