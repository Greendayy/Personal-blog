<script setup>
import router from '@/router';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import Editor from 'primevue/editor';

const form = reactive({
  title: '',
  content: '',
  time: '',
});

const toast = useToast();

const handleSubmit = async () => {
  const newPost = {
    title: form.title,
    time: form.time,
    content: form.content
  };

  try {
    const response = await axios.post('/api/posts', newPost);
    toast.success('Post Added Successfully');
    router.push(`/posts/${response.data.id}`);
  } catch (error) {
    console.error('Error fetching post', error);
    toast.error('Post Was Not Added');
  }
};
</script>

<template>
  <section class="bg-violet-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Post</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Post  Name</label
            >
            <input
              type="text"
              v-model="form.title"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. My Beautiful Day"
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
              placeholder="Write anything here..."
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
              placeholder="2025-03-03 12:00"
              required
            />
          </div>
          <div>
            <button
              class="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
