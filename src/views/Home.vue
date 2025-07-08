<script setup lang="ts">
import { SessionStore } from '@/services/sessionStore'

const { userId } = useAuth()
const user = ref<User>()
onBeforeMount(async () => {
  user.value = await SessionStore.getSession(Number(userId.value))
})
</script>

<template>
  <AppLayout>
    <div class="container"></div>
  </AppLayout>
</template>
