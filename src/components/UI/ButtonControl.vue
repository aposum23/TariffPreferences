<script setup lang="ts">
</script>

<template>
  <div
      class="button"
  >
    <span class="button__label">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.button {
  background: #7A5CFA;
  padding: 33px 30px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;

  &__label {
    color: #FFFFFF;
    font-size: 32px;
    user-select: none;
  }

  &:active {
    background: #000000;
  }
}
</style>