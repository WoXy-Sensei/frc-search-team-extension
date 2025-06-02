<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useFavoritesStore } from "@/stores/favoritesStore";

const emit = defineEmits(["add", "update:open"]);

const props = defineProps({
    open: Boolean,
});

const selectedGroup = ref<string | null>(null);
const favoritesStore = useFavoritesStore();

const groups = computed(() => Object.keys(favoritesStore.groups));
</script>

<template>
    <Popover :open="open" @update:open="(v) => emit('update:open', v)">
        <PopoverTrigger as-child>
            <slot />
        </PopoverTrigger>
        <PopoverContent class="w-56 bg-background">
            <div class="flex gap-3 flex-col">
                <Select v-model="selectedGroup">
                    <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem
                                v-for="group in groups"
                                :key="group"
                                :value="group"
                            >
                                {{ group }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button
                    class="w-full"
                    variant="outline"
                    :disabled="!selectedGroup"
                    @click="
                        () => {
                            emit('add', selectedGroup!);
                            emit('update:open', false);
                        }
                    "
                >
                    Save
                </Button>
            </div>
        </PopoverContent>
    </Popover>
</template>
