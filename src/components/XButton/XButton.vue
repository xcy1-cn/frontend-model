<script setup lang="ts">
import { defineEmits } from 'vue';

type ButtonType = 'default' | 'primary' | 'success' | 'danger'
type ButtonSize = 'small' | 'medium' | 'large'

const props = withDefaults(
    defineProps < {
        type?: ButtonType
    size?: ButtonSize
    disabled?: boolean
    } > (),
    {
        type: 'default',
        size: 'medium',
        disabled: false
    }
)

const emit = defineEmits < {
    click: [event: MouseEvent]
} > ()

function handleClick(event: MouseEvent) {
    if (props.disabled) return
    emit('click', event)
}
</script>

<template>
    <button class="x-button" :class="[
        `x-button--${type}`,
        `x-button--${size}`,
        {
            'is-disabled': disabled
        }
    ]" :disabled="disabled" @click="handleClick">
        <slot />
    </button>
</template>

<style scoped>
.x-button {
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
}

.x-button--small {
    padding: 6px 12px;
    font-size: 12px;
}

.x-button--medium {
    padding: 8px 16px;
    font-size: 14px;
}

.x-button--large {
    padding: 10px 20px;
    font-size: 16px;
}

.x-button--default {
    background: #f5f5f5;
    color: #333;
}

.x-button--primary {
    background: #409eff;
    color: #fff;
}

.x-button--success {
    background: #67c23a;
    color: #fff;
}

.x-button--danger {
    background: #f56c6c;
    color: #fff;
}

.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>