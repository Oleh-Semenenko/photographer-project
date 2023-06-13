<template>
  <div class="hidden md:flex items-start justify-between gap-5 px-6 py-6 bg-transparent">
    <div class="space-y-8">
      <IconLogo />
      <p>© Copyright 2022 Photographer.com <br> All Rights Reserved</p>
    </div>

    <nav class="flex-grow px-3 space-y-[12px]">
      <ul class="grid grid-cols-2 gap-4 text-green-100 border-b-2 border-b-green-40 pb-6">
        <li>
          <NuxtLink to="/">
            Catalog
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            Terms & Conditions
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            Privacy Policy
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            FAQ
          </NuxtLink>
        </li>
      </ul>

      <ul class="flex items-center justify-center gap-8">
        <li>
          <a href="https://www.instagram.com/" target="_blank">
            <IconInstagram class="fill-green-100" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/" target="_blank">
            <IconTwitter class="fill-green-100" />
          </a>
        </li>
      </ul>
    </nav>

    <div class="space-y-[24px]">
      <p>Want to receive news about service?</p>
      <el-input class="el-input__inner" placeholder="Enter your email" />
      <Button class="w-[140px] h-[52px]">Send</Button>
    </div>
  </div>

  <div class="md:hidden text-center container mx-auto px-6 py-6 bg-transparent">
    <div class="flex items-center justify-between">
      <IconLogo />
      <ul class="flex items-center justify-center gap-5">
        <li>
          <a href="https://www.instagram.com/" target="_blank">
            <IconInstagram class="fill-green-100" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/" target="_blank">
            <IconTwitter class="fill-green-100" />
          </a>
        </li>
      </ul>
    </div>

    <div class="mt-7  border-b-2 border-b-grey-50 pb-5">
      <p class="text-start">Want to receive news about service?</p>
      <el-input class="el-input__inner mt-4" placeholder="Enter your email" />
      <Button class="w-full mt-6">Send</Button>
    </div>

    <nav class="px-3 space-y-[12px] mt-5">
      <ul class="grid grid-cols-2 gap-3 text-green-100 text-[16px]">
        <li>
          <NuxtLink to="/">
            Terms & Conditions
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{name: 'catalog'}">
            Catalog
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="#">
            Privacy Policy
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            FAQ
          </NuxtLink>
        </li>
      </ul>

      <p class="text-[16px] mt-8">© Copyright 2022 Photographer.com <br> All Rights Reserved</p>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.el-input__inner {
  height: 48px;
}
</style>
