<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ref, watch } from "vue";
import { useFavoritesStore } from "@/stores/favoritesStore";

const props = defineProps({
    open: Boolean,
});
const emit = defineEmits(["update:open", "group-created"]);

const groupName = ref("");
const isCreating = ref(false);
const favoritesStore = useFavoritesStore();
const isError = ref(false);

watch(
    () => props.open,
    (val) => {
        if (!val) groupName.value = "";
    },
);

async function createGroup() {
    const name = groupName.value.trim();
    if (!name) return;

    if (favoritesStore.groups[name]) {
        isError.value = true;
        return;
    }

    isCreating.value = true;
    try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        favoritesStore.addGroup(name);
        emit("group-created", name);
        emit("update:open", false);
    } catch (error) {
        console.error("Error creating group:", error);
    } finally {
        isCreating.value = false;
        isError.value = false;
        groupName.value = "";
    }
}
</script>

<template>
    <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>
        <DialogContent
            class="sm:max-w-[425px] grid grid-rows-[auto_1fr_auto] p-6 gap-4"
        >
            <DialogHeader class="pb-4">
                <DialogTitle>Add New Group</DialogTitle>
                <DialogDescription>
                    Enter a name for the new favorite group.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-2">
                <Input
                    v-model="groupName"
                    placeholder="Group Name"
                    :class="{ 'border-red-500': isError }"
                />
                <p class="text-xs text-red-700" v-if="isError">
                    This group already exists.
                </p>
            </div>
            <Button :disabled="isCreating" class="w-full" @click="createGroup">
                {{ isCreating ? "Creating..." : "Create New Group" }}
            </Button>
        </DialogContent>
    </Dialog>
</template>
