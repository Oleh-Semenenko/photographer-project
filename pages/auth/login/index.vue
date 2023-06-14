<template>
  <div>
    <div class="flex justify-between gap-3 md:gap-[10%] mb-6 md:mb-10">
      <NuxtLink to="/auth/login" class="w-[45%]">
        <Button class="w-full">Log in</Button>
      </NuxtLink>
      <NuxtLink to="/auth/register" class="w-[45%]">
        <Button class="w-full non-active">Create account</Button>
      </NuxtLink>
    </div>
    <el-form
      ref="formRef"
      label-position="top"
      :model="formModel"
      :rules="formRules"
      @submit.prevent="onSubmit"
    >
      <el-form-item class="custom-label" label="E-mail" prop="email">
        <el-input
          v-model="formModel.email"
          class="el-input__inner"
          placeholder="Enter your email"
        />
      </el-form-item>

      <el-form-item class="custom-label" label="Password" prop="password">
        <el-input
          v-model="formModel.password"
          class="el-input__inner"
          type="password"
          placeholder="Enter password"
          show-password
        />
      </el-form-item>

      <div class="flex flex-col md:flex-row gap-6 lg:gap-12 md:items-center justify-between mt-6 md:mt-10 lg:mt-12">
        <NuxtLink to="/" class="text-green-100">
          Forgot password?
        </NuxtLink>

        <Button
          native-type="submit"
          class="bg-green-80 text-white-100 flex-grow"
          :disabled="!isFormValid"
        >
          Login
        </Button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { ILogin } from '~/pages/auth/auth.types'
import type { IFormModel } from '~/types/global.types'

definePageMeta({
  layout: 'auth',
  middleware: [
    'auth-middleware'
  ]
})

const client = useSupabaseAuthClient()

const isFormValid = ref(false)

const formRef = useElFormRef()

const formModel = useElFormModel({
  email: '',
  password: ''
})

const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)]
})

async function login ({ email, password }: ILogin) {
  const { data } = await client.auth.signInWithPassword({ email, password })

  if (data) {
    return navigateTo('/photographer')
  }

  return data
}

function onSubmit () {
  formRef.value?.validate(async (isValid) => {
    if (isValid) {
      isFormValid.value = true
      await login(formModel)
    }
  })
}

watch(formModel, () => {
  formRef.value?.validate((isValid, invalidFields) => {
    if (invalidFields) {
      formRef.value.clearValidate(Object.keys(invalidFields).filter(item => !(formModel as IFormModel)[item]))
    }
    isFormValid.value = isValid
  })
})
</script>
