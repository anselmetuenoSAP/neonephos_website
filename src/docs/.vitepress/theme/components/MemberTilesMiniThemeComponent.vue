<script setup lang="ts">
import { computed } from 'vue'
import { resolveSrc } from '../utils'

interface MemberFeature {
  name?: string
  imgsrc: string
  link?: string
}

const props = defineProps<{
  features?: any
  members?: any
}>()

const memberList = computed(() => {
  const raw = props.members || props.features
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'object') {
    let flattened: MemberFeature[] = []
    for (const key of Object.keys(raw)) {
      if (Array.isArray(raw[key])) {
        flattened = flattened.concat(raw[key])
      }
    }
    return flattened
  }
  return []
})
</script>

<template>
  <div v-if="memberList.length > 0" class="mini-member-carousel">
    <div class="carousel-track">
      <!-- Original Set -->
      <div
        v-for="(feature, index) in memberList"
        :key="'orig-' + index"
        class="mini-member-tile"
      >
        <div class="mini-member-img-container">
          <img
            class="mini-member-img"
            :src="resolveSrc(feature.imgsrc)"
            :alt="feature.name || 'Member logo'"
          />
        </div>
      </div>
      <!-- Duplicate Set for Seamless Infinite Loop -->
      <div
        v-for="(feature, index) in memberList"
        :key="'dup-' + index"
        class="mini-member-tile"
      >
        <div class="mini-member-img-container">
          <img
            class="mini-member-img"
            :src="resolveSrc(feature.imgsrc)"
            :alt="feature.name || 'Member logo'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mini-member-carousel {
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
  animation: scroll-left 150s linear infinite;
}

.carousel-track:hover {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Doubled tile dimensions: 104px x 104px */
.mini-member-tile {
  width: 104px;
  height: 104px;
  flex-shrink: 0;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.mini-member-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f7;
  width: 100%;
  height: 100%;
}

.mini-member-img {
  width: 75%;
  height: auto;
  max-height: 75%;
  object-fit: contain;
  pointer-events: none;
}
</style>