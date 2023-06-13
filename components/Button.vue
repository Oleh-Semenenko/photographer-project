<template>
  <el-button class="max-w-[374px] h-[60px] hover:shadow-md">
    <slot name="icon" />
    <slot name="default" />
  </el-button>
</template>

<style lang="scss">
.non-active {
  @apply bg-white-50 text-green-80 border-grey-50
}

.social-links-btn {
  @apply bg-transparent text-green-100 border-green-80
}

@media (max-width: 540px) {
  .el-button span {
    @apply text-[16px]
  }

  .el-button {
    @apply h-9
  }
}
</style>
