<script setup lang="ts"></script>
<template>
  <nav class="sticky top-0 w-full py-4 shadow-accent shadow-2xl z-50 bg-background">
    <div class="container">
      <AppLogo />
    </div>
  </nav>
  <main class="min-h-svh">
    <slot />
  </main>
  <footer class="container py-4">
    <AppLogo />
  </footer>
</template>
