<template>
    <div class="wrapper">
        <div class="container">

            <div v-if="isError">
                <div>something went wrong, try again</div>
                <button @click="fetchData" class="button">retry</button>
            </div>

            <template v-else>
                <Table :data="data" />
            </template>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HttpRequestService } from '@/services/httpRequestService/httpRequestService';
import { IData } from '@/components/Table/types';
import Table from '@/components/Table/Table.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'App',
    components: { Table },
    data: () => ({
        data: [] as IData[],
        urls: {
            less: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
            more: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
        } as any,
        isError: false,
        route: useRoute(),
    }),
    methods: {
        async fetchData() {
            this.isError = false;

            const { urlType } = this.route.params;
            const url = this.urls[urlType as string];

            const {
                data,
                error,
            } = await HttpRequestService.fetch<IData[]>(url as string);

            if (data && !error) {
                this.data = data;
                this.isError = false;
                return;
            }

            if (error) {
                this.isError = true;
            }
        },
    },
    created() {
        this.fetchData();

    },
});
</script>

<style src="../styles.scss" lang="scss"></style>
