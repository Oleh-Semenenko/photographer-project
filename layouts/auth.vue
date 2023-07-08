<template>
  <div
    class="flex gap-[5%] justify-between px-6 lg:pr-0 border-l-[16px] md:border-l-[28px] border-l-grey-50
    border-b-[16px] lg:border-b-[28px] border-b-green-40 "
  >
    <el-container class="lg:flex h-full pb-3 lg:pb-6 w-[35%]">
      <!-- HEADER -->
      <el-header class="flex items-center justify-between py-6 lg:mb-10">
        <NuxtLink to="/">
          <IconLogo class="cursor-pointer" />
        </NuxtLink>
        <NuxtLink :to="{name: 'catalog'}">Catalog</NuxtLink>
      </el-header>
      <!-- MAIN -->
      <el-main class="flex-grow">
        <slot />
      </el-main>
    </el-container>

    <div class="hidden lg:block md:w-[60%] h-full self-stretch">
      <img
        width="1078"
        height="1220"
        src="../assets/images/login.jpg"
        alt="Photographers"
        class="aspect-[0.88]"
      >
    </div>
  </div>
</template>
