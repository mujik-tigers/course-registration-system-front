<template>
  <div class="noticeContent">
    <Sidebar />
    <NoticeContent />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import NoticeContent from '@/components/NoticeContent.vue';

export default {
  name: "WebNotice",
  components: {
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
