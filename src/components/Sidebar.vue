<template>
  <div
    class="hidden lg:block fixed w-48 top-16 px-4 sm:px-8 bg-color-white py-6 h-full border-solid border-r border-gray-900"
  >
    <div>
      <p class="mb-2 text-color-light-text">Browse</p>
      <ul class="ml-2">
        <li class="my-4">
          <router-link class="flex items-center cursor-pointer gap-4" to="/">
            <i class="fa fa-house text-color-secondary w-4"></i>
            <span class="text-[14px] font-bold">Home</span>
          </router-link>
        </li>
        <li class="my-4">
          <router-link
            class="flex items-center cursor-pointer gap-4"
            to="/trending"
          >
            <i class="fa fa-radio text-red-400 w-4"></i>
            <span class="text-[14px] font-[400]">Trending</span>
          </router-link>
        </li>
        <li class="my-4">
          <router-link
            class="flex items-center cursor-pointer gap-4"
            to="/latest"
          >
            <i class="fab fa-cc-discover text-red-400 w-4"></i>
            <span class="text-[14px] font-[400]">Latest Songs</span>
          </router-link>
        </li>
        <li class="my-4">
          <router-link
            class="flex items-center cursor-pointer gap-4"
            to="/artists"
          >
            <i class="fas fa-arrow-trend-up text-red-400 w-4"></i>
            <span class="text-[14px] font-[400]">Artists</span>
          </router-link>
        </li>
        <li class="my-4">
          <router-link
            class="flex items-center cursor-pointer gap-4"
            to="/manage"
          >
            <i class="fas fa-clone text-red-400 w-4"></i>
            <span class="text-[14px] font-[400]">Manage</span>
          </router-link>
        </li>

        <li class="my-4">
          <router-link
            class="flex items-center cursor-pointer gap-4"
            to="/chart"
          >
            <i class="fas fa-chart-simple text-red-400 w-4"></i>
            <span class="text-[14px] font-[400]">Charts</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div>
      <p class="my-4 text-color-light-text">Library</p>
      <ul class="ml-2">
        <li class="my-4">
          <router-link class="flex items-center cursor-pointer gap-4" to="/">
            <i class="fas fa-arrow-trend-up text-red-400 w-4"></i>
            <span class="text-[14px] font-[400]">Stream</span>
          </router-link>
        </li>
        <li class="my-4">
          <router-link class="flex items-center cursor-pointer gap-4" to="/">
            <i class="fas fa-chart-simple text-red-400 w-4"></i>
            <span class="text-[14px] font-[400]">Playlist</span>
          </router-link>
        </li>
        <li class="my-4">
          <router-link class="flex items-center cursor-pointer gap-4" to="/">
            <i class="fa fa-radio text-red-400 w-4"></i>
            <span class="text-[14px] font-[400]">Likes</span>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- aside footer -->
    <ul class="fixed left-0 bottom-16 px-8 flex flex-col gap-2">
      <!-- <li class="">
        <router-link to="/">About Us</router-link>
      </li> -->
      <li class="">
        <router-link to="/">Contact Us</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style></style>
