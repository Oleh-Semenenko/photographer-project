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
      <div class="w-[40%] flex flex-grow flex-col md:flex-row gap-3 md:gap-5">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="Pick a date"
          size="large"
          :clearable="false"
          :disabled-date="disabledDate"
          @change="handleDateChange"
        />

        <el-card class="border-l-[12px] md:border-l-[18px] border-l-green-40 h-full overflow-hidden">
          <template #header>
            <div class="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-3">
              <span class="text-[18px] md:text-[20px] text-green-80 font-normal">Weekend</span>
              <el-button class="non-active h-5 md:h-7 text-[18px]" @click="clearAllDates">Cancel all</el-button>
              <el-button class="h-5 md:h-7 text-[18px]" @click="onSave">Save</el-button>
            </div>
          </template>
          <ul class="px-3 py-2 md:p-4 space-y-1 sm:space-y-2 max-h-[230px] overflow-y-auto">
            <li
              v-for="d in visibleSelectedDates"
              :key="d"
              class="flex items-center justify-between text-[16px] md:text-[18px] border-b border-b-green-60 pb-1"
            >
              {{ d }}
              <el-button class="bg-transparent hover:bg-transparent border-none p-0" @click="onDelete(d)">
                <IconClose class="fill-black-80 hover:fill-green-80 cursor-pointer" />
              </el-button>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePhotographerStore } from '../../../store/photographer'
import { formateDate } from '../../../utils/formate-date'
import { successNotification } from '../../../utils/notification'
const user = useSupabaseUser()

const photographerStore = usePhotographerStore()
const { updateUserOptionalData } = photographerStore

const date = ref()
const selectedDates = ref(user.value.user_metadata.weekend || [])

const visibleSelectedDates = computed(() => {
  return selectedDates.value.map(date => formateDate(new Date(date), {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    formatMatcher: 'basic'
  }))
})

function handleDateChange () {
  console.log(date.value)
  selectedDates.value.push(date.value)
}

function onDelete (date) {
  selectedDates.value = selectedDates.value.filter(d => {
    return formateDate(new Date(d), {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      formatMatcher: 'basic'
    }) !== date
  })
}

function clearAllDates () {
  selectedDates.value = []
}

async function onSave () {
  console.log(selectedDates.value)
  const data = await updateUserOptionalData({ weekend: [...selectedDates.value] })
  data && successNotification('Your weekend has been successfully saved')
}

function disabledDate (date) {
  return date.getTime() < Date.now()
}
</script>
