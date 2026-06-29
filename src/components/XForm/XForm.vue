<script setup lang="ts">
import { provide, ref } from 'vue'

export type FormRules = Record<string, {
    required?: boolean
    message?: string
}>

const props = defineProps<{
    model: Record<string, any>
    rules?: FormRules
}>()

type FormItemContext = {
    prop: string
    validate: () => boolean
}

const formItems = ref<FormItemContext[]>([])

function addFormItem(item: FormItemContext) {
    formItems.value.push(item)
}

function validate() {
    return formItems.value.every((item) => item.validate())
}

provide('xFormContext', {
    model: props.model,
    rules: props.rules || {},
    addFormItem
})

defineExpose({
    validate
})
</script>

<template>
    <form class="x-form" @submit.prevent>
        <slot />
    </form>
</template>

<style scoped>
.x-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>