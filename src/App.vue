<script setup lang="ts">
import { default as layouts } from '@/layouts'
import { RouterLink, RouterView } from 'vue-router'
const router = useRouter()
const currentLayout = ref('div')
router.afterEach((to) => {
  console.log(layouts['AppLayout'])
  currentLayout.value = layouts[to.meta?.layout] || 'div'
})
</script>

<template>
  <component :is="currentLayout">
    <RouterView v-slot="{ Component, route }">
      <Transition appear mode="out-in" name="page-transition">
        <component :is="Component" :key="$route.name" :data-transition="route.meta.transition" />
      </Transition>
    </RouterView>
  </component>
</template>

<style scoped></style>
