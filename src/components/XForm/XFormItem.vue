<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import type { FormRules } from './XForm.vue'

const props = defineProps<{
    label?: string
    prop: string
}>()

type FormContext = {
    model: Record<string, any>
    rules: FormRules
    addFormItem: (item: {
        prop: string
        validate: () => boolean
    }) => void
}

const formContext = inject<FormContext>('xFormContext')

const errorMessage = ref('')

const currentValue = computed(() => {
    return formContext?.model?.[props.prop]
})

function validate() {
    if (!formContext) return true

    const rule = formContext.rules[props.prop]

    if (rule?.required && !currentValue.value) {
        errorMessage.value = rule.message || `${props.label || props.prop}不能为空`
        return false
    }

    errorMessage.value = ''
    return true
}

onMounted(() => {
    formContext?.addFormItem({
        prop: props.prop,
        validate
    })
})
</script>

<template>
    <div class="x-form-item">
        <label v-if="label" class="x-form-item__label">
            {{ label }}
        </label>

        <div class="x-form-item__content">
            <slot />

            <div v-if="errorMessage" class="x-form-item__error">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.x-form-item {
    display: flex;
    align-items: flex-start;
}

.x-form-item__label {
    width: 80px;
    padding-top: 8px;
    color: #333;
    font-size: 14px;
}

.x-form-item__content {
    flex: 1;
}

.x-form-item__error {
    margin-top: 6px;
    color: #f56c6c;
    font-size: 12px;
}
</style>