<script setup lang="ts">
import { SessionStore } from '@/services/sessionStore'

const { userId } = useAuth()
const user = ref<User>()
onBeforeMount(async () => {
  user.value = await SessionStore.getSession(Number(userId.value))
})

const { data: users, isPending } = useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('users').then((res) => res.data),
  refetchInterval: 1000 * 60,
})
</script>

<template>
  <div class="container">
    <pre>
      {{ users }}
    </pre>
  </div>
</template>
