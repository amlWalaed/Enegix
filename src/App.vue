<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <component :is="currentLayout || 'div'">
    <RouterView v-slot="{ Component, route }">
      <Transition appear mode="out-in" name="page-transition">
        <component
          :is="Component"
          :key="$route.params.id"
          :data-transition="route.meta.transition"
        />
      </Transition>
    </RouterView>
  </component>
</template>

<style scoped></style>
