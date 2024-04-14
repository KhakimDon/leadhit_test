<script>
import axios from "axios"
import { request } from '../auth/auth.js'
export default {
    data() {
        return {
            leadhitSiteId: '',
            counter: 24,
            error: false,
            errorTitle: '',
            loader: false,
        }
    },
    mounted() {
    },
    methods: {
        async check() {
            if (this.leadhitSiteId.length != 24) this.error = true, this.errorTitle = "id сайта должен содержать 24 символа"
            else this.loader = true, await request(this.leadhitSiteId) ? this.passed() : this.checkError()
        },
        checkError() {
            this.loader = false
            this.errorTitle = "Неправильный ID сайта"
            this.error = true
        },
        passed() {
            this.loader = false
            window.localStorage["leadhit-site-id"] = this.leadhitSiteId
            this.$router.push("/")
        },
        type() {
            this.counter = 24 - this.leadhitSiteId.length
            this.error = false
        }
    }
}

</script>

<template>
    <div class="auth">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div :class="{alertActive: this.error}" role="alert" class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Ошибка! Повторите попытку</span>
            </div>

            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2
                    class="mt-10 text-center mb-[20px] text-primary text-[70px] font-[1000] leading-9 m tracking-tight text-gray-900">
                    LeadHit</h2>

            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form @submit.prevent="check()" class="space-y-6" action="#" method="POST">
                    <div>
                        <label for="email"
                            class="block m text-sm font-medium leading-6  flex justify-between items-center text-gray-900"><span>ID
                                Сайта</span> <span :class="{ errorColor: this.error }"
                                v-if="24 - this.leadhitSiteId.length != 0 && 24 - this.leadhitSiteId.length != 24">Ещё
                                {{ this.counter }} символа</span></label>
                        <div class="mt-2">
                            <input @input="type()" v-model="leadhitSiteId" placeholder="Рвоно 24 символа" id="id"
                                maxlength="24" name="id" type="text" autocomplete="id"
                                :class="{ errorBorder: this.error }"
                                class="block pl-[20px] m w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                        <div class="h-[30px] mt-[10px]">
                            <span v-if="error" class="text-red-500 text-[13px] m font-[700]">{{ this.errorTitle
                                }}</span>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full m justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <span v-if="!this.loader">Войти</span>
                            <span v-if="this.loader" class="loading loading-dots loading-xs"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.errorColor {
    color: red !important;
}

.errorBorder {
    border: 1px solid red !important;
}

.m {
    font-family: "Montserrat", sans-serif;
}
.alert{
    width: calc(100% - 30px);
    position: absolute !important;
    right: 0px;
    opacity: 0 !important;
    top: 20px;
    transition-duration: .3s !important;
    width: max-content;
}
.alertActive{
    opacity: 1 !important;
    width: calc(100% - 30px);
    position: absolute !important;
    right: 20px;
    top: 20px;
    width: max-content;
}
</style>