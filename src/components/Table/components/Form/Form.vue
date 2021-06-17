<template>
    <div>
        <button @click="toggleForm" class="form__button form__button_show">
            {{ isFormVisible ? 'Hide' : 'Show' }} form
        </button>
        <form @submit.prevent="submit" class="form" v-if="isFormVisible">
            <div class="form__fields">
                <input
                    v-for="(field, index) in sliceFields(0, 3)"
                    :key="index"
                    autocomplete="off"
                    v-model="field.value"
                    :placeholder="field.placeholder"
                    class="form__field"
                    :class="{
                    form__field_invalid: errors.includes(field.name)
                }"
                >
            </div>
            <div class="form__fields">
                <input
                    v-for="(field, index) in sliceFields(3)"
                    :key="index"
                    autocomplete="off"
                    v-model="field.value"
                    :placeholder="field.placeholder"
                    class="form__field"
                    :class="{
                    form__field_invalid: errors.includes(field.name)
                }"
                >
            </div>
            <button
                class="form__button"
                type="submit"
            >
                Add
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
    ISubmitFormOptions,
    SubmitCallback,
} from '@/components/Table/components/Form/types';
import { FormValidationService } from '@/services/formValidationService/formValidationService';
import { IFields } from '@/services/formValidationService/types';

interface Fields extends IFields {
    [key: string]: {
        value: string;
        placeholder: string;
        type: string;
    };
}

export default defineComponent({
    emits: ['submit'],
    name: 'Form',
    props: {
        onSubmit: Function as PropType<SubmitCallback>,
    },
    methods: {
        submit() {
            const {
                isValid,
                errors,
                result,
            } = FormValidationService.isValid<Fields, ISubmitFormOptions>(this.fields);

            if (errors.length) {
                this.errors = errors;
                return;
            }

            if (isValid && this.onSubmit) {
                this.errors = [];
                this.onSubmit(result);
                this.resetFields();
            }
        },
        sliceFields(start = 0, end?: number) {
            return Object.fromEntries(Object.entries(this.fields).slice(start, end));
        },
        resetFields() {
            this.fields = Object.fromEntries(Object.entries(this.fields).map(([key, field]) => [
                key,
                { ...field, value: '' },
            ])) as any;
        },
        toggleForm() {
            this.isFormVisible = !this.isFormVisible;
        },
    },
    data: () => ({
        isFormVisible: false,
        errors: [] as string[],
        fields: {
            firstName: {
                value: '',
                type: 'text',
                placeholder: 'First name',
                name: 'firstName',
                validators: [
                    FormValidationService.isString,
                    FormValidationService.isEmpty,
                ],
            },
            lastName: {
                value: '',
                type: 'text',
                placeholder: 'Last name',
                name: 'lastName',
                validators: [
                    FormValidationService.isString,
                    FormValidationService.isEmpty,
                ],
            },
            id: {
                value: '',
                type: 'text',
                placeholder: 'id',
                name: 'id',
                validators: [
                    FormValidationService.isNumber,
                    FormValidationService.isEmpty,
                ],
            },
            email: {
                value: '',
                type: 'email',
                placeholder: 'Email',
                name: 'email',
                validators: [
                    FormValidationService.isEmail,
                    FormValidationService.isEmpty,
                ],
            },
            phone: {
                value: '',
                type: 'tel',
                placeholder: 'Phone number',
                name: 'phone',
                validators: [
                    FormValidationService.isPhone,
                    FormValidationService.isEmpty,
                ],
            },
        },
    }),
    mounted() {
        if (!this.onSubmit) {
            throw new Error('"onSubmit" prop is required');
        }
    },
});
</script>

<style src="./styles.scss" lang="scss"></style>
