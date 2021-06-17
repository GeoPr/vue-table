<template>
    <input
        type="text"
        v-model="value"
        autocomplete="off"
        @input="onChange"
        class="input"
        placeholder="filter"
    >
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Filter',
    emits: ['change'],
    data: () => ({ value: '' }),
    methods: {
        onChange() {
            this.$emit('change', this.value);
        },
    },
});
</script>

<style scoped>
.input {
    height: 40px;
    padding: 0 20px;
    margin-bottom: 30px;
    background: rebeccapurple;
    font-size: 1.3rem;
    border-radius: 5px;
}
</style>
