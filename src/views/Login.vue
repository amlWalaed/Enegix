<script setup lang="ts">
import { UserStore } from '@/services/userStore'
import type { AxiosError } from 'axios'

const { userId: user } = useAuth()
const router = useRouter()
const { isOnline } = useNetwork()
type TForm = {
  username?: string
  password?: string
}
const formRaw = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
})
const formSchema = toTypedSchema(formRaw)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})
const { mutate, isPending, error } = useMutation<User, TForm, TForm>({
  mutationFn: async (variables) => {
    if (isOnline.value) return await axios.post('login', variables).then((res) => res.data)

    const user = await UserStore.getUserByUsername(variables.username ?? '')
    if (!user) return Promise.reject('username not correct')

    const isCorrect = await checkPassword(variables.password ?? '', user?.password ?? '')
    if (isCorrect) return user
    else return Promise.reject('password not correct')
  },
  onSuccess(data) {
    SessionStore.saveSession(data)
    user.value = data.id
    router.push({ name: 'home' })
  },
})
const onSubmit = handleSubmit(async (values) => {
  mutate(values)
})
</script>
<template>
  <main
    class="bg-gradient-to-bl from-primary to-primary-foreground flex flex-col items-center justify-center p-4 min-h-svh"
  >
    <Card class="max-w-2xl w-full">
      <CardHeader v-auto-animate>
        <span
          v-if="error"
          class="bg-red-200 text-red-800 p-2 text-sm font-semibold border-red-900 rounded-md shadow"
          >{{ error }}</span
        >
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form @submit="onSubmit">
          <FormField
            name="username"
            label="username"
            :validate-on-blur="!isFieldDirty"
            placeholder="clair44"
          >
            <Input />
          </FormField>
          <FormField
            name="password"
            label="password"
            :validate-on-blur="!isFieldDirty"
            placeholder="test@65!"
          >
            <Input type="password" />
          </FormField>
          <Button type="submit" :loading="isPending">Login</Button>
        </Form>
      </CardContent>
    </Card>
  </main>
</template>
