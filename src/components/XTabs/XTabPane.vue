<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'

const props = defineProps<{
    label: string
    name: string
}>()

type TabsContext = {
    activeName: {
        modelValue: string
    }
    addPane: (pane: {
        label: string
        name: string
    }) => void
}

const tabsContext = inject<TabsContext>('xTabsContext')

const isActive = computed(() => {
    return tabsContext?.activeName.modelValue === props.name
})

onMounted(() => {
    tabsContext?.addPane({
        label: props.label,
        name: props.name
    })
})
</script>

<template>
    <div v-show="isActive" class="x-tab-pane">
        <slot />
    </div>
</template>

<style scoped>
.x-tab-pane {
    color: #303133;
}
</style>