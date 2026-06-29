<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: boolean
        title?: string
        width?: string
        closeOnClickOverlay?: boolean
    }>(),
    {
        title: '提示',
        width: '500px',
        closeOnClickOverlay: true
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    close: []
}>()

function closeDialog() {
    emit('update:modelValue', false)
    emit('close')
}

function handleOverlayClick() {
    if (!props.closeOnClickOverlay) return
    closeDialog()
}
</script>

<template>
    <Teleport to="body">
        <div v-if="modelValue" class="x-dialog-wrapper">
            <div class="x-dialog-overlay" @click="handleOverlayClick"></div>

            <div class="x-dialog" :style="{ width }">
                <div class="x-dialog__header">
                    <slot name="header">
                        <span class="x-dialog__title">{{ title }}</span>
                    </slot>

                    <button class="x-dialog__close" @click="closeDialog">×</button>
                </div>

                <div class="x-dialog__body">
                    <slot />
                </div>

                <div class="x-dialog__footer">
                    <slot name="footer">
                        <XButton @click="closeDialog">取消</XButton>
                        <XButton type="primary" @click="closeDialog">确认</XButton>
                    </slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.x-dialog-wrapper {
    position: fixed;
    inset: 0;
    z-index: 2000;
}

.x-dialog-overlay {
    position: absolute;
    inset: 0;
    background: rgb(0 0 0 / 45%);
}

.x-dialog {
    position: relative;
    margin: 15vh auto 0;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgb(0 0 0 / 16%);
    z-index: 1;
}

.x-dialog__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
}

.x-dialog__title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
}

.x-dialog__close {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 22px;
    color: #999;
}

.x-dialog__close:hover {
    color: #333;
}

.x-dialog__body {
    padding: 20px;
    color: #333;
    line-height: 1.6;
}

.x-dialog__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 20px;
    border-top: 1px solid #eee;
}
</style>