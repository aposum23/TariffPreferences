<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  label: String,
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  isChecked.value = newVal;
});

watch(isChecked, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>

<template>
  <label class="custom-checkbox">
    <input type="checkbox" v-model="isChecked" class="hidden-checkbox" />
    <span class="checkmark">
      <svg v-if="isChecked" viewBox="0 0 24 24">
        <path fill="none" stroke="white" stroke-width="3" d="M5 12l4 4L19 7" />
      </svg>
    </span>
    <span class="label-text">
      <slot></slot>
    </span>
  </label>
</template>

<style scoped lang="scss">
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
}

.hidden-checkbox {
  display: none;
}

.checkmark {
  width: 24px;
  height: 24px;
  border: 2px solid #B8C6CF;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: white;
  margin-right: 10px;
}

.checkmark svg {
  width: 16px;
  height: 16px;
}

.hidden-checkbox:checked + .checkmark,
.checkmark:has(svg) {
  background-color: #7A5CFA;
  border-color: #7A5CFA;
}

.label-text {
  font-size: 24px;
}
</style>