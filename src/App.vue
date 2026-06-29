<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function handleClick() {
    console.log('username:', username.value)
    console.log('password:', password.value)
}

function handleClear() {
    console.log('清空了输入框')
}
</script>

<template>
    <div class="page">
        <h2>X-UI 组件库练习</h2>

        <section class="block">
            <h3>Button 组件</h3>

            <div class="row">
                <XButton @click="handleClick">默认按钮</XButton>
                <XButton type="primary">主要按钮</XButton>
                <XButton type="success">成功按钮</XButton>
                <XButton type="danger">危险按钮</XButton>
            </div>
        </section>

        <section class="block">
            <h3>Input 组件</h3>

            <div class="row">
                <XInput v-model="username" placeholder="请输入用户名" clearable @clear="handleClear" />

                <XInput v-model="password" placeholder="请输入密码" size="large" />

                <XInput v-model="username" placeholder="禁用状态" disabled />
            </div>

            <p>username：{{ username }}</p>
            <p>password：{{ password }}</p>
        </section>
    </div>
</template>

<style scoped>
.page {
    padding: 40px;
}

.block {
    margin-bottom: 32px;
}

.row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}
</style>