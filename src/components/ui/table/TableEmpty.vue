<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/utils/index'
import TableCell from './TableCell.vue'
import TableRow from './TableRow.vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    colspan?: number
  }>(),
  {
    colspan: 1,
  },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <TableRow>
    <TableCell
      :class="cn('p-4 whitespace-nowrap align-middle text-sm text-foreground', props.class)"
      v-bind="delegatedProps"
    >
      <slot>
        <div class="text-center flex flex-col items-center justify-center py-10">
          <div class="max-w-sm">
            <img src="/images/empty-table.webp" class="object-contain max-h-24" />
          </div>
          <p class="text-muted-foreground text-2xl font-semibold">No Data Found!</p>
          <p class="text-muted-foreground font-medium">Please try again later</p>
        </div>
      </slot>
    </TableCell>
  </TableRow>
</template>
