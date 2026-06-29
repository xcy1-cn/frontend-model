<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        currentPage: number
        pageSize: number
        total: number
        pageSizes?: number[]
    }>(),
    {
        pageSizes: () => [5, 10, 20, 50]
    }
)

const emit = defineEmits<{
    'update:currentPage': [value: number]
    'update:pageSize': [value: number]
    change: []
}>()

const totalPage = computed(() => {
    return Math.max(1, Math.ceil(props.total / props.pageSize))
})

function changePage(page: number) {
    if (page < 1 || page > totalPage.value) return

    emit('update:currentPage', page)
    emit('change')
}

function changePageSize(event: Event) {
    const target = event.target as HTMLSelectElement
    const newSize = Number(target.value)

    emit('update:pageSize', newSize)
    emit('update:currentPage', 1)
    emit('change')
}
</script>

<template>
    <div class="x-pagination">
        <span class="x-pagination__total">
            共 {{ total }} 条
        </span>

        <select class="x-pagination__select" :value="pageSize" @change="changePageSize">
            <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }} 条/页
            </option>
        </select>

        <button class="x-pagination__button" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
            上一页
        </button>

        <span class="x-pagination__page">
            {{ currentPage }} / {{ totalPage }}
        </span>

        <button class="x-pagination__button" :disabled="currentPage >= totalPage" @click="changePage(currentPage + 1)">
            下一页
        </button>
    </div>
</template>

<style scoped>
.x-pagination {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    font-size: 14px;
}

.x-pagination__total {
    color: #606266;
}

.x-pagination__select {
    height: 32px;
    padding: 0 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
}

.x-pagination__button {
    height: 32px;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
}

.x-pagination__button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.x-pagination__page {
    color: #303133;
}
</style>