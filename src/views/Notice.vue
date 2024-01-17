<template>
  <Header />
  <div class="noticeContent">
    <Sidebar />
    <NoticeContent />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import NoticeContent from '@/components/layout/NoticeContent.vue';

export default {
  name: "WebNotice",
  components: {
    Header,
    Sidebar,
    NoticeContent
  },
};
</script>

<style>
.noticeContent {
  display: flex;
  justify-content: space-between;
}
</style>
