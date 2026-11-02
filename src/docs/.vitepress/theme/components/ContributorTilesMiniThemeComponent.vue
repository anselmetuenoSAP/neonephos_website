<script setup lang="ts">
import { computed } from 'vue'
import { resolveSrc } from '../utils'

interface ProjectCard {
  title?: string
  logo?: string
  link?: string
}

const props = defineProps<{
  features?: any
  cards?: any
}>()

const ambassadorBadge = {
  name: "Ambassador Badge 2026",
  imgsrc: "/assets/badge_ambassador_2026.svg"
}

const projectList = computed(() => {
  const raw = props.cards || props.features
  let list: ProjectCard[] = []
  
  if (Array.isArray(raw)) {
    list = raw
  } else if (typeof raw === 'object' && raw !== null) {
    list = Object.values(raw).flat() as ProjectCard[]
  }

  const extracted = list
    .filter(item => item && item.logo)
    .map(item => ({
      name: item.title || 'Project logo',
      imgsrc: item.logo!
    }))

  return [ambassadorBadge, ...extracted]
})
</script>

<template>
  <div v-if="projectList.length > 0" class="mini-contributor-carousel">
    <div class="carousel-track">
      <!-- Original Set -->
      <div
        v-for="(item, index) in projectList"
        :key="'orig-' + index"
        class="mini-contributor-tile"
      >
        <div class="mini-contributor-img-container">
          <img
            class="mini-contributor-img"
            :src="resolveSrc(item.imgsrc)"
            :alt="item.name"
            @error="(e: Event) => { (e.target as HTMLElement).style.display = 'none' }"
          />
        </div>
      </div>
      <!-- Duplicate Set for Seamless Infinite Loop -->
      <div
        v-for="(item, index) in projectList"
        :key="'dup-' + index"
        class="mini-contributor-tile"
      >
        <div class="mini-contributor-img-container">
          <img
            class="mini-contributor-img"
            :src="resolveSrc(item.imgsrc)"
            :alt="item.name"
            @error="(e: Event) => { (e.target as HTMLElement).style.display = 'none' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mini-contributor-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 6px 0;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.carousel-track {
  display: flex;
  gap: 1rem;
  width: max-content;
  animation: scroll-left 50s linear infinite;
  /* Removed hover pause-state rule */
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.mini-contributor-tile {
  width: 104px;
  height: 104px;
  flex-shrink: 0;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.mini-contributor-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f7;
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.mini-contributor-img {
  width: 75%;
  height: auto;
  max-height: 75%;
  object-fit: contain;
  pointer-events: none;
}
</style>