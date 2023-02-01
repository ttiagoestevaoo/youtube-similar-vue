<template>
  <div>
    <div class="bc-home">
      <div class="bc-home__main">
        <p-card class="bc-home__main__main-card">
          <template #header>
            <p class="bc-section-title">Vídeos em alta no Brasil</p>
          </template>

          <template #content>
            <div class="d-flex gap-2">
              <div class="bc-home__main-video">
                <template v-if="getVideosList.length > 0">
                  <img :src="getVideosList[0].thumbnails.maxres.url" />
                  <p class="bc-home__main-video__channel">
                    {{ getVideosList[0].channelTitle }}
                  </p>
                  <p class="bc-home__main-video__tittle">
                    {{ getVideosList[0].title }}
                  </p>
                </template>
              </div>
              <div class="gap-4">
                <HomeVideoCard
                  v-for="(video, index) in getVideosList.filter(
                    (value, indexFilter) => indexFilter > 0
                  )"
                  :key="index"
                  :video="video"
                  class="mb-2"
                />
              </div>
            </div>
          </template>
        </p-card>
      </div>
      <div class="bc-home__secondary">
        <p-card class="mt-5">
          <template #header>
            <p class="bc-section-title">
              Vídeos em alta de tecnologia no Brasil
            </p>
          </template>

          <template #content>
            <div class="d-flex gap-4 flex-wrap">
              <HomeVideoCard
                v-for="(video, index) in getTecnologyPageVideos"
                :video="video"
                :key="index"
              />
            </div>
          </template>
        </p-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeVideoCard from "@ui/components/HomeVideoCard.vue";
import { useStore } from "@providers/store";
import { SystemActionTypes } from "@providers/store/system";
import { computed, onMounted } from "vue";

const store = useStore();
const getVideosList = computed(() => store.getters.getHomePageVideos);
const getTecnologyPageVideos = computed(
  () => store.getters.getTecnologyPageVideos
);

onMounted(async () => {
  await Promise.all([
    store.dispatch(SystemActionTypes.GET_HOME_PAGE_VIDEOS),
    store.dispatch(SystemActionTypes.GET_TECNOLOGY_PAGE_VIDEOS),
  ]);
});
</script>

<style scoped lang="scss">
.bc-home {
  background-color: var(--secondary-color-light);

  &__main-video {
    &__channel {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 22px;
    }

    &__title {
      font-size: 18px;
    }
  }
}
</style>
