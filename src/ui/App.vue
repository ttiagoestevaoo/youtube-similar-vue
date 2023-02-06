<template>
  <div class="bc-app p-5">
    <Header />
    <div class="bc-header">
      <div class="bc-header__title">
        <router-link :to="{ name: 'home' }">
          <h3>Youtube</h3>
        </router-link>
        <span>Compartilhe o que há de melhor</span>
      </div>

      <div class="d-flex gap-2 align-items-center" v-if="hasToShowSearch">
        <SearchInput v-model="search" />
        <p-button label="Buscar" :disabled="!search" @click="searchVideos" />
      </div>
      <router-link :to="{ name: 'my-videos' }">
        <p>Meus vídeos</p>
      </router-link>
    </div>
    <router-view> </router-view>
    <p-toast></p-toast>
  </div>
</template>

<script setup lang="ts">
import SearchInput from "@ui/components/SearchInput.vue";
import Header from "@ui/components/Header.vue";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.css";
import "primeicons/primeicons.css";
import { computed, onMounted, ref } from "vue";
import { useStore } from "@providers/store";
import { SystemMutationTypes } from "@providers/store/system";
import { useRouter } from "vue-router";
import { getHistoryLocalStorage } from "@providers/mixins";

const store = useStore();
const router = useRouter();

const search = ref("");

const searchVideos = async () => {
  router.push({ query: { search: search.value }, name: "videos", force: true });
};

onMounted(async () => {
  store.commit(
    SystemMutationTypes.SET_HISTORY_SEARCH,
    getHistoryLocalStorage()
  );
});

const hasToShowSearch = computed(
  () => router.currentRoute.value.name !== "my-videos"
);
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";

.bc-app {
  background-color: var(--secondary-color-light);
}

.bc-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-bottom: 16px;
  margin-bottom: 32px;
  align-items: center;

  &__title {
    font-weight: bold;

    a {
      text-decoration: none;
    }

    h3 {
      color: var(--primary-color);
    }

    span {
      color: var(--secondary-color);
    }
  }
}
</style>
