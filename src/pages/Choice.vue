<template>
    <div class="buttons">
        <button
            v-for="label in buttons"
            :key="label"
            @click="navigate(label)"
            class="buttons__button"
        >
            {{ label }}
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Choice',
    data: () => ({
        buttons: ['less', 'more'],
    }),
    methods: {
        navigate(urlType: string) {
            this.$router.push({
                name: 'Home',
                params: { urlType },
            });
        },
    },
});
</script>

<style lang="scss" scoped>
.buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;

    &__button {
        padding: 20px 30px;
        background: indianred;
        border-radius: 5px;
        font-size: 2rem;
        text-transform: uppercase;
    }
}
</style>
