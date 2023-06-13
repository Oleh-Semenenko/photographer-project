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
    <div class="md:flex gap-4">
      <SettingsCard />

      <div class="space-y-[40px] w-full lg:w-[50%]">
        <el-card class="p-6 lg:p-10">
          <ul class="grid md:grid-cols-2 gap-3 md:gap-5 place-content-center">
            <li
              v-for="item in categories"
              :key="item.title"
            >
              <div
                class="relative flex gap-2 items-center justify-between bg-grey-10 border-x-8
                h-12 md:h-[60px] px-6"
                :style="{borderLeftColor: `var(--${item.color})`, borderRightColor: `var(--${item.color})`}"
              >
                <p class="text-[16px] md:text-[18px]">{{ item.title }}</p>
                <el-checkbox
                  :model-value="checkedTypes[item.id]?.isChecked || false"
                  :label="item.title"
                  @change="handleCheckboxChange(item.id)"
                  @click.stop
                />
                <IconPencil
                  v-if="checkedTypes[item.id]?.isChecked"
                  class="absolute top-0 right-0 hover:fill-green-80 hover:cursor-pointer delayed-icon"
                  @click="handleCardClick(item)"
                />
              </div>
            </li>
          </ul>
        </el-card>

        <el-dialog v-model="dialogFormVisible" align-center>
          <template #header>
            <p class="text-[16px] md:text-[20px]">Cost for {{ selectedCategory.title }}</p>
          </template>
          <el-form
            :model="checkedTypes[selectedCategory.id]"
            label-position="top"
            @submit.prevent="onSubmit"
          >
            <el-form-item
              label="Photography cost"
            >
              <el-input
                v-model="checkedTypes[selectedCategory.id].cost"
              >
                <template #append>€/per hour</template>
              </el-input>
            </el-form-item>

            <el-form-item
              label="Photography description"
            >
              <el-input
                v-model="checkedTypes[selectedCategory.id].description"
                type="textarea"
                maxlength="450"
                placeholder="Tell more about photography"
                show-word-limit
              />
            </el-form-item>

            <el-form-item
              label="Upload photos"
            >
              <el-upload
                v-model:file-list="checkedTypes[selectedCategory.id].photos"
                drag
                multiple
                list-type="picture-card"
                :on-success="handleUploadSuccess"
                class="w-full h-full"
              >
                <el-icon class="el-icon--upload"><IconUpload /></el-icon>
              </el-upload>
            </el-form-item>

            <el-button class="w-1/2 sm:w-1/3 mt-2" native-type="submit">Save</el-button>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '../../../store/categories'
import { usePhotographerStore } from '../../../store/photographer'
const user = useSupabaseUser()

const photographerStore = usePhotographerStore()
const { updateUserOptionalData } = photographerStore
const categoriesStore = useCategoriesStore()
const { uploadPhotos, getPhotoUrl } = categoriesStore
const { categories } = storeToRefs(categoriesStore)

const dialogFormVisible = ref(false)
const selectedCategory = ref()
const checkedTypes = reactive(user?.value?.user_metadata?.photoTypes || {})

const uploadedImages = ref()

function handleCardClick (item) {
  if (checkedTypes[item.id]?.isChecked) {
    selectedCategory.value = item
    dialogFormVisible.value = true
  }
}

async function handleCheckboxChange (id) {
  if (!checkedTypes[id]) {
    checkedTypes[id] = {
      isChecked: true,
      cost: '',
      description: '',
      photos: []
    }
  } else {
    checkedTypes[id].isChecked = !checkedTypes[id].isChecked
    if (!checkedTypes[id].isChecked) {
      checkedTypes[id] = {
        cost: '',
        description: '',
        photos: []
      }
    }
  }
  if (!checkedTypes[id].isChecked) {
    delete checkedTypes[id]
    const result = await updateUserOptionalData({ photoTypes: { ...checkedTypes } })
    result && successNotification('Information about your photo types has been successfully updated')
  }
}
async function onSubmit () {
  const { id } = selectedCategory.value

  const formData = {
    isChecked: checkedTypes[id].isChecked,
    cost: checkedTypes[id].cost,
    description: checkedTypes[id].description,
    photos: uploadedImages.value
  }
  checkedTypes[id] = formData

  const result = await updateUserOptionalData({ photoTypes: { ...checkedTypes } })
  result && successNotification('Information about your photo types has been successfully updated')
  dialogFormVisible.value = false
}

const handleUploadSuccess = async (response, uploadFile, uploadFiles) => {
  const uploadPromises = Array.from(uploadFiles)
    .map(async photo => {
      if (photo.raw) {
        const data = await uploadPhotos(photo.raw, selectedCategory.value.title)
        photo.url = await getPhotoUrl(data.path)
        return photo.url
      } else {
        return photo.url
      }
    })

  const result = await Promise.allSettled(uploadPromises)

  uploadedImages.value = result.map(({ value }) => {
    if (value) {
      return { url: value }
    }
  })
}
</script>

<style lang="scss">
.el-checkbox__label {
  @apply hidden
}

.el-dialog {
  @apply z-[3000] w-3/4 md:w-1/2
}

.el-overlay-dialog {
  @apply z-20
}

.el-dialog__body {
  @apply p-4
}

.delayed-icon {
  opacity: 0;
  animation-name: delayedIconFadeIn;
  animation-duration: 0.25s;
  animation-delay: 0.24s;
  animation-fill-mode: forwards;
}

@keyframes delayedIconFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
