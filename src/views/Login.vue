<template>
  <div id="login">
    <img :src="require('../assets/school.png')" id="logo"/>
    <h2 class="loginTitle">수강 신청 시스템 로그인</h2>
    <div class="loginForm">
      <label for="studentNumber">학번</label>
      <input
        style="margin-bottom: 20px"
        type="text"
        id="studentNumber"
        placeholder="학번을 입력해주세요"
        required
        autofocus/>
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요"
        required/>
    </div>
    <button class="loginButton">로그인</button>
  </div>
</template>

<script>
export default {
  name: "WebLogin",
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
  margin-top: 20px;
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
</style>
