<script setup>
import Hero from '@/components/Hero.vue';
import PostListings from '@/components/PostListings.vue';
</script>

<template>
  <Hero />
  <PostListings :limit="2" :showButton="true" />
</template>
