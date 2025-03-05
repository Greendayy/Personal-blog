<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class=" border-b border-violet-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="welcome greenday's blog" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >welcome to greenday's blog</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'text-violet-500'
                    : 'hover:text-violet-500',
                  'px-3',
                  'py-2',
                  
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/posts"
                :class="[
                  isActiveLink('/posts')
                    ? 'text-violet-500'
                    : 'hover:text-violet-500',
                  'px-3',
                  'py-2',
                ]"
                >Posts</RouterLink
              >
              <RouterLink
                to="/posts/add"
                :class="[
                  isActiveLink('/posts/add')
                    ? 'text-violet-500'
                    : 'hover:text-violet-500',
                  'px-3',
                  'py-2', 
                ]"
                >Write</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
