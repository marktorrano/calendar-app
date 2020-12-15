<template>
    <div class="datePage container mx-auto justify-center flex flex-col px-40 pb-10 pt-4">
        <div class="datePage__container w-full h-screen bg-white shadow-2xl flex flex-col align-bottom">
            <div class="datePage__header p-4">Day: {{ date }}</div>
            <div class="divider border-1 border-gray-100"></div>
            <div class="datePage__contents flex h-full">
                <div class="datePage__eventsHeader w-full flex justify-between p-4">
                    <h4 class="text-3xl">Events</h4>
                    <button
                            class="p-0 w-12 h-12 bg-green-400 rounded-full hover:bg-green-800 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                        <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
                            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                C15.952,9,16,9.447,16,10z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="divider border-1 border-gray-100"></div>
            <div class="datePage__footer mx-auto w-full flex justify-end px-4 py-4">
                <router-link :to="{ name: 'Home' }"
                             class="border border-gray-300 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                    Back
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {useRouter} from 'vue-router'

    export default {
        props: [
            'date'
        ],
        setup() {
            window.route = useRouter;
        }
    }

</script>
