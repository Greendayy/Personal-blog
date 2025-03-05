<script setup>
import { RouterLink } from 'vue-router';
import PostListing from './PostListing.vue';
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';


defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  posts: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get('/api/posts');
    state.posts = response.data;
  } catch (error) {
    console.error('Error fetching posts', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-violet-500 mb-6 text-center">
        Browse Posts
      </h2>
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Shoe post listing when done loading -->
      <div v-else class="grid grid-cols-1 gap-6 max-w-2xl m-auto">
        <PostListing
          v-for="post in state.posts.slice(0, limit || state.posts.length)"
          :key="post.id"
          :post="post"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/posts"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Posts</RouterLink
    >
  </section>
</template>
