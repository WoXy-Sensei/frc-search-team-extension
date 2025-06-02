<script setup>
import { Sparkles } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
</script>

<template>
  <div class="relative overflow-hidden">
    <Button variant="outline" size="icon">
      <Sparkles class="w-4 h-4" />
    </Button>
    <div class="pointer-events-none absolute inset-0 shine-overlay"></div>
  </div>
</template>

<style scoped>
.shine-overlay::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%) rotate(25deg);
  animation: shine 2s infinite;
  pointer-events: none;
  filter: blur(5px);
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(25deg);
  }
  100% {
    transform: translateX(100%) rotate(25deg);
  }
}
</style>