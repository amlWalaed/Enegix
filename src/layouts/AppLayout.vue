<script setup lang="ts">
import { Database } from '@/services/database'
import { SessionStore } from '@/services/sessionStore'

const { userId, removeUserId } = useAuth()
const router = useRouter()

const { mutate, isPending } = useMutation({
  mutationFn: async () => {
    await SessionStore.removeSession(Number(userId.value))
    removeUserId()
    router.replace({
      name: 'login',
    })
  },
})
</script>
<template>
  <nav class="sticky top-0 w-full py-4 shadow-accent shadow-2xl z-50 bg-background">
    <div class="container flex items-center gap-2 justify-between">
      <AppLogo />
      <Button :loading="isPending" variant="ghost" @click="mutate">Logout</Button>
    </div>
  </nav>
  <main class="min-h-svh">
    <slot />
  </main>
  <footer class="py-1 bg-primary text-primary-foreground">
    <p class="container text-center text-sm font-semibold">Created by aml walaed ❤ 2025</p>
  </footer>
</template>
