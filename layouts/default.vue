<template>
  <div class="flex-grow flex flex-col mx-auto">
    <el-container class="flex h-full">
      <!-- HEADER -->
      <AppHeader class="bg-white-100">
        <div class="hidden md:flex items-center">
          <nav class="border-r border-r-green-80 shrink-0 pr-3 md:pr-7 lg:pr-11 inline-flex h-[52px]">
            <ul
              class="text-[14px] md:text-[16px] lg:text-[18px] flex justify-between items-center
            gap-3 md:gap-7 lg:gap-11 leading-8"
            >
              <li>
                <NuxtLink :to="{name: 'catalog'}">Catalog</NuxtLink>
              </li>
              <li class="shrink-0">
                <NuxtLink :to="{name: 'photographer'}">My account</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{name: 'photographer-orders'}">Orders</NuxtLink>
              </li>
            </ul>
          </nav>

          <div
            class="ml-3 md:ml-7 lg:ml-11 flex items-center justify-center w-[40px] md:w-[60px] h-[40px] md:h-[60px]
            rounded-full shrink-0 overflow-hidden
            border-[3px] border-green-40"
          >
            <NameAbbr v-if="!user?.user_metadata?.avatarUrl" class="text-lg" />
            <el-avatar
              v-else
              class="w-full h-full"
              size="large"
            >
              <img :src="user?.user_metadata?.avatarUrl">
            </el-avatar>
          </div>

          <el-button text class="ml-3" @click="logout">Log out</el-button>
        </div>

        <div class="md:hidden">
          <el-dropdown trigger="click">
            <div class="flex items-center ">
              <div
                class="ml-3 md:ml-7 lg:ml-11 flex items-center justify-center w-[50px] md:w-[60px] h-[50px] md:h-[60px]
                rounded-full shrink-0 overflow-hidden border-[3px] border-green-40"
              >
                <NameAbbr v-if="!user?.user_metadata?.avatarUrl" class="text-lg" />
                <img
                  v-else
                  class="object-cover"
                  :src="user?.user_metadata?.avatarUrl"
                  alt="avatar"
                >
              </div>
              <IconArrowRight class="rotate-90" />
            </div>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <NuxtLink :to="{name: 'catalog'}">Catalog</NuxtLink>
                </el-dropdown-item>
                <el-dropdown-item>
                  <NuxtLink :to="{name: 'photographer'}">My account</NuxtLink>
                </el-dropdown-item>
                <el-dropdown-item>
                  <NuxtLink :to="{name: 'photographer-orders'}">Orders</NuxtLink>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-button text class="" @click="logout">Log out</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </AppHeader>

      <!-- MAIN -->
      <el-main class="flex-grow py-10 border-b-[28px] border-b-grey-30">
        <slot />
      </el-main>

      <!-- FOOTER -->
      <el-footer class="flex items-start justify-between gap-5 px-6 py-8 bg-white-100">
        <AppFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { successNotification } from '~/utils/notification'

const user = useSupabaseUser()
const client = useSupabaseAuthClient()

async function logout () {
  const { error } = await client.auth.signOut()

  if (error) {
    errorNotification()
    throw new Error(error.message)
  }

  successNotification('You have successfully logged out.')

  await navigateTo('/auth/login')
}
</script>

<style lang="scss" scoped>
.el-input__inner {
  height: 52px;
}
.el-button.is-text:not(.is-disabled):hover {
  @apply bg-green-40;
}
</style>
