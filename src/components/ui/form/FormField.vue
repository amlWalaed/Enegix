<script setup lang="ts">
import { Primitive, Slot } from 'reka-ui'
import { Field } from 'vee-validate'
const props = defineProps<{
  label: string
  validateOnBlur: boolean
  name: string
  description?: string
}>()
</script>
<template>
  <Field v-slot="{ componentField }" :name :validate-on-blur="validateOnBlur">
    <FormItem v-auto-animate>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Primitive as-child v-bind="componentField">
          <slot />
        </Primitive>
      </FormControl>
      <FormDescription v-if="description">{{ description }}</FormDescription>
      <FormMessage />
    </FormItem>
  </Field>
</template>
