<template>
  <div class="header">
    <img :src="require('../assets/school.png')" id="logoSmall"/>
    <span class="logo">수강 신청 시스템</span>
    <div class="navbar">
      <router-link :to="nav.href" v-for="nav in navbar" :key="nav.href" class="navLink">
        {{ nav.name }}
      </router-link>
    </div>
    <Clock />
    <button id="logoutButton" @click="logout">로그아웃</button>
  </div>
</template>

<script>
import Clock from '@/components/Clock.vue';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: "WebHeader",
  components: {
    Clock,
  },
  data() {
    return {
      navbar: [
        {
          name: '공지사항',
          href: '/notice'
        },
        {
          name: '수강 바구니 신청',
          href: '/basket'
        },
        {
          name: '수강 신청',
          href: '/enrollment'
        },
        {
          name: '시간표 조회',
          href: '/schedule'
        }
      ],
      logoutUrl: 'https://course-registration-system.site/logout'
    }
  },
  methods: {
    logout() {
      axios.delete(this.logoutUrl)
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          window.location = "/";
        }
      })
    }
  }
};
</script>

<style>
#logoSmall {
  width: 60px;
  padding: 0px 10px 10px 10px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  height: 40px;
  white-space: nowrap;
}

.navbar {
  display: flex;
  padding-left: 100px;
}

.logo {
  font-size: 20px;
  font-weight: 600;
}

.navLink {
  padding: 30px;
  color: inherit;
  font-weight: 500;
  text-decoration: none;
}

.navLink:hover {
  font-weight: 550;
}

.router-link-active {
  text-decoration: solid underline #70b5d5 2px;
  text-underline-offset: 10px;
}

#logoutButton {
  border: none;
  border-radius: 8px;
  padding: 8px 10px 8px 10px;
  margin-left: 20px;
  font-size: 11px;
  font-weight: 450;
  transition: all ease-out 0.2s;
}

#logoutButton:hover {
  cursor: pointer;
  background: #70b5d5;
  color: white;
}
</style>
