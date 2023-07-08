<template>
  <div class="container mx-auto px-6 flex flex-col lg:flex-row lg:items-stretch gap-5 justify-between">
    <div class="flex flex-col gap-5 justify-between">
      <h2
        class="relative text-[22px] md:text-[28px] lg:text-[32px] leading-10 after-element
        after:h-4 after:w-[120px] after:top-1 md:after:w-[170px] md:after:top-0"
      >
        My profile
      </h2>
      <el-card
        v-if="user"
        class="bg-white-100 max-w-[512px] shrink p-6 lg:p-10 flex-grow"
      >
        <div class="flex justify-between items-center gap-2">
          <div
            class="flex items-center justify-center w-[92px] md:w-[112px] h-[92px] md:h-[112px]
            rounded-full shrink-0 overflow-hidden
        border-[7px] border-green-40"
          >
            <NameAbbr v-if="!user.user_metadata.avatarUrl" />
            <el-avatar
              v-else
              class="w-full h-full"
              size="large"
            >
              <img
                :src="user?.user_metadata?.avatarUrl"
                alt="avatar"
              >
            </el-avatar>
          </div>

          <p class="text-green-80 text-[18px] md:text-[20px]">{{ fullName }}</p>

          <el-button
            class="w-10 h-10 bg-transparent border-none hover:bg-transparent hover:text-green-80 focus:bg-transparent"
          >
            <NuxtLink :to="{name: 'photographer-settings'}">
              <IconSettings class="fill-green-80 hover:fill-green-100" />
            </NuxtLink>
          </el-button>
        </div>

        <div class="space-y-4 md:space-y-6 mt-7 border-b border-b-green-40 pb-3">
          <div class="space-y-3">
            <div v-if="userData.city" class="flex items-center gap-2">
              <IconLocation />
              <p class="text-[14px] md:text-[18px]">{{ userData.city }}</p>
            </div>

            <div v-if="userData.phoneNumber" class="flex items-center gap-2">
              <IconPhone class="fill-green-100" />
              <p class="text-[14px] md:text-[18px]">{{ userData.phoneNumber }}</p>
            </div>

            <div v-if="userData.email" class="flex items-center gap-2">
              <IconEmail class="fill-green-100" />
              <p class="text-[14px] md:text-[18px]">{{ userData.email }}</p>
            </div>
          </div>

          <NuxtLink :to="`/photographers/${user.id}`">
            <p class="text-[16px] md:text-[18px] text-green-100 font-normal">Preview Profile</p>
          </NuxtLink>
        </div>

        <p class="text-[16px] md:text-[18px] mt-3 lg:mt-6">Share your profile</p>
        <div class="text-[14px] md:text-[16px] flex items-center gap-1">
          <p>{{ link }}</p>
          <IconCopy class="fill-green-100 shrink-0 hover:cursor-pointer" @click="copyLink" />
        </div>
      </el-card>
    </div>

    <div class="flex flex-col gap-5 justify-between">
      <h2
        class="relative text-[22px] md:text-[28px] lg:text-[32px] text-green-100 leading-10 after-element light
        after:h-4 after:w-[120px] after:top-1 md:after:w-[170px] md:after:top-0"
      >
        New features
      </h2>
      <el-card class="bg-white-100 max-w-[512px] shrink p-6 lg:p-10 flex-grow">
        <div class="space-y-[14px]">
          <div class="flex justify-between items-center">
            <IconCheck class="fill-green-100 mr-4" />
            <p class="text-green-100 font-normal flex-grow">Promotion to the top</p>
            <NuxtLink :to="{name: 'photographer-settings-promotion'}">
              <IconArrowRight class="hover:fill-green-100" />
            </NuxtLink>
          </div>
          <p class="text-[14px] md:text-[18px]">
            This feature allows you to promote your profile
            to the top photographers in your city. Your profile
            will be viewed by many people and it will help
            you get more orders.
          </p>
        </div>

        <div class="space-y-[14px] mt-6">
          <p class="text-green-100 font-normal">Special offers for photography</p>
          <p class="text-[14px] md:text-[18px]">
            We will add the ability to  set special offers
            for services and thus attract more customers.
          </p>
        </div>

        <div class="space-y-[14px] mt-6">
          <p class="text-green-100 font-normal">Work while traveling</p>
          <p class="text-[14px] md:text-[18px]">
            You will be able to work while traveling by entering the dates and city of your temporary location.
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    'auth-middleware'
  ]
})
const user = useSupabaseUser()

const userData = reactive({
  email: user?.value?.email,
  phoneNumber: user?.value?.user_metadata?.phoneNumber,
  city: user?.value?.user_metadata?.city
})

const fullName = computed(() => {
  return user?.value?.user_metadata?.first_name + ' ' + user?.value?.user_metadata?.second_name
})

const link = ref(`https://starlit-choux-dfdf4d.netlify.app/photographers/${user.value?.id}`)

const copyLink = () => {
  const linkElement = document.createElement('textarea')
  linkElement.value = link.value
  document.body.appendChild(linkElement)
  linkElement.select()
  document.execCommand('copy')
  document.body.removeChild(linkElement)
  successNotification('Your link has been copied')
}
</script>
