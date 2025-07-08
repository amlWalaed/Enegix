<script setup lang="ts">
import { SessionStore } from '@/services/sessionStore'

const { userId } = useAuth()
const user = ref<User>()
onBeforeMount(async () => {
  user.value = await SessionStore.getSession(Number(userId.value))
})
</script>

<template>
  <main>
    <h1 class="text-brand">{{ user?.name }}</h1>
    <Button>aml walaed</Button>
  </main>
</template>
