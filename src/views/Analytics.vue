<script>
import axios from "axios"
import Graph from "@/components/Graph.vue"
import { request } from '../auth/auth.js'


export default {
  data() {
    return {
      welcome: false
    }
  },
  components: {
    Graph
  },
  mounted() {
    this.$router.push("/")
    window.localStorage['leadhit-site-id'] ? true : this.$router.push("/auth")
    setTimeout(() => this.welcome = true, 100);
  },
  methods:{
    logout(){
      this.$router.push("/auth")
      localStorage.removeItem("leadhit-site-id")
    }
  }
}
</script>

<template>
  <div>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl m font-[1000] tracking-tight text-primary">Аналитика</h1>
        <button onclick="my_modal_1.showModal()" class="btn bg-primary text-white m font-[600]">Выйти</button>
        <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
            <h3 class="font-[1000] text-primary m text-[26px]">Вы дейстительно хотите выйти?</h3>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn mr-[15px]">отмена</button>
                <button @click="logout()" class="btn btn-primary">да, выйти</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </header>



    <main>
      <div :class="{ welcomeactive: this.welcome }" role="alert" class="alert welcome alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-white shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-white">Добро пожаловать!</span>
      </div>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <!-- Your content -->
        <h2 class="m text-[40px] font-[1000] text-center mb-[20px] mt-[50px] text-primary">Аналитика по визитам</h2>
        <Graph />
      </div>
    </main>
  </div>
</template>

<style>
.welcome {
  z-index: 9999 !important;
  width: max-content !important;
  position: absolute;
  left: 50%;
  top: 0px;
  opacity: 0;
  transform: translateX(-50%);
}

.welcomeactive {
  animation-name: welcome;
  animation-duration: 3s;
}

@keyframes welcome {
  0% {
    top: 0px;
    opacity: 0;
  }

  50% {
    top: 20px;
    opacity: 1;
  }

  100% {
    top: 0px;
    opacity: 0;
  }

}
</style>