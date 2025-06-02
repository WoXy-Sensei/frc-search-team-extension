<script setup>
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { StatBoticsIcon, TBAIcon } from "@/components/icons";

defineProps({
    teamNumber: {
        type: Number,
        required: true,
    },
    year: {
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
        <PopoverContent class="bg-background w-56">
            <div class="flex flex-col gap-2">
                <a :href="`https://www.statbotics.io/team/${teamNumber}/${year}`" target="_blank">
                    <Button
                        variant="outline"
                        class="w-full flex items-center justify-start px-3"
                    >
                        <StatBoticsIcon class="w-4 h-4 mr-2" />
                        <p class="">Statbotics</p>
                    </Button>
                </a>
                <a :href="`https://www.thebluealliance.com/team/${teamNumber}/${year}`"target="_blank">
                    <Button
                        variant="outline"
                        class="w-full flex items-center justify-start px-3"
                    >
                        <TBAIcon class="w-4 h-4 mr-2" />
                        <p class="">The Blue Alliance</p>
                    </Button>
                </a>
            </div>
        </PopoverContent>
    </Popover>
</template>
