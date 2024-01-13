<template>
  <Header />
  <div class="noticeContent">
    <Sidebar />
    <div id="tabs">
      <button
        v-for="(tab, index) in tabs" :key="index"
        v-bind:class="{active: currentTab === index}"
        v-on:click="currentTab = index">
        {{ tab }}
      </button>
      <div class="tabContent">
        <div
          v-for="(tabContent, index) in tabContents" :key="index"
          v-show="currentTab == index">
          {{ tabContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

export default {
  name: "WebNotice",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      currentTab: 0,
      tabs: ["시스템 유의사항", "공지사항"],
      tabContents: [
        "수강 신청 시스템 로그인 시 추가 정보로써 보안 숫자를 입력하도록 하여 매크로 사용자를 제한하는 서비스를 운영합니다. \n따라서 로그인 시 화면에 팝업되는 보안 숫자를 입력하셔야 로그인 됨을 알려드립니다...",
        "[1학기 로그인 가능 시간] 2023. 12. 4. (월) 19:00 부터 \n[장바구니 신청 기간] 2023. 12. 19. (화) 10:00 ~ 12. 20. (수) 18:00 \n[수강 신청 기간] 2023. 12. 4. (월) 19:00 부터...",
      ],
    };
  },
};
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
  transition: all .3s;
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
  min-height: inherit;
  padding: 18px 18px;
  background: #f8f9fa;
  font-size: 14px;
  white-space: pre-wrap;
}
</style>
