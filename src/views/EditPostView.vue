<script setup>
import router from '@/router';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();

const postId = route.params.id;

const form = reactive({

  title: '',
  content: '',

  time: '',
  company: {
    name: '',
  
    contactEmail: '',
    contactPhone: '',
  },
});

const state = reactive({
  post: {},
  isLoading: true,
});

const toast = useToast();

const handleSubmit = async () => {
  const updatedPost = {
    title: form.title,
    time: form.time,
    content: form.content,
 
    company: {
  
    },
  };

  try {
    const response = await axios.put(`/api/posts/${postId}`, updatedPost);
    toast.success('Post Updated Successfully');
    router.push(`/posts/${response.data.id}`);
  } catch (error) {
    console.error('Error fetching post', error);
    toast.error('Post Was Not Added');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/posts/${postId}`);
    state.post = response.data;
    // Populate inputs
 
    form.title = state.post.title;
    form.content = state.post.content;
  
    form.time = state.post.time;
  } catch (error) {
    console.error('Error fetching post', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-violet-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Post</h2>

     

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Post Listing Name</label
            >
            <input
              type="text"
              v-model="form.title"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            />
          </div>
          <div class="mb-4">
            <label for="content" class="block text-gray-700 font-bold mb-2"
              >Content</label
            >
            <textarea
              id="content"
              v-model="form.content"
              name="content"
              class="border rounded w-full py-2 px-3"
              rows="6"
              placeholder="Add any post duties, expectations, requirements, etc"
            ></textarea>
          </div>

        

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Time </label>
            <input
              type="text"
              v-model="form.time"
              id="time"
              name="time"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Time"
              required
            />
       
            <button
              class="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
