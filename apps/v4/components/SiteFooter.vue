<script setup lang="ts">
import { siteConfig } from '@/lib/config'
</script>

<template>
  <footer class="group-has-[.docs-nav]/body:pb-20 group-has-[.section-soft]/body:bg-surface/40 group-has-[[data-slot=designer]]/body:hidden group-has-[[data-slot=docs]]/body:hidden group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent dark:group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent">
    <div class="container-wrapper px-4 xl:px-6">
      <div class="flex h-(--footer-height) items-center justify-between">
        <div class="w-full px-1 text-center text-xs leading-loose text-muted-foreground sm:text-sm">
          V-Design is built on
          <a
            :href="siteConfig.links.upstream"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            shadcn-vue</a>, distributed under the MIT License. Source code is available on
          <a
            :href="siteConfig.links.github"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </div>
  </footer>
</template>
