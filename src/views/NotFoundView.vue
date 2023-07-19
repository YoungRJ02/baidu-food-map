<template>
    <a-result status="404" title="404" sub-title="抱歉，你所访问的页面不存在">
        <template #extra>
            <a-button type="primary" @click="backHome">回到首页</a-button>
        </template>
    </a-result>
</template>

<script>
export default {
    name: "NotFoundView",
    methods: {
        backHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

</style>
