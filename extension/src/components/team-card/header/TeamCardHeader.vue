<script setup>
import { Star } from "lucide-vue-next";
import ShineButton from "./ShineButton.vue";
import { Button } from "@/components/ui/button";
import AddToFavoritesPopover from "@/components/popovers/AddToFavoritesPopover.vue";
import DeepSeekOverviewModal from "@/components/modals/DeepSeekOverviewModal";
import TeamLinksPopover from "@/components/popovers/TeamLinksPopover.vue";
import { useTeamStore } from "@/stores/teamStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { ref } from "vue";

const teamStore = useTeamStore();
const favoritesStore = useFavoritesStore();
const isOpenAddFavorites = ref(false);

const { name, teamNumber } = defineProps({
    name: String,
    teamNumber: Number,
});

const handleAddFavorites = (isOpen) => {
    isOpenAddFavorites.value = isOpen;
};
</script>

<template>
    <div class="flex justify-between items-center">
        <h2
            class="font-semibold text-base flex items-center justify-center gap-2"
        >
            <TeamLinksPopover
                :teamNumber="teamNumber"
                :year="teamStore.selectedYear"
            >
                <p
                    class="underline underline-offset-4 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis max-w-[20ch]"
                >
                    {{ name }}
                </p>
            </TeamLinksPopover>
            <!-- <Badge>#{{ teamNumber }}</Badge> -->
        </h2>
        <div class="flex flex-row gap-2">
            <AddToFavoritesPopover
                @add="
                    (group) => {
                        favoritesStore.addTeamToGroup(group, teamStore.team);
                    }
                "
                :open="isOpenAddFavorites"
                @update:open="handleAddFavorites"
            >
                <Button variant="outline" size="icon">
                    <Star class="w-4 h-4" />
                </Button>
            </AddToFavoritesPopover>
            <DeepSeekOverviewModal>
                <ShineButton />
            </DeepSeekOverviewModal>
        </div>
    </div>
</template>
