<template>
  <el-header class="flex justify-between items-center py-3 px-6 bg-white-100 lg:bg-transparent">
    <NuxtLink to="/">
      <IconLogo class="cursor-pointer" />
    </NuxtLink>
    <slot />
  </el-header>
</template>
