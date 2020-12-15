<template>
    <teleport to="#dialogs">
        <transition name="fade-up-down">
            <div v-show="visible" class="dialog__wrapper inline-block flex items-center z-30 fixed inset-0 h-screen w-screen bg-gray-800-opacity">
                <div class="dialog max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-white max-h-screen shadow-lg flex-row rounded relative">
                    <div class="modal-header p-5 bg-gray-600 text-gray-900 rounded-t">
                        <h5 class="text-white text-2xl uppercase">{{title}}</h5>
                    </div>
                    <div class="dialog__body p-5 overflow-y-auto">
                        <slot></slot>
                    </div>
                    <div class="modal-footer py-3 px-5 border0-t text-right">
                        <button class="border border-green-400 text-green-400 hover:text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-400 focus:outline-none focus:shadow-outline"
                                @click="acceptAction"
                        >{{acceptLabel}}</button>
                        <button class="border border-gray-300 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                                @click="visible = false"
                        >{{backLabel}}</button>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
    import { ref } from 'vue'
    import { getCurrentInstance } from 'vue'

    export default {
        emits: ['accept'],
        setup(_, context) {
            const internalInstance = getCurrentInstance();
            const emitter = internalInstance.appContext.config.globalProperties.emitter;
            const acceptLabel = ref('Save');
            const backLabel = ref('Back');
            const visible = ref(false);

            const backAction = function() {
                visible.value = false;
            };

            const acceptAction = function() {
                context.emit('accept')
            };

            emitter.on('toggleDialog', () => {
                visible.value = !visible.value;
            });

            emitter.on('closeDialog', () => {
                backAction();
            });
            return {
                acceptLabel,
                backLabel,
                backAction,
                visible,
                acceptAction
            };
        },
        props: {
            title: {
                type: String,
                default: () => {
                    return 'Dialog'
                }
            },
            accept: {
                type: Function,
                default: () => {}
            }
        }
    }
</script>

<style scoped>

    .dialog__body {
        max-height: 500px;
        width: 50rem;
    }

    .bg-gray-800-opacity {
        background-color: #2D374850;
    }

    @media screen and (max-width: 768px) {
        .dialog__body {
            max-height: 400px;
        }
    }

    .fade-up-down-enter-active {
        transition: all 0.3s ease;
    }

    .fade-up-down-leave-active {
        transition: all 0.3s ease;
    }

    .fade-up-down-enter {
        transform: translateY(10%);
        opacity: 0;
    }

    .fade-up-down-leave-to {
        transform: translateY(10%);
        opacity: 0;
    }

    .fade-enter-active {
        -webkit-transition: opacity 2s;
        transition: opacity .3s;

    }

    .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

</style>