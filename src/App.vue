<script setup lang="ts">
import { default as layouts } from '@/layouts'
import { RouterView } from 'vue-router'

const router = useRouter()

const currentLayout = shallowRef('div')
router.afterEach((to) => {
  currentLayout.value = layouts[to.meta?.layout] || 'div'
})

const { isOnline, offlineAt } = useNetwork()
watch(isOnline, (newVal) => {
  if (newVal) {
    toast.success("You're Back Online!", {
      description: 'Connection restored. All features are now available.',
    })
  } else {
    toast.error("You're Currently Offline", {
      description: 'Some features may be unavailable. Working in limited mode.',
    })
  }
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

  <Sonner />
</template>

<style scoped></style>
