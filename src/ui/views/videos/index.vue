<template>
  <div>
    <div class="bc-videos">
      <SearchVideoCard
        v-for="(video, index) in getVideosList"
        :key="index"
        :video="video"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchVideoCard from "@ui/components/SearchVideoCard.vue";
import { useStore } from "@providers/store";
import { SystemActionTypes } from "@providers/store/system";
import { computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const getVideosList = computed(() => store.getters.getVideosList);

const searchVideos = async () => {
  const search = router.currentRoute.value.query.search
    ? router.currentRoute.value.query.search.toString()
    : "";
  await store.dispatch(SystemActionTypes.GET_VIDEOS_LIST, search);
};

onMounted(async () => {
  await searchVideos();
});

watch(router.currentRoute, async () => {
  await searchVideos();
});
</script>

<style scoped lang="scss">
.bc-videos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
