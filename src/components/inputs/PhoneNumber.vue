<script setup lang="ts">
import {ref, watch} from "vue";

const isFilled = ref<boolean>(true);

const value = ref<string>('');

const emit = defineEmits<{
  'update:modelValue': [string]
}>();

const props = defineProps<{
  modelValue: string
}>();

const phoneNumber = ref<string>(props.modelValue || '');

const setSymbols = (phoneString: string): void => {
  let numbers = phoneString.replace(/\D/g, '');

  if (numbers.length === 1 && !phoneNumber.value.includes('+7')) {
    phoneNumber.value = `+7(${numbers}`;
  }
  if (numbers.length === 4 && phoneNumber.value.length === 6)
    phoneNumber.value += ')'
  else if (numbers.length === 7 && phoneNumber.value.length === 10)
    phoneNumber.value += '-'
  else if (numbers.length === 9 && phoneNumber.value.length === 13)
    phoneNumber.value += '-'

  emit('update:modelValue', phoneNumber.value)
}

const clearSymbols = (phoneString: string): void => {
  if (phoneString === '+7(')
    value.value = ''
}

watch(
    () => phoneNumber.value,
    (newValue) => setSymbols(newValue)
);
</script>

<template>
  <input
      class="phone-number "
      :class="isFilled ? '' : 'wrong-validation'"
      type="text"
      placeholder="+7(___)___-__-__"
      maxlength="16"
      v-model="phoneNumber"
      @focusout="clearSymbols(phoneNumber)"
  />
</template>

<style scoped lang="scss">
.phone-number {
  border: 1px solid #B8C6CF;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 400;
  padding: 18px 16px;
  outline: none;

  &:focus {
    outline: 2px solid #7A5CFA;
  }
}

.wrong-validation {
  outline: 2px solid #EB5757
}
</style>