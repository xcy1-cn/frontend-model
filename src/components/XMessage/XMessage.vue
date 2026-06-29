<script setup lang="ts">
type MessageType = 'success' | 'error' | 'warning' | 'info'

withDefaults(
    defineProps<{
        message: string
        type?: MessageType
    }>(),
    {
        type: 'info'
    }
)
</script>

<template>
    <div class="x-message" :class="`x-message--${type}`">
        {{ message }}
    </div>
</template>

<style scoped>
.x-message {
    position: fixed;
    top: 24px;
    left: 50%;
    z-index: 3000;
    transform: translateX(-50%);
    min-width: 240px;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
    box-shadow: 0 4px 12px rgb(0 0 0 / 12%);
}

.x-message--success {
    background: #f0f9eb;
    color: #67c23a;
    border: 1px solid #e1f3d8;
}

.x-message--error {
    background: #fef0f0;
    color: #f56c6c;
    border: 1px solid #fde2e2;
}

.x-message--warning {
    background: #fdf6ec;
    color: #e6a23c;
    border: 1px solid #faecd8;
}

.x-message--info {
    background: #f4f4f5;
    color: #909399;
    border: 1px solid #e9e9eb;
}
</style>