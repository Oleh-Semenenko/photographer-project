<template>
  <el-container class="flex h-full relative">
    <!--HEADER-->
    <AppHeader class="lg:absolute w-full z-10">
      <ul class="text-[16px] md:text-[20px] flex justify-between items-center gap-3 lg:gap-11 leading-8">
        <li>
          <NuxtLink :to="{name: 'catalog'}">
            Catalog
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/auth/login">
            For photographers
          </NuxtLink>
        </li>
      </ul>
    </AppHeader>

    <!--MAIN-->
    <el-main class="lg:flex-grow lg:border-b-[28px] border-b-grey-30">
      <slot />
    </el-main>

    <!-- FOOTER -->
    <el-footer>
      <AppFooter />
    </el-footer>
  </el-container>
</template>
