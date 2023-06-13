<template>
  <span
    class="font-medium uppercase bg-grey-10 text-3xl h-full w-full flex items-center justify-center"
  >{{ nameAbbrv }}
  </span>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()

const firstName = ref(user?.value?.user_metadata?.first_name)
const secondName = ref(user?.value?.user_metadata?.second_name)

const nameAbbrv = computed(() => {
  if (firstName.value && secondName.value) {
    return [firstName.value, secondName.value].reduce((acc, cur) => {
      if (acc.length < 2) {
        acc = acc.concat(cur[0])
      }
      return acc
    }, '')
  }
})
</script>
