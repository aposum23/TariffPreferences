<script setup lang="ts">
import SliderInput from "@/components/inputs/SliderInput.vue";
</script>

<template>
  <form class="tariff-preferences">
    <h1 class="tariff-preferences__header">Настройте тариф</h1>
    <p class="input-label">Телефон</p>
    <input type="text"/>
    <p class="input-label">Минуты</p>
    <SliderInput color="main" :values="[100, 200, 300, 600]" model-value="" measurement="мин."/>
    <p class="input-label">СМС</p>
    <SliderInput :values="[0, 50, 100, 150]" model-value="" measurement="шт."/>
    <p class="input-label">Интернет</p>
    <SliderInput :values="[5, 10, 15, 25]" model-value="" measurement="ГБ."/>
    <p class="input-label">WiFi роутер</p>
    <input type="checkbox"/>
  </form>
</template>

<style scoped lang="scss">
.tariff-preferences {
  width: 80%;
  background: #EEF2F4;
  padding: 120px;

  &__header {
    font-size: 64px;
    font-weight: 700;
  }
}

.input-label {
  margin-top: 90px;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 500;
}
</style>