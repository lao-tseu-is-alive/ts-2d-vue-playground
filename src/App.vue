<script setup lang="ts">
import World from './components/World.vue'
import {APP, BUILD_DATE, getLog, VERSION} from "@/config.ts";
import {onMounted} from "vue";

const log = getLog(APP, 4, 2)
onMounted(() => {
   log.t(`Main App.vue ${APP}-${VERSION}, du ${BUILD_DATE}`)
})

</script>

<template>
  <header>
    <div class="wrapper">
      <World msg="You did it!" />
    </div>
  </header>

  <main></main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
