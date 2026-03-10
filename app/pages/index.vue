<script setup>
import Typed from "typed.js"
import { onMounted, onBeforeUnmount, ref } from "vue"

const typedEl = ref(null)
let typedInstance

onMounted(() => {
  typedInstance = new Typed(typedEl.value, {
    strings: [
      "Frontend Developer",
      "Backend Developer",
      "Web Developer",
      "Cyber Security Enthusiast"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  })
})

onBeforeUnmount(() => {
  typedInstance.destroy()
})
</script>

<template>
  <div>
    <UPageHero
    headline="Hii.. Im Hirzi "
      title="Software Engineer"
      description="I build modern, scalable web applications using Vue, React, Laravel, and Go—combining clean design, robust backend systems, and a passion for cybersecurity."
      :links="[{
        label: 'Linked-In',
        to: 'https://www.linkedin.com/in/hirzi-ahnaf/',
        target: '_blank',
        trailingIcon: 'i-simple-icons-linkedin',
        size: 'xl',
        color: 'info',
        
      }, {
        label: 'My GitHub',
        to: 'https://github.com/Zilfs',
        target: '_blank',
        icon: 'i-simple-icons-github',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    >
    <template #headline>
      <span class="text-2xl font-bold text-neutral">Hii.. Im Hirzi👋 </span>
    </template>
      <template #title>
        <span class="text-4xl font-bold">
          <span ref="typedEl" class="bg-clip-text text-transparent bg-gradient-to-r dark:from-sky-200 dark:to-blue-400 from-sky-400 to-blue-600"></span>
        </span>
      </template>
    </UPageHero>

    <!-- <UPageSection
      id="features"
      title="Everything you need to build modern Nuxt apps"
      description="Start with a solid foundation. This template includes all the essentials for building production-ready applications with Nuxt UI's powerful component system."
      :features="[{
        icon: 'i-lucide-rocket',
        title: 'Production-ready from day one',
        description: 'Pre-configured with TypeScript, ESLint, Tailwind CSS, and all the best practices. Focus on building features, not setting up tooling.'
      }, {
        icon: 'i-lucide-palette',
        title: 'Beautiful by default',
        description: 'Leveraging Nuxt UI\'s design system with automatic dark mode, consistent spacing, and polished components that look great out of the box.'
      }, {
        icon: 'i-lucide-zap',
        title: 'Lightning fast',
        description: 'Optimized for performance with SSR/SSG support, automatic code splitting, and edge-ready deployment. Your users will love the speed.'
      }, {
        icon: 'i-lucide-blocks',
        title: '100+ components included',
        description: 'Access Nuxt UI\'s comprehensive component library. From forms to navigation, everything is accessible, responsive, and customizable.'
      }, {
        icon: 'i-lucide-code-2',
        title: 'Developer experience first',
        description: 'Auto-imports, hot module replacement, and TypeScript support. Write less boilerplate and ship more features.'
      }, {
        icon: 'i-lucide-shield-check',
        title: 'Built for scale',
        description: 'Enterprise-ready architecture with proper error handling, SEO optimization, and security best practices built-in.'
      }]"
    /> -->

    <!-- <UPageSection>
      <UPageCTA
        title="Ready to build your next Nuxt app?"
        description="Join thousands of developers building with Nuxt and Nuxt UI. Get this template and start shipping today."
        variant="subtle"
        :links="[{
          label: 'Start building',
          to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral'
        }, {
          label: 'View on GitHub',
          to: 'https://github.com/nuxt-ui-templates/starter',
          target: '_blank',
          icon: 'i-simple-icons-github',
          color: 'neutral',
          variant: 'outline'
        }]"
      />
    </UPageSection> -->
  </div>
</template>
