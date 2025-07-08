<script setup lang="ts">
const props = defineProps<{}>()
const emits = defineEmits<{
  submit: (payload: Event) => void
}>()
</script>
<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
  </form>
</template>
