<template>
  <div class="container mx-auto sm:px-6">
    <h2
      class="relative text-[22px] md:text-[28px] lg:text-[32px] leading-[1.5]
    mb-5 after-element after:w-[140px] after:left-10 md:after:w-[200px] md:after:left-4 md:after:top-0
    lg:after:w-[358px] lg:after:left-10 px-6 sm:px-0"
    >
      Profile settings
    </h2>
    <SettingsMobileMenu />
    <div class="md:flex gap-4">
      <SettingsCard />

      <el-card class="p-6 lg:p-10">
        <div class="flex items-center">
          <div
            class="flex items-center justify-center w-[92px] h-[92px] lg:w-[152px] lg:h-[152px]
            rounded-full shrink-0 overflow-hidden
            border-[7px] border-green-40 mr-3 md:mr-6"
          >
            <NameAbbr v-if="!user?.user_metadata?.avatarUrl" class="text-4xl" />
            <el-avatar
              v-else
              class="w-full h-full"
              :src="avatarUrl"
              size="large"
            />
          </div>
          <el-upload
            class="mr-3"
            :on-success="handleAvatarUploadSuccess"
            :show-file-list="false"
          >
            <IconAvatarUpload class="mr-3 fill-green-100" />
            <el-button text>
              Change photo
            </el-button>
          </el-upload>
        </div>

        <el-form
          ref="formRef"
          :model="formModel"
          :rules="formRules"
          class="mt-8"
          label-position="top"
          @submit.prevent="onSave"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="First Name" prop="first_name">
                <el-input
                  v-model="formModel.first_name"
                  placeholder="First Name"
                >
                  />
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Second Name" prop="second_name">
                <el-input
                  v-model="formModel.second_name"
                  placeholder="Second Name"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Email" prop="email">
                <el-input
                  v-model="formModel.email"
                  placeholder="Email"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="City" prop="city">
                <el-input
                  v-model="formModel.city"
                  placeholder="City"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Phone number" prop="phoneNumber">
                <el-input
                  v-model="formModel.phoneNumber"
                  v-maska
                  data-maska="+380#########"
                  placeholder="Phone number"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Gender">
                <el-select
                  v-model="formModel.gender"
                  placeholder="Select"
                >
                  <el-option
                    class="text-[14px] cursor-pointer"
                    label="Female"
                    value="Female"
                  />
                  <el-option
                    class="text-[14px] cursor-pointer"
                    label="Male"
                    value="Male"
                  />
                  <el-option
                    class="text-[14px] cursor-pointer"
                    label="Other"
                    value="Other"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Experience" prop="experience">
                <el-select
                  v-model="formModel.experience"
                  placeholder="Start year"
                >
                  <el-option
                    v-for="year in yearOptions"
                    :key="year.value"
                    :label="year.label"
                    :value="year.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Photos delivery time, days" prop="deliveryTime" class="truncate">
                <el-input
                  v-model="formModel.deliveryTime"
                  placeholder="From 2"
                  type="number"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Contacts" prop="socMedia">
            <el-collapse class="w-full">
              <el-collapse-item title="telegram">
                <el-input
                  v-model="formModel.socMedia.telegram"
                />
              </el-collapse-item>

              <el-collapse-item title="instagram">
                <el-input
                  v-model="formModel.socMedia.instagram"
                />
              </el-collapse-item>
              <el-collapse-item title="facebook">
                <el-input
                  v-model="formModel.socMedia.facebook"
                />
              </el-collapse-item>
            </el-collapse>
          </el-form-item>

          <el-form-item label="About myself" prop="about">
            <el-input
              v-model="formModel.about"
              maxlength="450"
              placeholder="Tell about yourself"
              show-word-limit
              type="textarea"
            />
          </el-form-item>

          <Button
            class="w-full sm:w-[50%]"
            native-type="submit"
            :disabled="!isFormValid"
          >
            Save changes
          </Button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePhotographerStore } from '../../../store/photographer'
definePageMeta({
  middleware: [
    'auth-middleware'
  ]
})
const user = useSupabaseUser()

const photographerStore = usePhotographerStore()
const {
  updateUser,
  updateUserEmail,
  uploadAvatar,
  updateAvatar,
  getAvatarUrl,
  updateUserOptionalData
} = photographerStore

const avatarUrl = ref(user.value?.user_metadata?.avatarUrl || null)

const handleAvatarUploadSuccess = async (response,
  uploadFile) => {
  if (!avatarUrl.value) {
    await uploadAvatar(uploadFile.raw, user.value?.id)
  } else {
    await updateAvatar(uploadFile.raw, user.value?.id)
  }
  avatarUrl.value = await getAvatarUrl(`avatar_${user.value?.id}.jpg`)
  await updateUserOptionalData({ avatarUrl: avatarUrl.value })

  avatarUrl.value = URL.createObjectURL(uploadFile.raw)
}

const formRef = useElFormRef()
const isFormValid = ref(false)

const formModel = useElFormModel({
  first_name: user.value?.user_metadata?.first_name,
  second_name: user.value?.user_metadata?.second_name,
  email: user.value?.email,
  city: user.value?.user_metadata?.city,
  phoneNumber: user.value?.user_metadata?.phoneNumber,
  gender: user.value?.user_metadata?.gender,
  experience: user.value?.user_metadata?.experience,
  deliveryTime: user.value?.user_metadata?.deliveryTime,
  about: user.value?.user_metadata?.about,
  socMedia: {
    telegram: user?.value?.user_metadata?.socMedia?.telegram || '',
    instagram: user?.value?.user_metadata?.socMedia?.instagram || '',
    facebook: user?.value?.user_metadata?.socMedia?.facebook || ''
  }
})

const formRules = useElFormRules({
  firstName: [useRequiredRule()],
  secondName: [useRequiredRule()],
  email: [useRequiredRule(), useEmailRule()],
  city: [useRequiredRule()],
  phoneNumber: [useRequiredRule()]
})

function onSave () {
  formRef.value?.validate(async (isValid) => {
    try {
      if (isValid) {
        isFormValid.value = true
        const { email, ...metaData } = formModel
        await updateUser(metaData)
        await updateUserEmail(email)
        successNotification('Your changes were saved successfully')
      }
    } catch (error) {
      errorNotification('We can`t save your changes')
    }
  })
}

const currentYear = new Date().getFullYear()
const startYear = 1930
const yearOptions = ref([])

onMounted(async () => {
  yearOptions.value = Array.from({ length: currentYear - startYear + 1 }).map((_, idx) => ({
    value: (currentYear - idx).toString(),
    label: `${currentYear - idx}`
  }))

  if (user.value?.user_metadata?.avatarUrl) {
    avatarUrl.value = user.value?.user_metadata?.avatarUrl
  }
})

watch(formModel, () => {
  formRef.value?.validate((isValid, invalidFields) => {
    if (invalidFields) {
      formRef.value.clearValidate(Object.keys(invalidFields).filter(item => !formModel[item]))
    }
    isFormValid.value = isValid
  })
})
</script>

<style lang="scss">
.el-form-item__label {
  @apply flex justify-between
}

.el-select-dropdown {
  @apply overflow-y-auto
}

.el-input__inner {
  @apply h-[30px]
}

.el-collapse {
  & .el-collapse-item__header {
  @apply text-[16px] md:text-[18px] py-2 md:py-4
}
}

.el-avatar > img {
@apply h-fit
}

.el-button.is-text:not(.is-disabled):hover {
  @apply bg-green-40
}
</style>
