<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const postId = route.params.id;

const state = reactive({
  post: {},
  isLoading: true,
});

const deletePost = async () => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (confirm) {
      await axios.delete(`/api/posts/${postId}`);
      toast.success('Post Deleted Successfully');
      router.push('/posts');
    }
  } catch (error) {
    console.error('Error deleting Post', error);
    toast.error('Post Not Deleted');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/posts/${postId}`);
    state.post = response.data;
  } catch (error) {
    console.error('Error fetching post', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-violet-50">
    <!-- <div class="container m-auto py-10 px-6"> -->
      <div class="container m-auto max-w-2xl py-24">

        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >

            <h1 class="text-3xl font-bold mb-4">{{ state.post.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-clock text-xl text-gray-700 mr-2"></i>
              <p class="text-gray-700">{{ state.post.time }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-violet-800 text-lg font-bold mb-6">
              Post Content
            </h3>

            <p class="mb-4">
              {{ state.post.content }}
            </p>

           
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
         

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Post</h3>
            <RouterLink
              :to="`/posts/edit/${state.post.id}`"
              class="bg-violet-400 hover:bg-violet-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Post</RouterLink
            >
            <button
              @click="deletePost"
              class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Post
            </button>
          </div>
        </aside>
      </div>
    <!-- </div> -->

  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
