<template>
    <div class="wrapper">
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
});
</script>
