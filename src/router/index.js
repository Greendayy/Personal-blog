import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PostsView from "@/views/PostsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import PostView from "@/views/PostView.vue";
import AddPostView from "@/views/AddPostView.vue";
import EditPostView from "@/views/EditPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts",
      name: "posts",
      component: PostsView,
    },
    {
      path: "/posts/:id",
      name: "post",
      component: PostView,
    },
    {
      path: "/posts/add",
      name: "add-post",
      component: AddPostView,
    },
    {
      path: "/posts/edit/:id",
      name: "edit-post",
      component: EditPostView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
