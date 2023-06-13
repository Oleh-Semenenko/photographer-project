<template>
  <el-card class="hidden lg:block w-[35%] shrink-0 border-l-[28px] border-l-grey-50 py-8 self-start">
    <ul class="space-y-[24px] text-[18px]">
      <li class="flex items-center gap-4 px-8" :class="{ 'active': isActive('/photographer/settings') }">
        <IconUser />
        <NuxtLink :to="{name: 'photographer-settings'}">
          Personal information
        </NuxtLink>
      </li>
      <li class="flex items-center gap-4 px-8" :class="{ 'active': isActive('/photographer/settings/photo-types') }">
        <IconCamera class="stroke-black-80 fill-transparent" />
        <NuxtLink :to="{name: 'photographer-settings-photo-types'}">
          Photography types and cost
        </NuxtLink>
      </li>
      <li class="flex items-center gap-4 px-8" :class="{ 'active': isActive('/photographer/settings/calendar') }">
        <IconCalendar />
        <NuxtLink :to="{name: 'photographer-settings-calendar'}">
          Calendar
        </NuxtLink>
      </li>
      <li class="flex items-center gap-4 px-8" :class="{ 'active': isActive('/photographer/settings/promotion') }">
        <IconCrown />
        <NuxtLink :to="{name: 'photographer-settings-promotion'}">
          Promotion
        </NuxtLink>
      </li>
    </ul>
  </el-card>
</template>

<script lang="ts" setup>
const route = useRoute()

function isActive (path) {
  return route.path === path
}
</script>

<style lang="scss">
.active {
  @apply bg-green-50
}
</style>
