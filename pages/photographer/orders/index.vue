<template>
  <div class="container mx-auto px-6">
    <h2
      class="relative text-[22px] md:text-[28px] lg:text-[32px]
    leading-[1.5] mb-6 after-element after:w-[158px]"
    >
      Orders
    </h2>
    <TableModule
      class="hidden sm:block"
      hide-on-single-page
      :headings="columns"
      :items="orders"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :handleClick="handleRowClick"
    >
      <template #id="{row}">
        <div>
          {{ row.id }}
        </div>
      </template>
      <template #client="{row}">
        <div>
          {{ row.client_name }}
        </div>
      </template>
      <template #date="{row}">
        <div>
          {{ formateDate(new Date(row.date), {month: 'numeric', day: '2-digit', year: 'numeric'}) }}
        </div>
      </template>
      <template #time="{row}">
        <div>
          {{ row.time[0] }} - {{ row.time[1] }}
        </div>
      </template>
      <template #type="{row}">
        <div>
          {{ categories[row.photoType]?.title }}
        </div>
      </template>
      <template #phone="{row}">
        <div>
          {{ row.client_phone }}
        </div>
      </template>
      <template #confirmation="{row}">
        <div
          :style="{ color: row.confirmation === 'Waiting for confirmation' ? 'var(--green-80)'
            : (row.confirmation === 'Rejected' ? 'var(--red)' : '') }"
        >
          {{ row.confirmation }}
        </div>
      </template>
    </TableModule>

    <!-- Mobile orders -->
    <ul
      class="sm:hidden space-y-3"
      :currentPage="currentPage"
    >
      <li
        v-for="item in paginatedOrders"
        :key="item?.id"
        @click="handleRowClick(item)"
      >
        <el-card class="py-3">
          <div class="px-3 py-2 flex justify-between gap-2">
            <div>
              <p class="text-[14px] text-green-80 font-serif">{{ item.photoType }}</p>
              <p class="text-[14px] text-black-80 font-serif">{{ item.id }}</p>
            </div>
          </div>
          <div class="px-3 flex justify-between gap-2 bg-grey-50">
            <p class="text-[14px] text-grey-100 font-serif">Date and time:</p>
            <p class="text-[14px] text-black-80">
              {{ formateDate(new Date(item.date), {month: 'numeric', day: '2-digit', year: 'numeric'}) }}
              {{ item.time[0] }} - {{ item.time[1] }}
            </p>
          </div>
          <div class="px-3 flex justify-between gap-2">
            <p class="text-[14px] text-grey-100 font-serif">Сlient's name:</p>
            <p class="text-[14px] text-black-80">{{ item.client_name }}</p>
          </div>
          <div class="px-3 py-2 flex justify-between gap-2 bg-grey-50">
            <p
              class="text-[14px] text-black-80 font-serif"
              :style="{ color: item.confirmation === 'Waiting for confirmation' ? 'var(--green-80)'
                : (item.confirmation === 'Rejected' ? 'var(--red)' : '') }"
            >
              {{ item.confirmation }}
            </p>
          </div>
        </el-card>
      </li>
    </ul>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      background
      layout="sizes, prev, pager, next"
      :total="orders.length"
      class="mt-7"
      hide-on-single-page
    />

    <div v-if="selectedRow" class="mt-14">
      <h2 class="relative text-[22px] md:text-[28px] lg:text-[32px] leading-[1.5] mb-6 after-element after:w-[458px]">
        Order details and confirmation
      </h2>
      <div class="flex flex-col lg:flex-row gap-[5%]">
        <el-card class="md:w-[55%] p-5 md:p-10 shrink-0">
          <div class="flex items-center gap-7">
            <div>
              <p class="text-green-80">{{ selectedRow.client_name }}</p>
              <p class="text-[14px]">
                <span class="text-green-80">Confirmation status:</span>
                {{ selectedRow.confirmation }}
              </p>
            </div>
          </div>

          <ul class="grid grid-cols-2 gap-4 mt-9 text-[18px]">
            <li class="flex gap-3 lg:gap-4">
              <IconPhone class="hidden md:block fill-green-100 shrink-0" />
              <div class="shrink">
                <h3 class="text-green-80 text-[16px] md:text-[20px] font-serif font-normal">Phone</h3>
                <p class="text-[14px] md:text-[18px]">{{ selectedRow.client_phone }}</p>
              </div>
            </li>
            <li class="flex gap-3 lg:gap-4">
              <IconCalendar class="hidden md:block fill-green-100 shrink-0" />
              <div class="shrink">
                <h3 class="text-green-80 text-[16px] md:text-[20px] font-serif font-normal">Date</h3>
                <p class="text-[14px] md:text-[18px]">
                  {{ formateDate(new Date(selectedRow.date), {day: '2-digit', month: '2-digit', year: 'numeric'}) }}
                </p>
              </div>
            </li>
            <li class="flex gap-3 lg:gap-4">
              <IconFolder class="hidden md:block fill-green-100 shrink-0" />
              <div class="shrink">
                <h3 class="text-green-80 text-[16px] md:text-[20px] font-serif font-normal">Type</h3>
                <p class="text-[14px] md:text-[18px]">
                  {{ categories[selectedRow.photoType as any].title }}
                </p>
              </div>
            </li>
            <li class="flex gap-3 lg:gap-4">
              <IconClock class="hidden md:block fill-green-100 shrink-0" />
              <div class="shrink">
                <h3 class="text-green-80 text-[16px] md:text-[20px] font-serif font-normal">Time</h3>
                <p class="text-[14px] md:text-[18px]">{{ selectedRow.time[0] }} - {{ selectedRow.time[1] }}</p>
              </div>
            </li>
            <li class="flex gap-3 lg:gap-4">
              <IconLocation class="hidden md:block fill-green-100 shrink-0" />
              <div class="shrink">
                <h3 class="text-green-80 text-[16px] md:text-[20px] font-serif font-normal">City</h3>
                <p class="text-[14px] md:text-[18px]">{{ user?.user_metadata.city }}</p>
              </div>
            </li>
            <li class="flex gap-3 lg:gap-4">
              <IconNotepad class="hidden md:block fill-green-100 shrink-0" />
              <div class="shrink">
                <h3 class="text-green-80 text-[16px] md:text-[20px] font-serif font-normal">Order number</h3>
                <p class="text-[14px] md:text-[18px]">{{ selectedRow.id }}</p>
              </div>
            </li>
            <li class="flex gap-3 lg:gap-4">
              <IconCoins class="hidden md:block fill-green-100 shrink-0" />
              <div class="shrink">
                <h3 class="text-green-80 text-[16px] md:text-[20px] font-serif font-normal">Calculation</h3>
                <p class="text-[14px] md:text-[18px]">
                  Price per hour: {{ costPerHour }} €
                </p>
                <p class="text-[14px] md:text-[18px]">Number of hours: {{ durationTime }}</p>
                <p class="text-[16px] md:text-[20px] flex items-center gap-1 border-b border-b-green-80 pb-1">
                  <el-tooltip
                    placement="top-start"
                    effect="dark"
                    class="w-[200px] bg-slate-400 text-[12px] md:text-[14px]"
                  >
                    <template #content>
                      The commission of our service is 5% of the total amount of the order. <br> The amount calculated
                      in Total will be paid to your bank card after
                      the order completion status.
                    </template>
                    <IconQuestion class="fill-green-100" />
                  </el-tooltip>
                  Сommission: 5%
                </p>
                <p class="text-green-80 pt-2">Total: {{ totalCost }} €</p>
              </div>
            </li>
          </ul>
        </el-card>

        <div class="flex flex-col-reverse lg:flex-col gap-6">
          <Button
            v-if="selectedRow.confirmation === 'Waiting for confirmation'"
            class="flex-grow sm:flex-grow-0" @click="handleConfirmOrder"
          >
            Confirm the order
          </Button>
          <Button
            v-if="selectedRow.confirmation === 'Waiting for confirmation'"
            class="non-active flex-grow sm:flex-grow-0" @click="handleRejectOrder"
          >
            Reject the order
          </Button>

          <div class="mt-4 flex-grow-0">
            <h3 class="text-green-80">Client`s comment</h3>
            <el-card class="text-[14px] md:text-[18px] p-5 md:p-10 border-l-[12px] border-l-green-40 mt-2">
              {{ selectedRow.comment }}
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { updateOrderConfirmation, getAllOrdersById } from '../../../services/orders.service'
import { useCategoriesStore } from '../../../store/categories'
import { formateDate } from '../../../utils/formate-date'

import type { IOrder } from '~/types/global.types'
const user: any = useSupabaseUser()

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const columns = [
  { label: '№', value: 'id', width: '70' },
  { label: 'Client', value: 'client', width: '' },
  { label: 'Date', value: 'date', width: '110' },
  { label: 'Time', value: 'time', width: '' },
  { label: 'Type', value: 'type', width: '' },
  { label: 'Phone', value: 'phone', width: '' },
  { label: 'Confirmation', value: 'confirmation', width: '' }
]

const orders: Ref<IOrder[]> = ref([])
orders.value = await getAllOrdersById(user.value.id)

const selectedRow: Ref<IOrder | null> = ref(null)

const handleRowClick = (row: IOrder) => {
  if (selectedRow.value === row) {
    selectedRow.value = null
  } else {
    selectedRow.value = row
  }
}

const pageSize = ref(4)
const currentPage = ref(1)

const paginatedOrders = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return orders.value.slice(startIndex, endIndex)
})

const costPerHour = computed(() => {
  return user.value?.user_metadata.photoTypes[(selectedRow.value as any).photoType].cost
})

const durationTime: ComputedRef<number | undefined> = computed(() => {
  const startTimeParts = selectedRow.value?.time[0]?.split(':')
  const endTimeParts = selectedRow.value?.time[1]?.split(':')
  if (startTimeParts && endTimeParts) {
    const startTime = new Date(1970, 0, 1, parseInt(startTimeParts[0]), parseInt(startTimeParts[1]))
    const endTime = new Date(1970, 0, 1, parseInt(endTimeParts[0]), parseInt(endTimeParts[1]))

    return (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
  }
})

const totalCost = computed(() => {
  if (durationTime.value) {
    return durationTime.value * costPerHour.value * 0.05 + durationTime.value * costPerHour.value
  }
})

async function handleConfirmOrder () {
  if (selectedRow.value?.confirmation !== 'Confirmed') {
    selectedRow.value = await updateOrderConfirmation('Confirmed', (selectedRow.value as any).id)
  }
  selectedRow.value = null
}

async function handleRejectOrder () {
  await updateOrderConfirmation('Rejected', (selectedRow.value as any).id)
  selectedRow.value = null
}
</script>
