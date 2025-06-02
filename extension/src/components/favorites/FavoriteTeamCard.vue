<script setup>
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-vue-next";
import { defineEmits } from "vue";

defineProps({
    team: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["remove"]);

const apiUrl = import.meta.env.VITE_API_URL;
</script>

<template>
    <div
        class="favorite-team bg-popover w-full flex flex-row justify-between items-center border border-input p-1 my-2 rounded-lg hover:bg-input transition"
    >
        <RouterLink
            :to="`/?teamNumber=${team.team}`"
            class="flex flex-row items-center gap-3 flex-1 no-underline text-foreground"
        >
            <div class="team-logo w-8 h-8">
                <img
                    :src="`${apiUrl}/tba/frc${team.team}/image`"
                    :alt="team.name"
                    class="object-contain w-full h-full"
                />
            </div>
            <div class="team-content flex flex-row items-center gap-3">
                <h2 class="text-sm truncate max-w-[170px]">
                    {{ team.name }}
                </h2>
                <Badge class="text-xs">#{{ team.team }}</Badge>
            </div>
        </RouterLink>

        <div class="team-actions">
            <Button
                variant="outline"
                class="cursor-pointer"
                size="icon"
                @click="emit('remove')"
            >
                <X class="w-4 h-4" />
            </Button>
        </div>
    </div>
</template>
