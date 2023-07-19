<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1000, width: '100%' }">
            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">
                    <router-link to="/">首页</router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/map">地图</router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-header>

        <a-layout-content :style="{ padding: '0', marginTop: '64px' }">
            <div :style="{ background: '#fff', padding: '0px' }">
                <router-view/>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<script setup>
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
