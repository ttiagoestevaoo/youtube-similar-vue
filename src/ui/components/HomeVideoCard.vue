<template>
  <div class="bc-video-card">
    <img :src="video.thumbnails.medium.url" alt="Video thumbnail" />
    <div class="bc-video-card__description">
      <p class="bc-video-card__description__channel">
        {{ video.channelTitle }}
      </p>
      <p class="bc-video-card__description__title">{{ video.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VideoList } from "@modules/google";
import { PropType } from "vue";

defineProps({
  video: {
    type: Object as PropType<VideoList>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.bc-video-card {
  flex: 1 0 30%;
  display: flex;
  gap: 8px;
  align-items: start;

  img {
    object-fit: contain;
  }

  &__description {
    &__channel {
      font-weight: bold;
    }
  }
}
</style>