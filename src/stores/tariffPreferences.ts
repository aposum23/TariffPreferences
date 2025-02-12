import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {ITariffForm} from "@/modules/TariffPreferences/types/tariffPreferencesFormTypes.ts";

export const useTariffPreferencesStore = defineStore('tariffPreferences', () => {
    const minutesAvailableValues: number[] = [100, 200, 300, 600];
    const smsAvailableValues: number[] = [0, 50, 100, 150];
    const ethernetAvailableValues: number[] = [5, 10, 15, 25];
    const minutesPrice: number = 50;
    const smsPrice: number = 10;
    const ethernetPrice: number = 200;
    const routerPrice: number = 99;
    const localStorage: Storage = window.localStorage;

    const formData = ref<ITariffForm>({
        minutesValue: 100,
        smsValue: 0,
        ethernetValue: 5,
        phoneNumber: '',
        addRouter: false
    });
    const validations = ref<{[K:string]: boolean}>({
        phoneNumber: true
    });

    const calculatedPrice = computed((): number => {
        let calculatedValue = 0;

        calculatedValue += formData.value.minutesValue * minutesPrice;
        calculatedValue += formData.value.smsValue * smsPrice;
        calculatedValue += formData.value.ethernetValue * ethernetPrice;
        calculatedValue += formData.value.addRouter ? routerPrice : 0;

        return calculatedValue;
    })

    const checkValidations = (): boolean => {
        for (const validKey of Object.keys(validations.value)) {
            if (!validations.value[validKey] || !formData.value[validKey]) {
                validations.value[validKey] = false;
                return false;
            }
        }

        return true;
    }

    const saveForm = (): void => {
        if (checkValidations()) {
            const formDataJSON: string = JSON.stringify(formData.value)

            alert(formDataJSON);

            localStorage.setItem('tariff', formDataJSON);
        }
    }

    return {
        minutesAvailableValues,
        smsAvailableValues,
        ethernetAvailableValues,
        formData,
        validations,
        routerPrice,
        calculatedPrice,
        saveForm,
    }
});