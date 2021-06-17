<template>
    <ul class="details">
        <li>
            Выбран пользователь
            <b>{{ row.firstName }} {{ row.lastName }}</b>
        </li>
        <li>
            Адрес проживания:
            <b>{{ row.address.streetAddress }}</b>
        </li>
        <li>
            Город:
            <b>{{ row.address.city }}</b>
        </li>
        <li>
            Провинция/штат:
            <b>{{ row.address.state }}</b>
        </li>
        <li>
            Индекс:
            <b>{{ row.address.zip }}</b>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IData } from '../../types';

export default defineComponent({
    name: 'RowDetails',
    props: {
        row: {} as PropType<IData>,
    },
});
</script>

<style scoped>
.details {
    display: grid;
    row-gap: 15px;
    margin-bottom: 30px;
}
</style>
