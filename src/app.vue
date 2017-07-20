<style>
    @import 'styles/common.css';
</style>
<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        mounted() {
            console.log('app.vue mounted');
        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>
