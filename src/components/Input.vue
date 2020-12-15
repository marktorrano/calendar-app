<template>
    <div class="md:w-1/2 px-3 py-2">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" :for="label">
            {{label}}
        </label>
        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
               :id="label"
               :type="type"
               :placeholder="placeholder"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"/>
    </div>
</template>

<script>
    export default {
        setup(props, context) {
            const updateValue = (modelValue) => {
                context.emit('update:modelValue', modelValue);
            };

            return {
                updateValue
            };
        },
        emits: ['update:modelValue'],
        props: {
            modelValue: {
                type: [String, Number],
                default: ''
            },
            type: {
                type: String,
                default : 'text'
            },
            label: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },

        }
    }
</script>

<style scoped>

</style>