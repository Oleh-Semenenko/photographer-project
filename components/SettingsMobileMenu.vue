<template>
  <el-menu
    class="lg:hidden justify-center sm:gap-4 mb-5 py-2 "
    mode="horizontal"
  >
    <el-menu-item :class="{ 'active': isActive('/photographer/settings') }">
      <NuxtLink :to="{name: 'photographer-settings'}">
        <IconUser />
      </NuxtLink>
    </el-menu-item>
    <el-menu-item :class="{ 'active': isActive('/photographer/settings/photo-types') }">
      <NuxtLink :to="{name: 'photographer-settings-photo-types'}">
        <IconCamera class="stroke-black-80 fill-transparent" />
      </NuxtLink>
    </el-menu-item>
    <el-menu-item :class="{ 'active': isActive('/photographer/settings/calendar') }">
      <NuxtLink :to="{name: 'photographer-settings-calendar'}">
        <IconCalendar />
      </NuxtLink>
    </el-menu-item>
    <el-menu-item :class="{ 'active': isActive('/photographer/settings/promotion') }">
      <NuxtLink :to="{name: 'photographer-settings-promotion'}">
        <IconCrown />
      </NuxtLink>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
const route = useRoute()

function isActive (path) {
  return route.path === path
}
</script>

<style lang="scss">
.active {
  @apply bg-green-50 rounded-sm
}

.el-menu-item {
  @apply px-2 md:px-4
}
</style>
