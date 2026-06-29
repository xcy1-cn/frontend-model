<script setup lang="ts">
type TableColumn = {
    prop: string
    label: string
    width?: string
    slot?: string
}

defineProps<{
    data: Record<string, any>[]
    columns: TableColumn[]
}>()
</script>

<template>
    <div class="x-table">
        <table class="x-table__inner">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.prop" :style="{ width: column.width }">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>

            <tbody v-if="data.length">
                <tr v-for="(row, rowIndex) in data" :key="row.id || rowIndex">
                    <td v-for="column in columns" :key="column.prop">
                        <slot v-if="column.slot" :name="column.slot" :row="row" :index="rowIndex" />

                        <span v-else>
                            {{ row[column.prop] }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="!data.length" class="x-table__empty">
            暂无数据
        </div>
    </div>
</template>

<style scoped>
.x-table {
    width: 100%;
    border: 1px solid #ebeef5;
    border-radius: 6px;
    overflow: hidden;
}

.x-table__inner {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.x-table__inner th {
    background: #f5f7fa;
    color: #333;
    font-weight: 600;
}

.x-table__inner th,
.x-table__inner td {
    padding: 12px;
    border-bottom: 1px solid #ebeef5;
    text-align: left;
}

.x-table__inner tr:last-child td {
    border-bottom: none;
}

.x-table__empty {
    padding: 24px;
    text-align: center;
    color: #999;
}
</style>