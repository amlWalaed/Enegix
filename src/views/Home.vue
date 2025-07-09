<script setup lang="ts">
import { keepPreviousData } from '@tanstack/vue-query'
import type { ColumnDef } from '@tanstack/vue-table'

const { userId } = useAuth()
const user = ref<User>()
onBeforeMount(async () => {
  user.value = await SessionStore.getSession(Number(userId.value))
})
const router = useRouter()
const filters = computed(() => ({
  ...router.currentRoute.value.query,
}))
const { data: users, isPending } = useQuery<PaginatedData<User>>({
  queryKey: ['users'],
  queryFn: async () => {
    const encodedData = await axios.get('users').then((res) => res.data)
    const decodedData = await decodeAllFields(encodedData)
    return decodedData
  },
  refetchOnReconnect: true,
  refetchInterval: 1000 * 60,
  placeholderData: keepPreviousData,
})
const paginatedUsers = computed(() => paginate(users.value ?? [], filters.value.page))
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
    <Card>
      <CardContent class="space-y-4">
        <h1 class="text-2xl font-medium">👋 Hello, {{ user?.name }}</h1>
        <DataTable :as-card="false" :data="paginatedUsers" :columns="columns" :search="false" />
      </CardContent>
    </Card>
  </div>
</template>
