<script setup lang="ts">
import { UserStore } from '@/services/userStore'
import { keepPreviousData } from '@tanstack/vue-query'
import type { ColumnDef } from '@tanstack/vue-table'

const { userId } = useAuth()
const isOnline = useOnline()

const user = ref<User>()
const initialData = ref<User[]>([])
const getInitialData = async () => {
  return await UserStore.getUsers()
}
onBeforeMount(async () => {
  user.value = await SessionStore.getSession(Number(userId.value))
  initialData.value = await getInitialData()
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
    UserStore.saveUsers(decodedData)
    return decodedData
  },
  refetchInterval: 1000 * 60,
  refetchOnReconnect: 'always',
  enabled: isOnline,
  placeholderData: keepPreviousData,
})
const paginatedUsers = computed(() =>
  paginate(users.value ?? initialData.value ?? [], filters.value.page),
)
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
