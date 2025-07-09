<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toastOptions="{
      unstyled: true,
      classes: {
        error: 'bg-red-800',
        success: 'bg-green-800',
        warning: 'bg-yellow-800',
        info: 'bg-blue-800',
        title: 'text-md',
        description: 'text-sm text-mute-foreground',
        toast: 'rounded-lg shadow-2xl p-2 text-white flex items-start gap-2',
      },
    }"
  />
</template>
