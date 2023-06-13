<template>
  <section class="py-10">
    <div class="container mx-auto px-6 md:flex gap-4">
      <el-aside class="hidden md:block text-center w-1/3">
        <el-card class="p-5 text-left">
          <div class="space-y-3">
            <h3 class="text-[20px] lg:text-[22px]">Price per hour</h3>
            <el-slider
              v-model="priceFilter"
              label="Price per hour"
              range
              :min="0"
              :max="100"
            />
            <div class="flex justify-between gap-2">
              <el-input v-model="inputMin" type="number" class="h-7" />
              <span> - </span>
              <el-input v-model="inputMax" type="number" class="h-7" />
            </div>
          </div>

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
              <div class="space-y-3">
                <h3 class="text-[22px]">Price per hour</h3>
                <el-slider
                  v-model="priceFilter"
                  label="Price per hour"
                  range
                  :min="0"
                  :max="100"
                />
                <div class="flex justify-between gap-2">
                  <el-input v-model="inputMin" type="number" class="h-7" />
                  <span> - </span>
                  <el-input v-model="inputMax" type="number" class="h-7" />
                </div>
              </div>

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
            v-for="item in photographers"
            :key="item.id"
          >
            <OnePhotographerCard :photographer="item" class="hover:scale-105" />
          </li>
        </ul>

        <el-pagination
          v-model:page-size="pageSize"
          v-model:current-page="currentPage"
          background
          layout="prev, pager, next"
          :total="totalPhotographersLength"
          class="mt-7 justify-center"
          hide-on-single-page
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '../store/categories'
import { usePhotographersStore } from '../store/photographers'

definePageMeta({
  layout: 'user'
})

const drawer = ref(false)

const photographersStore = usePhotographersStore()
const { getAllPhotographers } = photographersStore
const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const photographers = ref([])

let timeoutId = null

// Price filter
const inputMin = ref(0)
const inputMax = ref(100)

const priceFilter = ref([0, 100])

watch(priceFilter, (newValue) => {
  inputMin.value = Number(newValue[0])
  inputMax.value = Number(newValue[1])
  clearTimeout(timeoutId)
  timeoutId = setTimeout(async () => {
    currentPage.value = 1
    const res = await getAllPhotographers({
      page: currentPage.value,
      minPrice: String(newValue[0]),
      maxPrice: String(newValue[1])
    })
    totalPhotographersLength.value = res.length
    photographers.value = res
  }, 500)
})

watch([inputMin, inputMax], (newValues) => {
  priceFilter.value = newValues
  clearTimeout(timeoutId)
  timeoutId = setTimeout(async () => {
    const res = await getAllPhotographers({ minPrice: String(newValues[0]), maxPrice: String(newValues[1]) })
    totalPhotographersLength.value = res.length
    photographers.value = await getAllPhotographers({
      page: currentPage.value,
      perPage: pageSize.value,
      minPrice: String(newValues[0]),
      maxPrice: String(newValues[1])
    })
  }, 500)
})

// Categories filter
const selectedTypes = ref()

async function handleSelectedTypes () {
  // currentPage.value = 1
  if (selectedTypes.value.length === 0) {
    const res = await getAllPhotographers({ page: currentPage.value })
    totalPhotographersLength.value = res.length
    photographers.value = await getAllPhotographers({ page: currentPage.value, perPage: pageSize.value })
  } else {
    // const res = await getAllPhotographers({
    //   categories: selectedTypes.value
    // })
    // totalPhotographersLength.value = res.length

    // photographers.value = await getAllPhotographers({
    //   page: currentPage.value,
    //   perPage: pageSize.value,
    //   categories: selectedTypes.value
    // })
    const total = await getAllPhotographers({
      page: currentPage.value,
      categories: selectedTypes.value
    })
    totalPhotographersLength.value = total.length
    photographers.value = await getAllPhotographers({
      page: currentPage.value,
      categories: selectedTypes.value
    })
  }
}

// Date filter
const selectedDate = ref('')

async function handleSelectedDate () {
  currentPage.value = 1
  const res = await getAllPhotographers({
    page: currentPage.value,
    freeDay: selectedDate.value
  })
  totalPhotographersLength.value = res.length
  photographers.value = await getAllPhotographers({
    page: currentPage.value,
    perPage: pageSize.value,
    freeDay: selectedDate.value
  })
}

// City filter
const cityInput = ref()

watch(cityInput, (newValue) => {
  currentPage.value = 1
  clearTimeout(timeoutId)
  timeoutId = setTimeout(async () => {
    if (!newValue) {
      const res = await getAllPhotographers({ page: currentPage.value })
      totalPhotographersLength.value = res.length
      photographers.value = await getAllPhotographers({ page: currentPage.value, perPage: pageSize.value })
    } else {
      photographers.value = await getAllPhotographers({ page: currentPage.value, city: newValue })
      totalPhotographersLength.value = photographers.value.length
    }
  }, 300)
})

// Ascend/descend filter
const priceSortSelect = ref(null)

async function handlePriceSort () {
  if (priceSortSelect.value === 'ascend') {
    photographers.value = photographers.value.sort((a, b) => {
      return computedMinCost(a.user_metadata.photoTypes) - computedMinCost(b.user_metadata.photoTypes)
    })
  } else if (priceSortSelect.value === 'descend') {
    photographers.value = photographers.value.sort((a, b) => {
      return computedMinCost(b.user_metadata.photoTypes) - computedMinCost(a.user_metadata.photoTypes)
    })
  } else {
    photographers.value = fetchAllPhotographers({ page: 1 })
  }
}

// Pagination logic

const pageSize = ref(4)
const currentPage = ref(1)

async function handleCurrentChange (newPage) {
  loading.value = true
  currentPage.value = newPage
  photographers.value = await getAllPhotographers({
    page: newPage,
    perPage: pageSize.value,
    categories: selectedTypes.value
  })
  loading.value = false
}

async function handleClearFilters () {
  currentPage.value = 1
  inputMin.value = 0
  inputMax.value = 100
  selectedTypes.value = []
  selectedDate.value = ''
  const res = await getAllPhotographers({ page: currentPage.value })
  totalPhotographersLength.value = res.length
  photographers.value = await getAllPhotographers({ page: currentPage.value, perPage: pageSize.value })
}

// async function fetchAllPhotographers ({ page, perPage, minPrice, maxPrice, city, categories, freeDay }) {
//   try {
//     photographers.value = await getAllPhotographers({
//       page: page ?? currentPage.value,
//       perPage: perPage ?? pageSize.value,
//       minPrice: minPrice ?? inputMin.value,
//       maxPrice: maxPrice ?? inputMax.value,
//       city: city ?? cityInput.value,
//       categories: categories ?? selectedTypes.value,
//       freeDay: freeDay ?? selectedDate.value
//     })
//   } catch (error) {
//     console.error(error)
//   }
// }

const totalPhotographersLength = ref()

const loading = ref(false)

async function catalogInit () {
  try {
    loading.value = true
    const allPhotographers = await getAllPhotographers({ page: currentPage.value })
    totalPhotographersLength.value = allPhotographers.length
    photographers.value = await getAllPhotographers({ page: currentPage.value, perPage: pageSize.value })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
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

/* .el-loading-spinner {
  .el-loading-text {
    @apply text-green-80
  };

  .circle {
    @apply stroke-green-80
  }
} */
</style>
