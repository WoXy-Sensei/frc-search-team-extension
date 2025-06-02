<script setup>
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import TeamMap from "@/components/unovis/TeamMap.vue";

const props = defineProps({
    teamNumber: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <slot />
        </PopoverTrigger>
        <PopoverContent class="bg-background p-4">
            <div class="flex flex-col items-center gap-2">
                <TeamMap :team-number="teamNumber" />
                <p class="text-xs text-muted-foreground">
                    All Map Data Powered by frcmap.com
                </p>
            </div>
        </PopoverContent>
    </Popover>
</template>
