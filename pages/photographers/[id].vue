<template>
  <section class="py-6 lg:py-10">
    <div class="container mx-auto px-6">
      <NuxtLink :to="{name: 'catalog'}" class="flex gap-2 items-center mb-3 text-grey-100">
        <IconArrowRight class="rotate-180" />
        <p class="text-[16px] md:text-[18px]">Back to catalog</p>
      </NuxtLink>
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- DesktopCards -->
        <div class="hidden lg:block space-y-6 w-[35%] shrink-0">
          <el-card class="p-4">
            <div class="flex justify-start items-center gap-3">
              <div
                class="flex items-center justify-center w-[104px] h-[104px] rounded-full shrink-0 overflow-hidden"
              >
                <img
                  class="object-cover"
                  :src="portfolio?.user_metadata?.avatarUrl"
                  alt="avatar"
                >
              </div>

              <p class="text-[26px]">
                {{ portfolio?.user_metadata?.first_name }} {{ portfolio?.user_metadata?.second_name }}
              </p>
            </div>

            <ul class="mt-8 flex flex-wrap gap-5">
              <li
                v-for="item in availableCategories"
                :key="item.id"
                class="text-[18px] px-4 py-2 border-2 rounded-sm"
                :style="{borderColor: `var(--${item.color})`}"
              >
                {{ item.title }}
              </li>
            </ul>

            <div class="flex items-center justify-between gap-2 mt-5">
              <NuxtLink :to="'/booking/' + `photographer-${$route.params.id}`">
                <Button class="w-[200px]">Book now</Button>
              </NuxtLink>
              <IconFavourites class="fill-green-80" />
              <IconPhone class="fill-green-80" />
            </div>
          </el-card>

          <el-card class="p-4">
            <div class="border-b border-b-green-80 flex justify-between gap-5 pb-3">
              <div class="">
                <p class="text-green-80 font-normal">Photography in </p>
                <div class="flex gap-2 items-center">
                  <IconLocation class="w-8 h-8" />
                  <p>{{ portfolio?.user_metadata.city }}</p>
                </div>
              </div>
              <div>
                <p class="text-green-80 font-normal">Responds within</p>
                <div class="flex gap-2 items-center">
                  <IconTimer class="fill-green-80 w-8 h-8" />
                  <p>3 hours</p>
                </div>
              </div>
            </div>

            <div class="border-b border-b-green-80 flex justify-between gap-5 pb-3 pt-2">
              <div class="">
                <p class="text-green-80 font-normal">Order delivery date</p>
                <div class="flex gap-2 items-center">
                  <IconClock class="fill-green-80 w-8 h-8" />
                  <p>{{ portfolio?.user_metadata.deliveryTime }} days</p>
                </div>
              </div>
              <div>
                <p class="text-green-80 font-normal">Work experience</p>
                <div class="flex gap-2 items-center">
                  <IconCamera class="w-8 h-8 stroke-green-80 fill-transparent" />
                  <p>{{ portfolio?.user_metadata.experience }}</p>
                </div>
              </div>
            </div>

            <div class="mt-3">
              <h3 class="text-green-80">About me</h3>
              <p class="text-[18px]">{{ portfolio?.user_metadata?.about }}</p>
            </div>
          </el-card>

          <el-card class="p-4 custom-body">
            <h3 class="text-[22px] text-grey-100 text-center">
              Would you like more information about the photographer?
            </h3>

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
          </el-card>
        </div>

        <!-- MobileCard -->
        <div class="lg:hidden">
          <el-card class="max-w-[450px] p-6">
            <div class="flex justify-start items-center gap-3">
              <div
                class="flex items-center justify-center w-[92px] h-[92px] md:w-[104px] md:h-[104px]
                rounded-full shrink-0 overflow-hidden"
              >
                <img
                  class="object-cover w-full h-full"
                  :src="portfolio?.user_metadata?.avatarUrl"
                  alt="avatar"
                >
              </div>

              <p class="text-[18px] md:text-[22px]">
                {{ portfolio?.user_metadata?.first_name }} {{ portfolio?.user_metadata?.second_name }}
              </p>
            </div>

            <ul class="py-5 flex flex-wrap gap-3 border-b border-b-green-40">
              <li
                v-for="item in availableCategories"
                :key="item.id"
                class="text-[16px] px-4 py-2 border-2 rounded-sm"
                :style="{borderColor: `var(--${item.color})`}"
              >
                {{ item.title }}
              </li>
            </ul>

            <div class="py-4">
              <div class="border-b border-b-green-40 flex justify-between gap-5 pb-3">
                <div class="">
                  <p class="text-[16px] text-green-80 font-normal">Photography in </p>
                  <div class="flex gap-1 items-center">
                    <IconLocation class="w-8 h-8" />
                    <p class="text-[16px]">{{ portfolio?.user_metadata.city }}</p>
                  </div>
                </div>
                <div>
                  <p class="text-[16px] text-green-80 font-normal">Responds within</p>
                  <div class="flex gap-1 items-center">
                    <IconTimer class="fill-green-80 w-8 h-8" />
                    <p class="text-[16px]">3 hours</p>
                  </div>
                </div>
              </div>

              <div class="border-b border-b-green-40 flex justify-between gap-5 pb-3 pt-2">
                <div class="">
                  <p class="text-[16px] text-green-80 font-normal">Order delivery date</p>
                  <div class="flex gap-1 items-center">
                    <IconClock class="fill-green-80 w-8 h-8" />
                    <p class="text-[16px]">{{ portfolio?.user_metadata.deliveryTime }} days</p>
                  </div>
                </div>
                <div>
                  <p class="text-[16px] text-green-80 font-normal">Work experience</p>
                  <div class="flex gap-1 items-center">
                    <IconCamera class="w-8 h-8 stroke-green-80 fill-transparent" />
                    <p class="text-[16px]">{{ portfolio?.user_metadata.experience }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-3">
                <h3 class="text-[16px] text-green-80">About me</h3>
                <p class="text-[16px]">{{ portfolio?.user_metadata?.about }}</p>
              </div>
            </div>

            <div class="flex items-center justify-between gap-1 mt-3">
              <NuxtLink :to="'/booking/' + `photographer-${$route.params.id}`">
                <Button class="w-[165px]">Book now</Button>
              </NuxtLink>
              <IconFavourites class="fill-green-80" />
              <IconPhone class="fill-green-80" />
            </div>
          </el-card>
        </div>

        <div class="w-full">
          <el-tabs v-model="activeName" class="w-full">
            <el-tab-pane label="Portfolio" name="portfolio">
              <PortfolioTab :availableCategories="availableCategories" :user="portfolio" />
            </el-tab-pane>
            <el-tab-pane label="Price" name="price">
              <PriceTab :availableCategories="availableCategories" :user="portfolio" />
            </el-tab-pane>
            <el-tab-pane label="Availability " name="availability">
              <AvailabilityTab :user="portfolio" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePhotographersStore } from '../../store/photographers'
import { useCategoriesStore } from '../../store/categories'

definePageMeta({
  layout: 'user'
})

const route = useRoute()

const photographersStore = usePhotographersStore()
const { getOneUser } = photographersStore
const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const portfolio = ref()

const activeName = ref('portfolio')

const availableCategories = ref()

const data = await getOneUser({ userId: route.params.id })
portfolio.value = data.user

const computedCategories = computed(() => {
  return categories.value.filter(category => {
    return Object.keys(portfolio.value.user_metadata.photoTypes).includes(String(category.id))
  })
})

availableCategories.value = computedCategories.value
</script>

<style lang="scss">
.custom-body .el-card__body {
  @apply flex flex-col items-center gap-4
}

.el-radio-button__inner {
  @apply hover:text-green-80
}
</style>
