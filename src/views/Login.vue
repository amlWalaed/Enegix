<script setup lang="ts">
import axios from '@/config/axios'

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  }),
)

const { isFieldDirty, handleSubmit, errors } = useForm({
  validationSchema: formSchema,
})
const onSubmit = handleSubmit((values) => {
  axios.post('login', values)
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
          <Button type="submit">Login</Button>
        </Form>
      </CardContent>
    </Card>
  </main>
</template>
