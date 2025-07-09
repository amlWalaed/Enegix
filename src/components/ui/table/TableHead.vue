<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <th
    data-slot="table-head"
    :class="
      cn(
        'bg-primary text-primary-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] first:rounded-ss-lg last:rounded-se-lg',
        props.class,
      )
    "
  >
    <slot />
  </th>
</template>
