<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tr
    data-slot="table-row"
    :class="
      cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors even:bg-neutral-100 odd:bg-white ',
        props.class,
      )
    "
  >
    <slot />
  </tr>
</template>
