<template>
    <ul class="pagination">
        <li
            v-for="item in pagination"
            :key="item"
            @click="onPaginationItemClick(item)"
            class="pagination__item"
            :class="{
                pagination__item_active: item === activeIndex
            }"
        >
            {{ item }}
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Pagination',
    emits: ['paginationChange'],
    props: {
        itemsPerPage: Number,
        maxLength: Number,
    },
    data() {
        return {
            pagination: [] as number[],
            activeIndex: 1,
        };
    },
    mounted() {
        this.getPagination();
    },
    watch: {
        maxLength() {
            this.getPagination();
        },
    },
    methods: {
        getPagination() {
            const paginationLength = Math.ceil(this.maxLength! / this.itemsPerPage!);

            if (paginationLength) {
                this.pagination = Array.from({ length: paginationLength }, (_, i) => i + 1);
            }
        },
        onPaginationItemClick(page: number) {
            this.activeIndex = page;

            const start = (page - 1) * this.itemsPerPage!;
            const end = page * this.itemsPerPage!;

            this.$emit('paginationChange', { start, end, page });
        },
    },
});
</script>

<style src="./styles.scss" lang="scss"></style>
