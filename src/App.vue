<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'
import XMessage from './components/XMessage'
import { computed } from 'vue'

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

const formRef = ref()

const loginForm = reactive({
    username: '',
    password: ''
})

const loginRules = {
    username: {
        required: true,
        message: '请输入用户名'
    },
    password: {
        required: true,
        message: '请输入密码'
    }
}

function submitForm() {
    const valid = formRef.value.validate()

    if (!valid) {
        console.log('表单校验失败')
        return
    }

    console.log('表单校验成功', loginForm)
}

function showSuccessMessage() {
    XMessage.success('保存成功')
}

function showErrorMessage() {
    XMessage.error('保存失败')
}

function showWarningMessage() {
    XMessage.warning('请检查输入内容')
}

function showInfoMessage() {
    XMessage.info('这是一条提示信息')
}

const userList = [
    {
        id: 1,
        name: '张三',
        age: 24,
        status: 'active'
    },
    {
        id: 2,
        name: '李四',
        age: 28,
        status: 'disabled'
    }
]

const columns = [
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'age',
        label: '年龄'
    },
    {
        prop: 'status',
        label: '状态',
        slot: 'status'
    },
    {
        prop: 'action',
        label: '操作',
        width: '180px',
        slot: 'action'
    }
]

function editUser(row: any) {
    XMessage.info(`编辑用户：${row.name}`)
}

function deleteUser(row: any) {
    XMessage.warning(`删除用户：${row.name}`)
}

const page = ref(1)
const pageSize = ref(5)

const fullUserList = [
    { id: 1, name: '张三', age: 24, status: 'active' },
    { id: 2, name: '李四', age: 28, status: 'disabled' },
    { id: 3, name: '王五', age: 31, status: 'active' },
    { id: 4, name: '赵六', age: 22, status: 'active' },
    { id: 5, name: '小明', age: 26, status: 'disabled' },
    { id: 6, name: '小红', age: 25, status: 'active' },
    { id: 7, name: '小刚', age: 29, status: 'disabled' }
]

const total = computed(() => fullUserList.length)

const pagedUserList = computed(() => {
    const start = (page.value - 1) * pageSize.value
    const end = start + pageSize.value

    return fullUserList.slice(start, end)
})

function loadData() {
    XMessage.info(`当前第 ${page.value} 页，每页 ${pageSize.value} 条`)
}

const activeTab = ref('user')

function handleTabChange(name: string) {
    XMessage.info(`切换到：${name}`)
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


        <section class="block">
            <h3>Form 组件</h3>

            <XForm ref="formRef" :model="loginForm" :rules="loginRules">
                <XFormItem label="用户名" prop="username">
                    <XInput v-model="loginForm.username" placeholder="请输入用户名" />
                </XFormItem>

                <XFormItem label="密码" prop="password">
                    <XInput v-model="loginForm.password" placeholder="请输入密码" />
                </XFormItem>

                <XFormItem label="">
                    <XButton type="primary" @click="submitForm">提交</XButton>
                </XFormItem>
            </XForm>
        </section>

        <section class="block">
            <h3>Message 组件</h3>

            <div class="row">
                <XButton type="success" @click="showSuccessMessage">
                    Success
                </XButton>

                <XButton type="danger" @click="showErrorMessage">
                    Error
                </XButton>

                <XButton @click="showWarningMessage">
                    Warning
                </XButton>

                <XButton @click="showInfoMessage">
                    Info
                </XButton>
            </div>
        </section>

        <section class="block">
            <h3>Table 组件</h3>

            <XTable :data="userList" :columns="columns">
                <template #status="{ row }">
                    <span :style="{ color: row.status === 'active' ? 'green' : 'red' }">
                        {{ row.status === 'active' ? '启用' : '禁用' }}
                    </span>
                </template>

                <template #action="{ row }">
                    <div class="row">
                        <XButton size="small" type="primary" @click="editUser(row)">
                            编辑
                        </XButton>

                        <XButton size="small" type="danger" @click="deleteUser(row)">
                            删除
                        </XButton>
                    </div>
                </template>
            </XTable>
        </section>

        <XPagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total" @change="loadData" />

        <section class="block">
            <h3>Tabs 组件</h3>

            <XTabs v-model="activeTab" @change="handleTabChange">
                <XTabPane label="用户管理" name="user">
                    <p>这里是用户管理内容。</p>
                    <XTable :data="pagedUserList" :columns="columns">
                        <template #status="{ row }">
                            <span :style="{ color: row.status === 'active' ? 'green' : 'red' }">
                                {{ row.status === 'active' ? '启用' : '禁用' }}
                            </span>
                        </template>

                        <template #action="{ row }">
                            <div class="row">
                                <XButton size="small" type="primary" @click="editUser(row)">
                                    编辑
                                </XButton>

                                <XButton size="small" type="danger" @click="deleteUser(row)">
                                    删除
                                </XButton>
                            </div>
                        </template>
                    </XTable>
                </XTabPane>

                <XTabPane label="角色管理" name="role">
                    <p>这里是角色管理内容。</p>
                </XTabPane>

                <XTabPane label="系统设置" name="setting">
                    <p>这里是系统设置内容。</p>
                </XTabPane>
            </XTabs>
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