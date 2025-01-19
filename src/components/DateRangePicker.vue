<template>
  <el-date-picker
    v-model="dateValue"
    type="daterange"
    unlink-panels
    range-separator="至"
    start-placeholder="開始日期"
    end-placeholder="結束日期"
    :shortcuts="dateShortcuts"
    value-format="YYYY-MM-DD HH:mm:ss"
    class="date-picker"
    @change="handleDateChange"
  />
</template>

<script>
import { ref, watch } from 'vue';
import { useDateShortcuts } from '@/composables/useDateShortcuts';

export default {
  name: 'DateRangePicker',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const dateValue = ref(props.modelValue);
    const { dateShortcuts } = useDateShortcuts();

    const handleDateChange = (val) => {
      emit('update:modelValue', val);
    };

    watch(() => props.modelValue, (newVal) => {
      dateValue.value = newVal;
    });

    return {
      dateValue,
      dateShortcuts,
      handleDateChange
    };
  }
};
</script>

<style lang="scss" scoped>
.date-picker {
  width: 400px;
}
</style> 