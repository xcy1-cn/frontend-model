<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const dialogVisible = ref(false)

function handleClick() {
    console.log('username:', username.value)
    console.log('password:', password.value)
}

function handleClear() {
    console.log('清空了输入框')
}

function handleDialogClose() {
    console.log('弹窗关闭了')
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

        <section class="block">
            <h3>Dialog 组件</h3>

            <XButton type="primary" @click="dialogVisible = true">
                打开弹窗
            </XButton>

            <XDialog v-model="dialogVisible" title="删除确认" width="420px" @close="handleDialogClose">
                <p>确认要删除这条数据吗？这个操作不可恢复。</p>

                <template #footer>
                    <XButton @click="dialogVisible = false">取消</XButton>
                    <XButton type="danger" @click="dialogVisible = false">
                        确认删除
                    </XButton>
                </template>
            </XDialog>
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