<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  post: Object,
});

const showFullContent = ref(false);

const toggleFullContent = () => {
  showFullContent.value = !showFullContent.value;
};

const truncatedContent = computed(() => {
  let content = props.post.content;
  if (!showFullContent.value) {
    content = content.substring(0, 90) + '...';
  }
  return content;
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        
        <h3 class="text-xl font-bold">{{ post.title }}</h3>
      </div>
      <div class="mb-5">
        <div>
          {{ truncatedContent }}
        </div>
        <button
          @click="toggleFullContent"
          class="text-violet-500 hover:text-green-600 mb-5"
        >
          {{ showFullContent ? 'Less' : 'More' }}
        </button>
      </div>

      <!-- <h3 class="text-green-500 mb-2">{{ job.salary }} / Year</h3> -->

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-gray-700 mb-3">
          <i class="pi pi-clock text-gray-700"></i>
          {{ post.time }}
        </div>
        <RouterLink
          :to="'/posts/' + post.id"
          class="h-[36px] bg-violet-200 hover:bg-violet-400 text-violet-600 px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
