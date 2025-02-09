<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";

const emit = defineEmits<{
  'update:modelValue': [number]
}>();

const props = defineProps<{
  availableValues: number[],
  modelValue: number,
  measurement: string,
  color?: 'main' | 'additional'
}>();

const index = ref<number>(0);

watch(
    () => index.value,
    (newValue) => emit('update:modelValue', props.availableValues[newValue])
);

onMounted(() => {
  const valueIndex = props.availableValues.findIndex((value) => value === props.modelValue);
  if (valueIndex !== -1) {
    index.value = valueIndex
  }
})

const progress = computed(() => (index.value / (props.availableValues.length - 1)) * 100);
</script>

<template>
  <div class="slider-container">
    <input
        type="range"
        v-model="index"
        :min="0"
        :max="availableValues.length - 1"
        step="1"
        class="slider"
        :style="`background:
          linear-gradient(to right, ${color === 'main' ? '#7d5fff' : '#000000'} ${progress}%, lightgray ${progress}%);
          --bg-color: ${color === 'main' ? '#7d5fff' : '#000000'}`"
    >
    <div class="slider-labels">
      <span v-for="(val, idx) in availableValues" :key="idx" class="label" :class="{ active: idx === index }">
        {{ val }}<span v-if="val === availableValues[index]">{{` ${measurement}`}}</span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider-container {
  text-align: center;
  font-family: Arial, sans-serif;
  padding-top: 9px;
  position: relative;
  width: 100%;
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 40px;
  height: 40px;
  background: var(--bg-color);
  border: 1px solid #ffffff;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image:
    url("./svg/leftArrow.svg"),
    url("./svg/rightArrow.svg");
  background-repeat: no-repeat, no-repeat;
  background-position: left 8px center, right 8px center;
  background-size: 8px;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 51px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.label {
  font-size: 16px;
  font-weight: bold;
  color: black;
  min-width: 27px;
  max-width: fit-content;
}
</style>