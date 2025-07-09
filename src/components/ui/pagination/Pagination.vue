<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  PaginationRoot,
  type PaginationRootEmits,
  type PaginationRootProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/utils/index'

const props = defineProps<
  PaginationRootProps & {
    class?: HTMLAttributes['class']
    meta: PaginatedMeta
  }
>()
const router = useRouter()
const emits = defineEmits<PaginationRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
const page = defineModel<number>()
watch(page, () => {
  router.replace({
    query: { page: page.value },
  })
})
</script>

<template>
  <PaginationRoot
    v-bind="forwarded"
    v-slot="{ page }"
    :total="props.meta.total"
    :class="cn(props.class)"
    v-model:page="page"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis :index="4" />

      <PaginationNext />
    </PaginationContent>
  </PaginationRoot>
</template>
