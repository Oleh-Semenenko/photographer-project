<template>
  <div class="mt-5">
    <h2
      class="relative text-[22px] md:text-[28px] lg:text-[32px] leading-[1.5] mb-6
    after-element"
    >
      Types of photography
    </h2>

    <ul class="grid lg:grid-cols-2 gap-4">
      <li
        v-for="item in props.availableCategories"
        :key="item.id"
        class="bg-white-100 border-x-8 py-4 px-6 flex flex-col justify-between gap-3"
        :style="{borderLeftColor: `var(--${item.color})`, borderRightColor: `var(--${item.color})`}"
      >
        <div
          class="border py-1 px-3 mr-auto"
          :style="{borderColor: `var(--${item.color})`}"
        >
          {{ item.title }}
        </div>

        <p class="text-[18px]">{{ photoTypes[String(item.id)].description }}</p>

        <div class="flex items-center gap-3">
          <IconWallet class="fill-green-100" />
          <p class="text-black-80">
            {{ photoTypes[String(item.id)].cost }} € <span class="text-grey-100">per hour</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  availableCategories: Array,
  user: Object
})

const photoTypes = reactive(props.user?.user_metadata.photoTypes)
</script>
