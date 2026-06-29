/<template>
    <div class="x-input" :class="[
        `x-input--${size}`,
        {
            'is-disabled': disabled
        }
    ]">
        <input class="x-input__inner" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
            @input="handleInput" />

        <span v-if="clearable && modelValue && !disabled" class="x-input__clear" @click="handleClear">
            ×
        </span>
    </div>
</template>

<script setup lang="ts">
type InputSize = 'small' | 'medium' | 'large'

const props = withDefaults(
    defineProps<{
        modelValue: string
        placeholder?: string
        disabled?: boolean
        clearable?: boolean
        size?: InputSize
    }>(),
    {
        placeholder: '',
        disable: false,
        clearable: false,
        size: 'medium'
    }
)

const emit = defineEmits<{
    'update:modelValue' : [value: string]
    clear: []
}>()

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

function handleClear() {
    if(props.disabled) return 
    emit('update:modelValue', '')
    emit('clear')
}

</script>

<style scoped>
.x-input {
    display: inline-flex;
    align-items: center;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    background: #fff;
}

.x-input__inner {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: #333;
}

.x-input--small {
    width: 180px;
    height: 30px;
}

.x-input--small .x-input__inner {
    padding: 0 28px 0 8px;
    font-size: 12px;
}

.x-input--medium {
    width: 220px;
    height: 36px;
}

.x-input--medium .x-input__inner {
    padding: 0 32px 0 10px;
    font-size: 14px;
}

.x-input--large {
    width: 260px;
    height: 42px;
}

.x-input--large .x-input__inner {
    padding: 0 36px 0 12px;
    font-size: 16px;
}

.x-input__clear {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: #999;
    user-select: none;
}

.x-input__clear:hover {
    color: #333;
}

.is-disabled {
    background: #f5f7fa;
    cursor: not-allowed;
    opacity: 0.7;
}

.is-disabled .x-input__inner {
    cursor: not-allowed;
}
</style>