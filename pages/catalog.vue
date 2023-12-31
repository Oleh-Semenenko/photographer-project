<template>
  <section class="py-10">
    <div class="container mx-auto px-6 md:flex gap-4">
      <el-aside class="hidden md:block text-center w-1/3">
        <el-card class="p-5 text-left">
          <div class="space-y-3 mt-5">
            <h3 class="text-[20px] lg:text-[22px]">Types of photography</h3>

            <el-checkbox-group
              v-model="selectedTypes"
              v-loading="loading"
              class="flex flex-col gap-3"
              element-loading-text="Loading..."
              background="#375F47"
              @change="handleSelectedTypes"
            >
              <el-checkbox v-for="item in categories" :key="item.title" :label="item.id.toString()">
                {{ item.title }}
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="space-y-2 lg:space-y-3 mt-3 lg:mt-5">
            <h3 class="text-[20px] lg:text-[22px]">Calendar</h3>

            <el-date-picker
              v-model="selectedDate"
              placeholder="Pick a day"
              type="date"
              class="max-w-3/4"
              @change="handleSelectedDate"
            />
          </div>
        </el-card>

        <el-button text class="text-grey-100 mt-6" @click="handleClearFilters">Clear filter</el-button>
      </el-aside>

      <div class="flex-grow">
        <h2 class="relative text-[22px] md:text-[28px] lg:text-[32px] leading-[1.5] mb-5 after-element after:w-[258px]">
          Photographers
        </h2>

        <div class="md:flex md:items-center gap-3 sm:justify-between sm:gap-5">
          <el-input
            v-model="cityInput"
            placeholder="Start entering city name"
            class="w-full md:w-[40%] md:flex-grow"
            size="small"
          >
            <template #append>
              <el-button class="bg-white-50 w-[52px]">
                <IconSearch />
              </el-button>
            </template>
          </el-input>

          <div class="flex items-center justify-between mt-8 md:mt-0">
            <el-select v-model="priceSortSelect" placeholder="price" class="w-28" @change="handlePriceSort">
              <el-option label="Default" value="default" />
              <el-option label="Ascend" value="ascend" />
              <el-option label="Descend" value="descend" />
            </el-select>

            <Button class="md:hidden bg-transparent border-0" @click="drawer = true">
              <template #icon>
                <IconFilters class="fill-green-100" />
              </template>
              <span class="text-green-100">Filters</span>
            </Button>

            <el-drawer
              v-model="drawer"
              size="75%"
            >
              <div class="space-y-3 mt-5">
                <h3 class="text-[22px]">Types of photography</h3>

                <el-checkbox-group v-model="selectedTypes" class="flex flex-col gap-3" @change="handleSelectedTypes">
                  <el-checkbox v-for="item in categories" :key="item.title" :label="item.id.toString()">
                    {{ item.title }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>

              <div class="space-y-3 mt-5">
                <h3 class="text-[22px]">Calendar</h3>

                <el-date-picker
                  v-model="selectedDate"
                  placeholder="Pick a day"
                  type="date"
                  size="large"
                  @change="handleSelectedDate"
                />
              </div>

              <el-button text class="text-grey-100 mt-6" @click="handleClearFilters">Clear filter</el-button>
            </el-drawer>
          </div>
        </div>

        <ul
          v-loading="loading"
          element-loading-text="Loading..."
          class="mt-3 md:mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <li
            v-for="item in filteredPhotographers"
            :key="item.id"
          >
            <OnePhotographerCard :id="item.id" :photographer="item.user_metadata" class="hover:scale-105" />
          </li>
        </ul>
        <div
          v-if="filteredPhotographers?.length === 0 && !loading"
          class="text-[24px] md:text-[32px]"
        >
          Sorry, no photographers found
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getAllPhotographers } from '../services/photographers.service'
import { useCategoriesStore } from '../store/categories'

definePageMeta({
  layout: 'user'
})

const drawer = ref(false)

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const photographers: Ref = ref([])
const filteredPhotographers = ref()

let timeoutId: number | NodeJS.Timeout | null | undefined = null

// Categories filter
const selectedTypes = ref()

function handleSelectedTypes () {
  filteredPhotographers.value = filterUsers(
    photographers.value,
    selectedTypes.value,
    selectedDate.value)
}

// Date filter
const selectedDate = ref('')

function handleSelectedDate () {
  filteredPhotographers.value = filterUsers(
    photographers.value,
    selectedTypes.value,
    selectedDate.value)
}

// City filter
const cityInput = ref()

watch(cityInput, (newValue) => {
  clearTimeout(timeoutId as number | NodeJS.Timeout)
  timeoutId = setTimeout(async () => {
    if (!newValue) {
      filteredPhotographers.value = await getAllPhotographers({ page: 1 })
    } else {
      filteredPhotographers.value = await getAllPhotographers({ page: 1, city: newValue })
    }
  }, 300)
})

// Ascend/descend filter
const priceSortSelect = ref('')

async function handlePriceSort () {
  if (priceSortSelect.value === 'ascend') {
    filteredPhotographers.value = filteredPhotographers.value.sort((a: any, b: any) => {
      return computedMinCost(a.user_metadata.photoTypes) - computedMinCost(b.user_metadata.photoTypes)
    })
  } else if (priceSortSelect.value === 'descend') {
    filteredPhotographers.value = filteredPhotographers.value.sort((a: any, b: any) => {
      return computedMinCost(b.user_metadata.photoTypes) - computedMinCost(a.user_metadata.photoTypes)
    })
  } else {
    filteredPhotographers.value = await getAllPhotographers({ page: 1 })
  }
}

async function handleClearFilters () {
  selectedTypes.value = []
  selectedDate.value = ''
  cityInput.value = ''
  filteredPhotographers.value = await getAllPhotographers({ page: 1 })
}

const loading = ref(false)

async function catalogInit () {
  try {
    loading.value = true
    const allPhotographers = await getAllPhotographers({ page: 1 })
    photographers.value = allPhotographers

    filteredPhotographers.value = filterUsers(
      allPhotographers,
      selectedTypes.value,
      selectedDate.value)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

function filterUsers (
  users: any[],
  selectedCategories: string[],
  selectedDate: string | undefined
) {
  if (selectedCategories?.length) {
    users = users.filter((u) => {
      if (u.user_metadata.photoTypes) {
        return Object.keys(u.user_metadata.photoTypes).some(k => selectedCategories.includes(k))
      }
    })
    return users
  } else if (selectedDate) {
    users = users.filter(u => {
      if (u.user_metadata.weekend) {
        return !u.user_metadata.weekend.includes(selectedDate)
      }
    })
    return users
  } else {
    return users
  }
}

onMounted(catalogInit)

</script>

<style lang="scss">
.el-date-table td.today .el-date-table-cell__text {
  @apply text-green-80
}

.el-input__suffix {
  @apply bg-transparent
}

.el-input-group__append .el-button {
  @apply flex items-center justify-center
}

.el-input .el-input__wrapper {
  @apply bg-transparent
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  @apply text-green-80
}

.el-date-editor {
  @apply max-w-[90%]
}
</style>
