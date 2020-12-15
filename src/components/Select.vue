<template>
    <div class="md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
            {{label}}
        </label>
        <div class="relative">
            <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                    id="grid-state">
                <option v-for="(option, idx) in options" :key="idx" :value="option">{{option}}</option>
            </select>
            <div class="pointer-events-none absolute top-4 right-0 flex items-center px-2 text-grey-darker">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        setup() {
            return {};
        },
        props: {
            options: {
                type: Array,
                default: () => {
                    return []
                }
            },
            label: {
                type: String,
                default: () => {
                    return ''
                }
            },

        }
    }
</script>

<style scoped>

</style>