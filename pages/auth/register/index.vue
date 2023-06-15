<template>
  <div>
    <div class="flex justify-between gap-3 md:gap-[10%] mb-6 md:mb-10">
      <NuxtLink to="/auth/login" class="w-[45%]">
        <Button class="w-full non-active">Log in</Button>
      </NuxtLink>
      <NuxtLink to="/auth/register" class="w-[45%]">
        <Button class="w-full ">Create account</Button>
      </NuxtLink>
    </div>
    <el-form
      ref="formRef"
      label-position="top"
      :model="formModel"
      :rules="formRules"
      @submit.prevent="onSubmit"
    >
      <div class="flex gap-[10%]">
        <el-form-item
          label="First name"
          class="w-[45%]"
          prop="firstName"
        >
          <el-input
            v-model="formModel.firstName"
            placeholder="Enter your first name"
            class="el-input__inner"
          />
        </el-form-item>
        <el-form-item
          label="Second name"
          class="w-[45%]"
          prop="secondName"
        >
          <el-input
            v-model="formModel.secondName"
            class="el-input__inner"
            placeholder="Enter your second name"
          />
        </el-form-item>
      </div>

      <el-form-item label="E-mail" prop="email">
        <el-input
          v-model="formModel.email"
          class="el-input__inner"
          placeholder="Enter your email"
        />
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input
          v-model="formModel.password"
          class="el-input__inner"
          type="password"
          placeholder="Enter password"
          show-password
        />
      </el-form-item>

      <div class="flex items-start md:items-center lg:items-start  flex-col md:flex-row lg:flex-col gap-3">
        <el-checkbox v-model="checked" class="md:flex-grow" @input="checked = !checked">
          <span class="md:ml-4">I agree with
          </span>
          <NuxtLink to="/" class="text-green-100">Secure and Service policy</NuxtLink>
        </el-checkbox>

        <Button
          native-type="submit"
          class="bg-green-80 text-white-100"
          :disabled="!isFormValid && !checked"
        >
          Create account
        </Button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { IRegister } from '~/pages/auth/auth.types'

const client = useSupabaseAuthClient()

definePageMeta({
  layout: 'auth',
  middleware: [
    'auth-middleware'
  ]
})

const checked = ref(false)
const isFormValid = ref(false)

const formRef = useElFormRef()

const formModel = useElFormModel({
  firstName: '',
  secondName: '',
  email: '',
  password: ''
})

const formRules = useElFormRules({
  firstName: [useRequiredRule()],
  secondName: [useRequiredRule()],
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)]
})

async function register ({ email, password, firstName, secondName }: IRegister) {
  const result = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/photographer`,
      data: {
        first_name: firstName,
        second_name: secondName
      }
    }
  })

  if (result.data) {
    successNotification('Please, verify your email')
  }

  return result
}

function onSubmit () {
  formRef.value?.validate(async (isValid) => {
    if (isValid) {
      isFormValid.value = true
      await register(formModel)
    }
  })
}
</script>

<style lang="scss">
.el-button + .el-button {
  margin-left: 0;
}

@media screen and (max-width: 420px) {
  .el-checkbox .el-checkbox__label {
  @apply flex flex-wrap
}
}
</style>
