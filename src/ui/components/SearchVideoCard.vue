<template>
  <Card class="bc-video-card">
    <template #content>
      <div class="d-flex gap-2">
        <img :src="video.thumbnails.medium.url" alt="Video thumbnail" />
        <div class="bc-video-card__description">
          <p class="bc-video-card__description__channel">
            {{ video.channelTitle }}
          </p>
          <p class="bc-video-card__description__title">{{ video.title }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { VideoSearch } from "@modules/google";
import { PropType } from "vue";

defineProps({
  video: {
    type: Object as PropType<VideoSearch>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.bc-video-card {
  flex: 1 0 45%;
  gap: 8px;
  
  img {
    object-fit: contain;
    width: 320px;
    height: 180px;
  }

  &__description {
    &__channel {
      font-weight: bold;
    }
  }
}
</style>