<script setup lang="ts">
const { userId: user } = useAuth()
const router = useRouter()

const formRaw = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
})
const formSchema = toTypedSchema(formRaw)
type TForm = z.infer<typeof formRaw>

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})
const { mutate, isPending } = useMutation<User, TForm, TForm>({
  mutationFn: (variables) => axios.post('login', variables).then((res) => res.data),
  onSuccess(data) {
    SessionStore.saveSession(data)
    user.value = data.id
    router.push({ name: 'home' })
  },
})
const onSubmit = handleSubmit((values) => {
  mutate(values)
})
</script>
<template>
  <main
    class="bg-gradient-to-bl from-primary to-primary-foreground flex flex-col items-center justify-center p-4 min-h-svh"
  >
    <Card class="max-w-2xl w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form @submit="onSubmit">
          <FormField name="username" label="username" :validate-on-blur="!isFieldDirty">
            <Input />
          </FormField>
          <FormField name="password" label="password" :validate-on-blur="!isFieldDirty">
            <Input type="password" />
          </FormField>
          <Button type="submit" :loading="isPending">Login</Button>
        </Form>
      </CardContent>
    </Card>
  </main>
</template>
