<template>
  <div>
    <el-table
      :data="pagedRows"
      stripe
      :border="true"
    >
      <el-table-column
        v-for="heading in props.headings"
        :key="heading.value"
        :label="heading.label"
        :width="heading.width"
      >
        <template #header>
          {{ heading.label }}
        </template>
        <template #default="{row, $index}">
          <div class="hover:cursor-pointer" @click="handleClick(row)">
            <slot :name="heading.value" :row="row" :index="$index">
              <div class="truncate">{{ row }}</div>
            </slot>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <slot name="append" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  headings: Array,
  items: Array,
  currentPage: Number,
  pageSize: Number,
  handleClick: Function
})

const pagedRows = computed(() => {
  const startIndex = (props.currentPage - 1) * props.pageSize
  const endIndex = startIndex + props.pageSize
  return props.items.slice(startIndex, endIndex)
})
</script>
