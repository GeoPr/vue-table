<template>
    
    <template v-if="data.length">

        <Form :on-submit="onFormSubmit" />

        <Filter @change="onFilterChange" />

        <RowDetails
            v-if="selectedRow"
            :row="selectedRow"
        />

        <div class="table">

            <div class="table__row">
                <div
                    class="table__cell table__cell_header"
                    v-for="header in tableHeaders"
                    :key="header.label"
                    @click="sortByDir(header)"
                >
                    <div>
                        {{ header.label }}
                        {{ header.dir === 'asc' ? '👆' : '👇' }}
                    </div>
                </div>
            </div>

            <div
                class="table__row"
                v-for="item in sortedData"
                :key="item.id * Math.random()"
                @click="selectRow(item)"
            >
                <div
                    class="table__cell"
                    v-for="cell in tableHeaders"
                    :key="cell"
                >
                    {{ item[cell.label] }}
                </div>
            </div>

        </div>

        <Pagination
            :items-per-page="ITEMS_PER_PAGE"
            :max-length="privateData.length"
            @paginationChange="onPaginationItemClick"
        />

    </template>

    <div v-else>loading</div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
    IData,
    IHeader,
    IOnPaginationItemClickOptions,
} from '@/components/Table/types';
import Form from './components/Form/Form.vue';
import Pagination from './components/Pagination/Pagination.vue';
import Filter from '@/components/Table/components/Filter/Filter.vue';
import RowDetails from '@/components/Table/components/RowDeatils/RowDeatils.vue';

export default defineComponent({
    name: 'Table',
    components: { RowDetails, Filter, Pagination, Form },
    props: {
        data: {
            value: Array as PropType<IData[]>,
            default: [] as IData[],
        },
        headers: {
            value: [] as (keyof IData)[],
            default: ['id', 'firstName', 'lastName', 'email', 'phone'],
        },
    },
    data() {
        return {
            tableHeaders: this.headers.map((label: string) => ({
                label,
                dir: 'asc',
            })) as IHeader[],
            privateData: [] as IData[],
            sortedData: [] as IData[],
            ITEMS_PER_PAGE: 50,
            MAX_LENGTH: 0,
            selectedRow: null as (null | IData),
        };
    },
    watch: {
        data() {
            this.privateData = this.data;
        },
        privateData() {
            this.sortedData = this.privateData.slice(0, this.ITEMS_PER_PAGE).sort((current, next) => {
                return next.id - current.id;
            });
        },
    },
    methods: {
        sortByDir({ dir, label }: IHeader) {
            const isAsc = dir === 'asc';
            const isNumber = typeof this.privateData[0][label] === 'number';

            this.sortedData = [...this.sortedData].sort((current, next) => {
                const currentValue = current[label];
                const nextValue = next[label];

                if (isNumber) {
                    return isAsc ? +currentValue - +nextValue : +nextValue - +currentValue;
                }

                return String(isAsc ? currentValue : nextValue).localeCompare(String(isAsc ? nextValue : currentValue));
            });

            this.tableHeaders = this.tableHeaders.map(header => {
                if (header.label === label) {
                    return { ...header, dir: isAsc ? 'desc' : 'asc' };
                }

                return header;
            });
        },
        onPaginationItemClick(
            { start, end }: IOnPaginationItemClickOptions,
        ) {
            this.sortedData = this.privateData.slice(start, end);
        },
        onFormSubmit(result: IData) {
            this.privateData.push(result);
        },
        onFilterChange(filterValue: string) {
            this.sortedData = this.privateData.filter(row => {
                const entries = Object.entries(row);
                const filtered = entries.filter(([key]) => this.headers.includes(key));
                const values = filtered.map(([, value]) => value);

                for (const value of values) {
                    if (String(value).toLowerCase().includes(filterValue.toLowerCase())) {
                        return true;
                    }
                }
            }).slice(0, this.ITEMS_PER_PAGE);
        },
        selectRow(row: IData) {
            this.selectedRow = row;
        },
    },
});
</script>

<style src="./styles.scss" lang="scss"></style>
