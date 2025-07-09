<script setup lang="ts">
import { SessionStore } from '@/services/sessionStore'
import type { ColumnDef } from '@tanstack/vue-table'

const { userId } = useAuth()
const user = ref<User>()
onBeforeMount(async () => {
  user.value = await SessionStore.getSession(Number(userId.value))
})

const { data: users, isPending } = useQuery<User[]>({
  queryKey: ['users'],
  queryFn: async () => {
    return await axios
      .get('users')
      .then((res) => res.data)
      .then(async (data) => await decodeAllFields(data))
  },
  refetchOnReconnect: true,
  refetchInterval: 1000 * 60,
  throwOnError: true,
})
const columnHelper = createColumnHelper<User>()
const columns: ColumnDef<User, any>[] = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('username', {
    header: 'Username',
    cell: ({ getValue }) => getValue(),
  }),
]
</script>

<template>
  <div class="container py-4">
    <DataTable v-if="users?.length" :data="users" :columns="columns" :paginated="false" />
  </div>
</template>
