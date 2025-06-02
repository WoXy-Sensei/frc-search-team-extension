<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { computed, useTemplateRef } from "vue";
import ShiningText from "./ShiningText.vue";
import { useTeamStore } from "@/stores/teamStore";
import { marked } from "marked";
import { gsap } from "gsap";

const teamStore = useTeamStore();
const isLoading = computed(() => teamStore.teamOverviewIsLoading);
const overview = computed(() => teamStore.teamOverview);
const test = useTemplateRef("test");

async function getOverview() {
    try {
        await teamStore.fetchTeamOverview();
    } catch (error) {
        console.error("An error occurred while fetching overview data:", error);
        overview.value = "An error occurred while loading the overview.";
    }
}

const handleOpenChange = async (open) => {
    if (open) {
        await getOverview();
        const tl = gsap.timeline();
        tl.splitWords(test.value);
    }
};
</script>

<template>
    <Dialog @update:open="handleOpenChange">
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>
        <DialogContent
            class="sm:max-w-[560px] grid grid-rows-[auto_1fr_auto] p-3 overflow-hidden max-h-[90dvh]"
        >
            <DialogHeader>
                <DialogTitle>
                    <ShiningText> AI-Powered Overview </ShiningText>
                </DialogTitle>
                <DialogDescription>
                    <p v-if="isLoading">One moment AI is working...</p>
                    <p v-else>Discover your team’s strengths and story.</p>
                </DialogDescription>
            </DialogHeader>
            <div class="overflow-y-auto overflow-x-hidden">
                <div v-if="isLoading" class="flex flex-col gap-2">
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-6 w-5/6" />
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-6 w-full" />
                    <Skeleton class="h-4 w-1/2" />
                </div>
                <div v-else class="w-full flex items-center justify-center">
                    <p
                        class="text-xs p-1"
                        v-html="marked.parse(overview)"
                        ref="test"
                    ></p>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
