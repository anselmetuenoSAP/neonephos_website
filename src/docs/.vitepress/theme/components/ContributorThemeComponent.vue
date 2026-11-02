<script setup lang="ts">
import NeoNephosDefaultTheme04 from './NeoNephosDefaultTheme04.vue'
import ProjectCardThemeComponent from './ProjectCardThemeComponent.vue'
import TextBlockThemeComponent from './TextBlockThemeComponent.vue'
import PieChartThemeComponent from './PieChartThemeComponent.vue'

import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()

const lifecycleIntroText = `Contributions to NeoNephos go beyond code. If in doubt, reach out through our primary outreach channel below. `
</script>

<template>
  <div>
    <NeoNephosDefaultTheme04 
      :hero="frontmatter.hero" 
      :description="lifecycleIntroText"
    >
      <template #home-hero-after>

        <!-- Top Page-wide Text Block -->
        <TextBlockThemeComponent />

       <LandingTilesMainThemeComponent
    :key="frontmatter.decisionTilesTitle"
    :tiles="frontmatter.decisionTiles"
    :heading="frontmatter.decisionTilesHeading"
    :subheading="frontmatter.decisionTilesSubHeading || frontmatter.decisionTilesSubheading"
        />

        <!-- Bottom Text Block placed below the pie chart -->
        <TextBlockThemeComponent contentKey="textBlockBottom" />
<br>
<br>
        <!-- Centered Propose Project Call-to-Action Button -->
        <section class="propose-cta-section" v-if="frontmatter.proposeButton !== false">
          <div class="section-inner propose-cta-container">
            <a href="https://linuxfoundation.zulipchat.com/#narrow/channel/525732-neonephos-discussion/topic/newsfeed/with/57888001" class="propose-btn">
              I need more guidance. Let's connect.
            </a>
          </div>
        </section>

        <!-- Existing Project Cards Section -->
        <section class="lifecycle-section">
          <div class="section-inner">
            <ProjectCardThemeComponent />
          </div>
        </section>

      </template>
    </NeoNephosDefaultTheme04>
  </div>
</template>

<style scoped>
.markdown-content-section,
.lifecycle-section,
.propose-cta-section {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0;
}

.section-inner {
  max-width: var(--vp-normal-content-max-width);
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  text-align: left;
}

.content-container {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.lifecycle-stages-heading {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-neonephos-blue);
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
  text-align: left;
}

/* Centered Propose Project Button Container */
.propose-cta-container {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
}

.propose-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-neonephos-blue, #1F4FD8);
  border: 1px solid var(--vp-neonephos-blue, #1F4FD8);
  color: #ffffff;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.1s ease;
  box-shadow: var(--vp-shadow-1);
}

.propose-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>