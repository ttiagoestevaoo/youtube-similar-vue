<template>
  <div class="d-flex justify-content-between">
    Bem vindo {{ getUser.name }}
    <p-button @click="login" v-if="!getUser.name">Login</p-button>
    <p-button @click="logout" v-else>Logout</p-button>
  </div>
</template>

<script setup lang="ts">
import { googleSdkLoaded, decodeCredential,  } from "vue3-google-login"
import { useStore } from "@providers/store";
import { SystemActionTypes } from "@providers/store/system";
import { onMounted, computed } from "vue";
import { useSession } from "@providers/hooks"

const store = useStore()
const getUser = computed(() => store.getters.getUser)
const { getToken } = useSession()

const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly"

const login = () => {
  googleSdkLoaded((google) => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    google.accounts.oauth2.initCodeClient({
      client_id: GOOGLE_CLIENT_ID,
      scope,
      callback: async (response) => {
        await store.dispatch(SystemActionTypes.AUTH_GET_TOKEN, response.code)
        await store.dispatch(SystemActionTypes.GET_USER_INFO)
      }
    }).requestCode()
  })
}

const logout = () => {
  googleSdkLoaded(async (google) => {
    google.accounts.oauth2.revoke(getToken().access_token)
    await store.dispatch(SystemActionTypes.AUTH_CLEAR_TOKEN)
  })
}

onMounted(async () => {
  await store.dispatch(SystemActionTypes.GET_USER_INFO)
})
</script>