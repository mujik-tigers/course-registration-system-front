<template>
  <WebHeader v-if="$route.path !== '/'" />
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import WebHeader from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    WebHeader,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #413f3f;
}

html {
  overflow-y: scroll;
}
</style>
