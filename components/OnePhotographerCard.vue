<template>
  <el-card class="py-3 px-4 max-w-[442px] md:max-w-[354px] flex flex-col h-full">
    <div class="hidden md:flex justify-between items-center">
      <IconCrownGold v-if="props.photographer.promotion" class="fill-yellow-100" />

      <el-tooltip :content="props.photographer.phoneNumber">
        <IconPhone class="fill-green-80 hover:cursor-pointer ml-auto" />
      </el-tooltip>
    </div>

    <NuxtLink :to="'/photographers/' + props.id" class="hover:text-current flex-grow h-full">
      <div class="flex flex-col gap-2 justify-between h-full">
        <div class="flex gap-2 mt-3 relative">
          <el-skeleton
            v-for="img in imageLinks" :key="img" animated
            class="w-[128px] h-[128px] md:w-[100px] md:h-[70px] lg:w-[128px] lg:h-[98px]" :loading="true"
          >
            <template #default>
              <el-skeleton-item style="width: 128px; height: 128px" />
            </template>
            <template #template>
              <img
                :src="img" width="128" height="128" alt="Photo example" class="object-cover
              w-[128px] h-[128px] md:w-[100px] md:h-[70px] lg:w-[128px] lg:h-[98px]"
              >
            </template>
          </el-skeleton>

          <div
            class="absolute top-[55%] right-0 flex items-center justify-center
            w-[100px] md:w-[80px] h-[100px] md:h-[80px]
        rounded-full shrink-0 overflow-hidden border-[7px]"
            :class="{'border-yellow-100 md:border-white-100': props.photographer.promotion,
                     'border-white-100': !props.photographer.promotion}"
          >
            <NameAbbr v-if="!props.photographer.avatarUrl" class="text-lg" />
            <img
              v-else
              class="object-cover"
              :src="props.photographer.avatarUrl"
              alt="avatar"
            >
          </div>
          <IconCrownGold
            v-if="props.photographer.promotion"
            class="absolute -bottom-11 right-0 fill-yellow-100 md:hidden stroke-white-100"
          />
        </div>

        <div class="pt-3 md:pt-5 flex flex-col flex-grow">
          <p class="text-[16px] md:text-[20px] font-serif italic">
            {{ props.photographer.first_name }} {{ props.photographer.second_name }}
          </p>
          <p class="text-[14px] md:text-[16px] text-grey-100 mt-1">
            {{ props.photographer.city }}
          </p>

          <p class="mt-1 text-[14px] line-clamp-3 text-ellipsis text-justify flex-grow">
            {{ props.photographer.about }}
          </p>
        </div>

        <div class="flex justify-between">
          <p class="text-sm text-grey-100 pt-2 border-t border-t-green-40">
            from
            <span class="text-black-100 text-[22px]">{{ minCost }}</span> €/per hour
          </p>

          <el-button
            class="md:hidden w-10 h-10 bg-transparent border-none hover:bg-transparent
         hover:text-green-80 focus:bg-transparent"
          >
            <el-tooltip :content="props.photographer.phoneNumber">
              <IconPhone class="fill-green-80 hover:cursor-pointer ml-auto" />
            </el-tooltip>
          </el-button>
        </div>
      </div>
    </NuxtLink>
  </el-card>
</template>

<script lang="ts" setup>
import type { IMetaData, IPhoto, IPhotoTypes } from '~/types/global.types'

const props = defineProps<{
  photographer: IMetaData
  id: string
}>()

const minCost = computed(() => {
  return computedMinCost(props.photographer.photoTypes as IPhotoTypes)
})

const imageLinks = computed(() => {
  if (props.photographer.photoTypes) {
    return Object.values(props.photographer?.photoTypes)
      .flatMap(item => item.photos.map((photo: IPhoto) => {
        if (!photo.url.includes('blob')) {
          return photo.url
        } else {
          return 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
        }
      })).slice(0, 3)
  } else {
    return [
      'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
      'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
      'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
    ]
  }
})

</script>

<style>
.el-card__body {
  @apply flex-grow flex flex-col justify-between
}
</style>
