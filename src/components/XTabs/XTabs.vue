<script setup lang="ts">
import { provide, ref } from 'vue'

type TabItem = {
    label: string
    name: string
}

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [value: string]
}>()

const panes = ref<TabItem[]>([])

function addPane(pane: TabItem) {
    const exists = panes.value.some((item) => item.name === pane.name)

    if (!exists) {
        panes.value.push(pane)
    }
}

function changeTab(name: string) {
    if (name === props.modelValue) return

    emit('update:modelValue', name)
    emit('change', name)
}

provide('xTabsContext', {
    activeName: props,
    addPane
})
</script>

<template>
    <div class="x-tabs">
        <div class="x-tabs__header">
            <div v-for="pane in panes" :key="pane.name" class="x-tabs__item"
                :class="{ 'is-active': pane.name === modelValue }" @click="changeTab(pane.name)">
                {{ pane.label }}
            </div>
        </div>

        <div class="x-tabs__content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.x-tabs {
    width: 100%;
}

.x-tabs__header {
    display: flex;
    border-bottom: 1px solid #dcdfe6;
}

.x-tabs__item {
    padding: 12px 20px;
    cursor: pointer;
    color: #606266;
    border-bottom: 2px solid transparent;
}

.x-tabs__item:hover {
    color: #409eff;
}

.x-tabs__item.is-active {
    color: #409eff;
    border-bottom-color: #409eff;
}

.x-tabs__content {
    padding: 20px 0;
}
</style>