<script setup lang="ts">
import SliderInput from "@/components/inputs/SliderInput.vue";
import PhoneNumber from "@/components/inputs/PhoneNumber.vue";
import CheckboxInput from "@/components/inputs/CheckboxInput.vue";
import {useTariffPreferencesStore} from "@/stores/tariffPreferences.ts";
import ButtonControl from "@/components/UI/ButtonControl.vue";

const tariffPreferencesStore = useTariffPreferencesStore();
</script>

<template>
  <form class="tariff-preferences">
    <h1 class="tariff-preferences__header">Настройте тариф</h1>
    <p class="input-label">Телефон</p>
    <PhoneNumber
        class="tariff-preferences__phone-number"
        v-model="tariffPreferencesStore.formData.phoneNumber"
        v-model:validations="tariffPreferencesStore.validations.phoneNumber"
    /><!--Нужно поправить размер этого поля ввода-->
    <p class="input-label">Минуты</p>
    <!--У слайдеров нужно поправить отображения цифр чтобы было красивенько :)-->
    <SliderInput
        color="main"
        :available-values="tariffPreferencesStore.minutesAvailableValues"
        v-model="tariffPreferencesStore.formData.minutesValue"
        measurement="мин."
    />
    <p class="input-label">СМС</p>
    <SliderInput
        :available-values="tariffPreferencesStore.smsAvailableValues"
        v-model="tariffPreferencesStore.formData.smsValue"
        measurement="шт."
    />
    <p class="input-label">Интернет</p>
    <SliderInput
        :available-values="tariffPreferencesStore.ethernetAvailableValues"
        v-model="tariffPreferencesStore.formData.ethernetValue"
        measurement="ГБ."
    />
    <p class="input-label">WiFi роутер</p>
    <CheckboxInput v-model="tariffPreferencesStore.formData.addRouter">Аренда <b>{{tariffPreferencesStore.routerPrice}}</b>&#8381;/мес.</CheckboxInput>
    <ButtonControl
        class="tariff-preferences__send-form"
        @click="() => tariffPreferencesStore.saveForm()"
    >
      <b>{{tariffPreferencesStore.calculatedPrice}} &#8381;</b> в месяц
    </ButtonControl>
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

  &__phone-number {
    width: 25%;
  }

  @media(max-width: 1280px) {
    &__phone-number {
      width: 50%;
    }
  }

  @media(max-width: 740px) {
    &__phone-number {
      width: 100%;
    }
  }

  &__send-form {
    margin-top: 90px;
    width: fit-content;
  }
}

.input-label {
  margin-top: 90px;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 500;
}
</style>