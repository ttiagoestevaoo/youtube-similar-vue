<template>
  <p-auto-complete
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :suggestions="filteredSuggestions"
    @complete="searchHistory($event)"
    :auto-option-focus="false"
  />
</template>

<script setup lang="ts">
import { useStore } from "@providers/store";
import { computed, ref } from "vue";

const store = useStore();

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

defineEmits(["update:modelValue"]);

const serchString = ref();

const suggestions = computed(() => store.getters.getHistorySearch);
const filteredSuggestions = computed(() =>
  suggestions.value.filter((suggestion) =>
    suggestion.startsWith(serchString.value)
  )
);

const searchHistory = (event: any) => {
  serchString.value = event.query;
};
</script>
