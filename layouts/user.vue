<template>
  <el-container class="flex h-full">
    <!--HEADER-->
    <AppHeader class="w-full bg-white-100 py-3">
      <div class="md:hidden">
        <IconBurger class="fill-green-100" @click="drawer = true" />
        <el-drawer
          v-model="drawer"
          size="50%"
        >
          <template #default>
            <ul class="flex flex-col text-[16px] items-start gap-3">
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
          </template>
        </el-drawer>
      </div>

      <ul class="hidden md:flex md:text-[20px] justify-between items-center gap-3 lg:gap-11 leading-8">
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
    <el-main class="flex-grow md:border-b-[28px] border-b-grey-30">
      <slot />
    </el-main>

    <!-- FOOTER -->
    <el-footer>
      <AppFooter />
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
const drawer = ref(false)
</script>
