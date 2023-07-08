<template>
  <div class="mt-5">
    <el-radio-group v-model="checkedType" class="hidden lg:flex flex-wrap gap-3" @change="handleCategorySelect">
      <el-radio-button label="All categories" size="large">All categories</el-radio-button>
      <el-radio-button
        v-for="(type) in props.availableCategories"
        :key="type.id"
        :label="type.id"
        size="large"
      >
        {{ type.title }}
      </el-radio-button>
    </el-radio-group>

    <el-select v-model="checkedType" placeholder="Select category" class="lg:hidden" @change="handleCategorySelect">
      <el-option label="All categories" value="All categories">All categories</el-option>
      <el-option
        v-for="item in props.availableCategories"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      >
        {{ item.title }}
      </el-option>
    </el-select>

    <div class="flex flex-col items-center lg:items-stretch gap-3">
      <ul
        class="grid grid-cols-1 lg:grid-cols-2 max-w-[382px] lg:max-w-none
      auto-cols-[244px]  lg:auto-rows-[250px] lg:auto-cols-[250px] gap-2 lg:gap-3 mt-3"
      >
        <li class="lg:w-full lg:h-full">
          <el-image
            width="250" height="250" :src="images[0]"
            alt="Example photo"
            class="w-[312px] h-[244px] sm:w-[382px] lg:w-full lg:h-full
            hover:scale-105 transition-transform"
          />
        </li>

        <li v-if="images.length > 1" class="grid grid-cols-2 grid-rows-2 gap-2">
          <div v-for="url in images.slice(1, 5)" :key="url" class=" lg:w-auto lg:h-auto">
            <el-image

              width="121" height="121"
              :src="url"
              alt="Example photo"
              class="w-[150px] h-[150px] sm:w-[185px] sm:h-[185px] lg:w-full lg:h-full
              hover:scale-105 transition-transform"
            />
          </div>
        </li>
      </ul>
      <ul
        v-if="images.length > 5"
        class="grid grid-cols-1 lg:grid-cols-2 max-w-[382px] lg:max-w-none
      auto-cols-[244px] lg:auto-rows-[250px] lg:auto-cols-[250px] gap-2 lg:gap-3"
      >
        <li v-if="images[5]">
          <el-image
            width="250" height="250" :src="images[5]"
            alt="Example photo"
            class="w-[312px] h-[244px] sm:w-[382px] lg:w-full lg:h-full
            hover:scale-105 transition-transform"
          />
        </li>
        <li v-if="images.length > 5" class="grid grid-cols-2 grid-rows-2 gap-2">
          <el-image
            v-for="url in images.slice(6, 10)" :key="url"
            width="121" height="121"
            :src="url"
            alt="Example photo"
            class="w-[150px] h-[150px] sm:w-[185px] sm:h-[185px] lg:w-full lg:h-auto
            hover:scale-105 transition-transform"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ICategory, IPhoto, IPhotoTypes } from '~/types/global.types'

const props = defineProps<{
  availableCategories: ICategory[]
  user: any
}>()

const checkedType = ref('All categories')
const photoTypes: IPhotoTypes = reactive(props.user?.user_metadata.photoTypes)
const allPhotos = computed(() => {
  return Object.values(photoTypes).flatMap(type => type.photos).map(item => item.url)
})
const images = ref(allPhotos.value)

function handleCategorySelect () {
  if (photoTypes.hasOwnProperty(String(checkedType.value))) {
    images.value = photoTypes[(String(checkedType.value)) as any].photos.map((item: IPhoto) => item.url)
  } else {
    images.value = allPhotos.value
  }
}
</script>
