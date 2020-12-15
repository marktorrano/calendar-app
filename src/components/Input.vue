<template>
    <div class="md:w-1/2 px-3 py-2">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            {{label}}
        </label>
        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
               type="text" :placeholder="placeholder" :value="value"/>
    </div>
</template>

<script>
    export default {
        setup() {

            return {};
        },
        props: {
            value: {
                type: String,
                default: () => {
                    return ''
                }
            },
            label: {
                type: String,
                default: () => {
                    return ''
                }
            },
            placeholder: {
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