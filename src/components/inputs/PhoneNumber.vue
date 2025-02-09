<script setup lang="ts">
import {ref, watch} from "vue";

const emit = defineEmits<{
  'update:modelValue': [string],
  'update:validations': [boolean]
}>();

const props = defineProps<{
  modelValue: string,
  validations: boolean,
}>();

const phoneNumber = ref<string>(props.modelValue || '');

const setSymbols = (phoneString: string): void => {
  let numbers = phoneString.replace(/\D/g, '');

  if (numbers.length > 11) numbers = numbers.slice(0, 11);

  phoneNumber.value =
      numbers.length > 1
          ? `+7(${numbers.slice(1, 4)})${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`
          : numbers.length > 0 ? '+7(' : '';

  emit('update:modelValue', phoneNumber.value);
  emit('update:validations', phoneNumber.value.length > 0);
}

const clearSymbols = (phoneString: string): void => {
  if (phoneString === '+7(')
    phoneNumber.value = ''
}

watch(
    () => phoneNumber.value,
    (newValue) => setSymbols(newValue)
);
</script>

<template>
  <div class="input-wrapper">
    <input
        class="phone-number"
        :class="{ 'wrong-validation': !validations }"
        type="text"
        placeholder="+7(___)___-__-__"
        maxlength="16"
        v-model="phoneNumber"
        @focusout="clearSymbols(phoneNumber)"
    />
    <img
        v-if="!validations"
        class="error-icon"
        src="./icons/error.png"
    />
    <p v-if="!validations" class="error-message">
      Поле не должно быть пустым
    </p>
  </div>
</template>

<style scoped lang="scss">
.phone-number {
  border: 1px solid #B8C6CF;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 400;
  padding: 18px 16px;
  outline: none;
  width: 100%;

  &:focus {
    outline: 2px solid #7A5CFA;
  }
}

.wrong-validation {
  outline: 2px solid #EB5757 !important;
}

.input-wrapper {
  position: relative;
  display: inline-block;
}

.error-icon {
  position: absolute;
  right: 0;
  top: calc(50% - 12px);
  color: #EB5757;
  font-size: 24px;
}

.error-message {
  position: absolute;
  color: #EB5757;
  font-size: 12px;
  margin-top: 5px;
}
</style>