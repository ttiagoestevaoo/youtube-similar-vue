<template>
  <div>
    <div class="col-12 mb-3">
      <p-button label="Enviar vídeo" @click="displayAddVideo = true" />
    </div>
    <p-dialog
      :visible="displayAddVideo"
      modal
      position="center"
      :closable="false"
    >
      <h4>Enviar novo vídeo</h4>

      <div class="d-flex flex-column gap-3 mt-4">
        <div class="d-flex flex-column">
          <label for="">Titulo</label>
          <p-input-text v-model="uploadVideo.title" :disabled="isLoading" />
        </div>
        <div class="d-flex flex-column">
          <label for="">Descrição</label>
          <p-input-text
            v-model="uploadVideo.description"
            :disabled="isLoading"
          />
        </div>
        <div>
          <p-file-upload
            mode="basic"
            accept="video/*"
            class="w-100 ts-guarantee__additional-data__modal__fileupload"
            @uploader="onUploadAddiotionalData($event)"
            custom-upload
            auto
            chooseLabel="Selecionar video"
            :disabled="isLoading"
          />
        </div>
        <div class="d-flex gap-2">
          <p-button
            label="Cancelar"
            class="p-button-danger w-50"
            @click="displayAddVideo = false"
          />
          <p-button label="Enviar" @click="sendVideo" class="w-50" />
        </div>
      </div>
    </p-dialog>
    <div class="bc-videos">
      <SearchVideoCard
        v-for="(video, index) in getMyVideosList"
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
import { computed, onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";

const store = useStore();
const toast = useToast();

const getMyVideosList = computed(() => store.getters.getMyVideosList);

const displayAddVideo = ref(false);
const isLoading = ref(false);

const uploadVideo = ref({
  title: "",
  description: "",
  media: "",
});

onMounted(async () => {
  await store.dispatch(SystemActionTypes.GET_MY_VIDEOS_LIST);
});

const onUploadAddiotionalData = async (event: any) => {
  try {
    uploadVideo.value.media = event.files[0];
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Criação",
      detail: "Não foi possível adicionar esse(s) arquivo(s), tente novamente",
      life: 3000,
    });
  }
};

const sendVideo = async () => {
  try {
    isLoading.value = true;
    await store.dispatch(SystemActionTypes.CREATE_VIDEO, uploadVideo.value);
    toast.add({
      severity: "success",
      summary: "Criação",
      detail: "Vídeo adicionado com sucesso",
      life: 3000,
    });
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    toast.add({
      severity: "error",
      summary: "Criação",
      detail:
        "Não foi possível adicionar esse vídeo, altere os dados e tente novamente",
      life: 3000,
    });
  }
};
</script>

<style scoped lang="scss">
.bc-videos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
