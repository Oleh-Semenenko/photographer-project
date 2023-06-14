<template>
  <div class="mt-5 space-y-6">
    <ul class="flex gap-6">
      <li class="flex gap-2 items-center">
        <div class="w-10 h-10 bg-white-100 text-grey-50 flex items-center justify-center">01</div>
        <p>Busy</p>
      </li>
      <li class="flex gap-2 items-center">
        <div class="w-10 h-10 bg-green-40 text-green-100 flex items-center justify-center">01</div>
        <p>Available</p>
      </li>
    </ul>

    <el-calendar
      v-model="selectedDate"
    >
      <template #date-cell="{ data }">
        <p :class="disabledDate(data.date) ? 'is-disable' : 'is-available'">
          {{ formateDate(data.date, {
            day: '2-digit'
          }) }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { formateDate } from '../utils/formate-date'
const props = defineProps({
  user: Object
})
const selectedDate = ref(new Date())
const weekend = reactive(props.user?.user_metadata.weekend)

const disabledDate = (time: Date) => {
  const dateString = time.toISOString().split('T')[0]
  return weekend.map((d: string) => d.split('T')[0]).includes(dateString)
}
</script>
