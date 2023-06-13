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
        <!-- <div class="flex items-center mt-12">
          <div class="flex-grow h-[1px] bg-green-60" />
          <span class="px-2 text-black-80">OR proceed with</span>
          <div class="flex-grow h-[1px] bg-green-60" />
        </div> -->

        <!-- <div class="flex justify-between gap-[10%] mt-10">
          <NuxtLink to="/login" class="w-[45%]">
            <Button
              class="w-full social-links-btn flex items-center justify-center"
            >
              <template #icon>
                <IconGoogle class="w-[30px] h-[30px] flex items-center justify-center mr-4" />
              </template>
              Google
            </Button>
          </NuxtLink>
          <NuxtLink to="/register" class="w-[45%]">
            <Button
              class="w-full social-links-btn flex items-center justify-center"
            >
              <template #icon>
                <IconFacebook class="w-[32px] h-[32px] flex items-center justify-center mr-4" />
              </template>
              Facebook
            </Button>
          </NuxtLink>
        </div> -->
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
