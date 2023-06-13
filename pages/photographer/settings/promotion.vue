<template>
  <div class="container mx-auto px-6">
    <h2
      class="relative text-[22px] md:text-[28px] lg:text-[32px] leading-[1.5] mb-5
    after-element after:w-[140px] after:left-4 md:after:w-[200px] md:after:top-0
    lg:after:w-[358px] lg:after:left-10"
    >
      Profile settings
    </h2>
    <SettingsMobileMenu />
    <div class="flex gap-4">
      <SettingsCard />
      <el-card>
        <template #header>
          <div class="text-[16px] md:text-[18px] text-black-80 font-normal px-4 py-3">
            Promotion feature allows you to promote your profile to the top photographers in your city.
          </div>
        </template>

        <div class="px-4 py-6 space-y-[24px] md:space-y-[32px]">
          <el-radio-group v-model="selectedPromotionType">
            <ul class="flex flex-wrap gap-3 sm:gap-4">
              <li
                v-for="item in promotionTypes"
                :key="item.id"
                class="relative border-l-8 border-l-yellow-100 p-6 bg-green-40 w-[185px] lg:w-[226px]"
              >
                <p class="text-[16px] md:text-[18px] text-black-80">{{ item.duration }}</p>
                <p class="text-[22px] md:text-[26px] text-green-100 font-normal font-serif">{{ item.cost }}</p>
                <el-radio
                  :label="item.id"
                  class="absolute top-3 right-3 rounded-full w-9 h-9 bg-white-100 border border-green-80
              flex items-center justify-center"
                />
              </li>
            </ul>
          </el-radio-group>

          <ul v-if="selectedTypeData" class="text-[16px] md:text-[18px] font-serif space-y-[16px] sm:space-y-[20px]">
            <li class="flex items-center gap-1 md:gap-3">
              <IconEye class="fill-green-80" />
              <p>{{ selectedTypeData.views }}</p>
            </li>
            <li class="flex items-center gap-1 md:gap-3">
              <IconLightning class="fill-green-80" />
              <p>{{ selectedTypeData.speedOfOrders }}</p>
            </li>
            <li class="flex items-center gap-1 md:gap-3">
              <IconHandPointing class="fill-green-80" />
              <p>{{ selectedTypeData.reviews }}</p>
            </li>
          </ul>

          <Button class="w-full sm:w-[224px]" @click="onPromotionTypeSave">Pay {{ selectedTypeData?.cost }}</Button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePromotionStore } from '../../../store/promotion'
import { usePhotographerStore } from '../../../store/photographer'
import { successNotification } from '../../../utils/notification'

const promotionStore = usePromotionStore()
const { getPromotionTypes } = promotionStore
const photographerStore = usePhotographerStore()
const { updateUserOptionalData } = photographerStore

const promotionTypes = ref([])
const selectedPromotionType = ref(promotionTypes.value[0])
const selectedTypeData = computed(() => {
  return promotionTypes.value.filter(t => t.id === selectedPromotionType.value)[0]
})

async function onPromotionTypeSave () {
  const {
    reviews, speedOfOrders, views
    , ...rest
  } = selectedTypeData.value
  const data = await updateUserOptionalData({ promotion: { ...rest } })
  data && successNotification('Your promotion type has been saved successfully')
}

onMounted(async () => {
  promotionTypes.value = await getPromotionTypes()
  selectedPromotionType.value = promotionTypes.value[0].id
})
</script>
