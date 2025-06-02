<script setup>
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AddFavoriteGroupModal from "@/components/modals/AddFavoriteGroupModal.vue";
import { Separator } from "@/components/ui/separator";
import { ref, computed, watch } from "vue";
import { useFavoritesStore } from "@/stores/favoritesStore";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue", "remove"]);

const favoritesStore = useFavoritesStore();

const internalSelectedGroup = ref(props.modelValue);

watch(
    () => props.modelValue,
    (val) => {
        internalSelectedGroup.value = val;
    },
);

watch(internalSelectedGroup, (val) => {
    emit("update:modelValue", val);
});

const isAddModalOpen = computed(
    () => internalSelectedGroup.value === "add_new",
);

const handleModalToggle = (open) => {
    if (!open) {
        internalSelectedGroup.value = "";
    }
};

const groups = computed(() => [
    {
        label: "Groups",
        options: Object.keys(favoritesStore.groups).map((name) => ({
            label: name,
            value: name,
        })),
    },
]);
</script>

<template>
    <AddFavoriteGroupModal
        :open="isAddModalOpen"
        @update:open="handleModalToggle"
        @group-created="(name) => (internalSelectedGroup.value = name)"
    />

    <Select v-model="internalSelectedGroup">
        <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a Group" />
        </SelectTrigger>

        <SelectContent>
            <template v-for="group in groups" :key="group.label">
                <SelectGroup>
                    <SelectItem
                        v-for="option in group.options"
                        :key="option.value"
                        :value="option.value"
                        class="w-full flex justify-between"
                    >
                        <div class="w-full flex justify-between">
                            {{ option.label }}
                        </div>
                    </SelectItem>
                </SelectGroup>
            </template>

            <Separator />
            <SelectGroup>
                <SelectItem value="add_new">Add New Group</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>
