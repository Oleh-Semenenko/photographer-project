<template>
  <section class="py-6">
    <div class="container mx-auto px-6">
      <el-steps :active="activeStep" finish-status="success">
        <el-step title="Personal info" />
        <el-step title="Type of photography" />
        <el-step title="Date" />
        <el-step title="Time" />
        <el-step title="Comment" />
        <el-step title="Finish" />
      </el-steps>

      <div class="flex flex-col lg:flex-row gap-4 mt-3">
        <div v-if="activeStep === 0">
          <h2 class="text-[22px] md:text-[26px]">Leave your personal information</h2>

          <el-card class="p-4 mt-3">
            <el-form
              ref="formRef"
              label-position="top"
              :model="formModel"
              :rules="formRules"
            >
              <el-form-item
                label="Name"
                prop="name"
              >
                <el-input
                  v-model="formModel.name"
                  class="el-input__inner"
                  placeholder="Enter your name"
                />
              </el-form-item>

              <el-form-item label="E-mail" prop="email">
                <el-input
                  v-model="formModel.email"
                  class="el-input__inner"
                  placeholder="Enter your email"
                />
              </el-form-item>

              <el-form-item label="Phone number" prop="phone">
                <el-input
                  v-model="formModel.phone"
                  v-maska
                  data-maska="+380#########"
                  class="el-input__inner"
                  placeholder="Enter your phone number"
                />
              </el-form-item>
            </el-form>
          </el-card>
        </div>

        <div v-if="activeStep === 1" class="flex-grow">
          <h2 class="text-[22px] md:text-[26px]">Choose the type of photography</h2>

          <el-radio-group v-model="newOrder.photoType" class="h-[50vh]  overflow-y-auto mt-3">
            <ul class="grid md:grid-cols-2 gap-3 pr-2 py-1">
              <li
                v-for="item in availableCategories"
                :key="item.id"
                class="text-[16px] bg-white-100 border-l-[16px] py-3 px-4 flex flex-col justify-between gap-2"
                :style="{borderLeftColor: `var(--${item.color})`,
                         boxShadow: selectedType === item.title
                           ? `15px 15px 15px -11px var(--${item.color})`
                           : 'none' }"
              >
                <div class="flex items-center justify-between">
                  <div
                    class="border py-1 px-3 mr-auto"
                    :style="{borderColor: `var(--${item.color})`}"
                  >
                    {{ item.title }}
                  </div>

                  <el-radio
                    :label="item.id"
                    class="rounded-full w-7 h-7 bg-white-100 border border-green-80"
                  />
                </div>

                <p class="flex-grow text-[16px] lg:text-[18px]">{{ photoTypes[String(item.id)].description }}</p>

                <div class="flex items-center gap-3">
                  <IconWallet class="fill-green-100" />
                  <p class="text-black-80">
                    {{ photoTypes[String(item.id)].cost }} €
                    <span class="text-grey-100">per hour</span>
                  </p>
                </div>
              </li>
            </ul>
          </el-radio-group>
        </div>

        <div v-if="activeStep === 2">
          <h2 class="text-[22px] md:text-[26px]">Choose the date of photography</h2>

          <div class="mt-3 space-y-6">
            <el-calendar
              v-model="newOrder.date"
            >
              <template #date-cell="{ data }">
                <p
                  :class="disabledDate(data.date) ? 'is-disable'
                    : (data.isSelected ? 'is-selected' : 'is-available')"
                >
                  {{ formateDate(data.date, {
                    day: '2-digit'
                  }) }}
                </p>
              </template>
            </el-calendar>

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
          </div>
        </div>

        <div v-if="activeStep === 3" class="flex-grow">
          <h2 class="text-[22px] md:text-[26px]">Choose a photography start time</h2>

          <el-card class="p-4 mt-3 text-center">
            <el-time-select
              v-model="newOrder.time[0]"
              :max-time="endTime"
              placeholder="Start time"
              start="09:00"
              step="01:00"
              end="20:00"
            />
            <span class="px-4"> - </span>
            <el-time-select
              v-model="newOrder.time[1]"
              :min-time="startTime"
              placeholder="End time"
              start="09:00"
              step="01:00"
              end="21:00"
            />
          </el-card>

          <h2 class="text-[22px] md:text-[26px] mb-4 mt-8">Photography duration</h2>
          <p class="text-[16px] md:text-[18px]">
            If you are not sure how many hours to choose, you can ask the photographer
            via his contact before or after placing an order. You will have the option to change
            the details of an order after it has been placed.
          </p>
        </div>

        <div v-if="activeStep === 4" class="flex-grow">
          <h2 class="text-[22px] md:text-[26px]">Leave a comment</h2>

          <el-card class="p-4 mt-3">
            <p class="mb-3">Comment to photography</p>
            <el-input
              v-model="newOrder.comment"
              :rows="2"
              type="textarea"
              placeholder="Please leave your comment"
              maxlength="450"
              show-word-limit
            />
          </el-card>
        </div>

        <div v-if="activeStep === 5" class="flex-grow">
          <h2 class="text-[26px]">
            Thank you for booking!
          </h2>

          <el-card class="p-10 border-l-[28px] border-l-green-60 mt-3">
            <p>
              Usually this photographer provides confirmation within 1-2 days. You could check
              the status of your booking on the Orders page.
            </p>
            <p class="mt-6">
              We will send you a notification of the change in the booking status to your email address.
            </p>
          </el-card>

          <NuxtLink :to="{name: 'catalog'}">
            <Button class="mt-8">Back to catalog</Button>
          </NuxtLink>
        </div>

        <div v-if="activeStep > 0 && activeStep < 5" class="shrink-0 lg:w-[30%]">
          <h2 class="text-[22px] md:text-[26px]">Order Information</h2>

          <el-card class="p-5 mt-3">
            <div class="flex flex-col justify-start lg:items-center gap-3 pb-3 border-b border-b-green-60">
              <div class="flex flex-wrap justify-between gap-2 items-center">
                <p class="font-serif">Name:</p>
                <p class="text-[22px] shrink sm:text-[24px]">{{ formModel.name }}</p>
              </div>
              <div class="flex flex-wrap justify-between gap-2 items-center">
                <p class="font-serif">Email:</p>
                <p class="text-[18px] shrink sm:text-[20px]">{{ formModel.email }}</p>
              </div>
              <div class="flex flex-wrap justify-between gap-2 items-center">
                <p class="font-serif">Phone:</p>
                <p class="text-[18px] shrink sm:text-[20px]">{{ formModel.phone }}</p>
              </div>
            </div>

            <ul class="pt-3 space-y-2 text-[18px]">
              <li class="flex flex-wrap justify-between">
                <p class="font-serif">City</p>
                <p>{{ user.user_metadata.city }}</p>
              </li>
              <li v-if="newOrder.photoType" class="flex flex-wrap justify-between">
                <p class="font-serif">Type</p>
                <p>{{ selectedTypeTitle }}</p>
              </li>
              <li v-if="newOrder.photoType" class="flex flex-wrap justify-between">
                <p class="font-serif">Price per hour</p>
                <p>{{ photoTypes[newOrder.photoType].cost }} €</p>
              </li>
              <li v-if="activeStep > 0" class="flex flex-wrap justify-between">
                <p class="font-serif">Date</p>
                <p>
                  {{ formateDate(newOrder.date, {
                    day: '2-digit',
                    month: 'long'
                  }) }}
                </p>
              </li>
              <li v-if="newOrder?.time[0] && newOrder?.time[1]" class="flex flex-wrap justify-between pb-4">
                <p class="font-serif">Time</p>
                <p>{{ newOrder?.time[0] }} - {{ newOrder?.time[1] }}</p>
              </li>
            </ul>
            <p v-if="selectedType && startTime && endTime" class="border-t border-t-green-60 pt-4 font-semibold">
              Total price:
            </p>
          </el-card>
        </div>
      </div>

      <div v-if="activeStep !== 5" class="space-x-2 sm:space-x-4 mt-3">
        <Button v-if="activeStep > 0" class="non-active w-[150px] sm:w-[185px] lg:w-[236px]" @click="handleBack">
          <IconArrowRight class="rotate-180" />
          Back
        </Button>
        <Button
          v-if="activeStep < 4"
          class="w-[150px] sm:w-[185px] lg:w-[236px]"
          @click="handleNextStep"
        >
          <p>Next step</p>
          <IconArrowRight />
        </Button>
        <Button
          v-if="activeStep === 4"
          class="w-[150px] sm:w-[185px] lg:w-[236px]"
          @click="handleSendForm"
        >
          Finish
        </Button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getOnePhotographer } from '../../services/photographers.service'
import { useCategoriesStore } from '../../store/categories'
import { createOrder } from '../../services/orders.service'
import { formateDate } from '../../utils/formate-date'

import type { ICategory, IOrder } from '~/types/global.types'
definePageMeta({
  layout: 'user'
})

// Import store
const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

// Fetch data
const route = useRoute()
const res = await getOnePhotographer({ userId: (route.params as any).id })
const user = ref(res.user)

const selectedType: Ref<string | undefined> = ref()
const photoTypes = reactive(user.value.user_metadata.photoTypes)

const computedCategories = computed(() => {
  return categories.value.filter(category => {
    return Object.keys(user.value.user_metadata.photoTypes).includes(String(category.id))
  })
})
const availableCategories = reactive(computedCategories.value)

const selectedTypeTitle = computed(() => {
  return availableCategories.filter((i: ICategory) => i.id === Number(newOrder.photoType))[0].title
})

const activeStep = ref(0)

const selectedDate: Ref<Date | ''> = ref('')
const startTime = ref()
const endTime = ref()
const comment = ref('')

async function handleNextStep () {
  if (activeStep.value === 0) {
    await formRef.value.validate((valid) => {
      if (valid) {
        newOrder.client_name = formModel.name
        newOrder.client_phone = formModel.phone
        newOrder.client_email = formModel.email
        activeStep.value = activeStep.value + 1
      } else {
        activeStep.value = 0
      }
    })
  } else if (activeStep.value < 5) {
    activeStep.value = activeStep.value + 1
    console.log(selectedType.value)
  }
}

function handleBack () {
  activeStep.value = activeStep.value - 1
}

async function handleSendForm () {
  if (newOrder.photoType && newOrder.date && newOrder.time) {
    activeStep.value = activeStep.value + 1
    await createOrder(newOrder)
  }
}
const weekend = reactive(user.value.user_metadata.weekend)

const disabledDate = (time: Date) => {
  const dateString = time.toISOString().split('T')[0]
  return weekend.map((d: string) => d.split('T')[0]).includes(dateString)
}

const formRef = useElFormRef()

const formModel = useElFormModel({
  name: '',
  email: '',
  phone: ''
})

const formRules = useElFormRules({
  name: [useRequiredRule()],
  email: [useRequiredRule(), useEmailRule()],
  phone: [useRequiredRule(), useMinLenRule(6)]
})

const newOrder: IOrder = reactive({
  user_id: (route.params as any).id,
  client_phone: formModel.phone,
  client_name: formModel.name,
  client_email: formModel.email,
  photoType: selectedType.value,
  date: selectedDate.value,
  time: [startTime.value, endTime.value],
  comment: comment.value
})
</script>

<style>
.el-select-dropdown__wrap {
  @apply overflow-auto
}

.el-scrollbar__bar.is-vertical {
  @apply hidden
}
</style>
