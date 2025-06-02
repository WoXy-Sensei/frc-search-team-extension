<script setup>
import { computed } from "vue";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTeamStore } from "@/stores/teamStore";

const teamStore = useTeamStore();

const availableYears = computed(() => {
    return teamStore.availableYears;
});

const props = defineProps({
    rookieYear: {
        type: Number,
        required: true,
    },
    modelValue: {
        type: [String, Number],
        default: "",
    },
});

const emit = defineEmits(["update:modelValue", "yearSelected"]);

const currentCalendarYear = new Date().getFullYear();

const selectedYear = computed({
    get() {
        const parentValueStr = String(props.modelValue);
        if (
            props.modelValue &&
            availableYears.value.map(String).includes(parentValueStr)
        ) {
            return parentValueStr;
        }
        return String(currentCalendarYear);
    },
    set(newValue) {
        emit("update:modelValue", newValue);
        emit("yearSelected", newValue);
    },
});

if (!props.modelValue && availableYears.value.includes(currentCalendarYear)) {
    emit("update:modelValue", String(currentCalendarYear));
}
</script>

<template>
    <Select
        class="h-8"
        v-model="selectedYear"
        :disabled="availableYears.length <= 0 || teamStore.isLoading"
    >
        <SelectTrigger class="h-8 w-24">
            <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectItem
                    v-for="year in availableYears"
                    :key="year"
                    :value="String(year)"
                    class="w-32"
                >
                    {{ year }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>
