<template>
    <div class="datePage container mx-auto justify-center flex flex-col px-40 pb-10 pt-4">
        <div class="datePage__container w-full h-auto bg-white shadow-2xl flex flex-col align-top mt-8">
            <div class="datePage__header p-4">Date: {{ date }}</div>
            <div class="divider border-1 border-gray-100"></div>
            <div class="datePage__contents flex">
                <div class="datePage__eventsHeader w-full flex justify-between p-4">
                    <h4 class="text-3xl">Events</h4>
                    <button class="p-0 w-12 h-12 bg-green-400 rounded-full hover:bg-green-800 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                            @click="addEvent">
                        <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
                            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                C15.952,9,16,9.447,16,10z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="datePage__eventsList p-4 min-h-0" v-if="currentEvents.length">
                <div class="datePage__eventItem w-3/6 h-auto shadow-2xl p-2 rounded text-white font-bold my-2 relative"
                     :class="{
                        'bg-purple-400': event.eventType === 'Meeting',
                        'bg-yellow-500': event.eventType === 'Appointment',
                        'bg-blue-400': event.eventType === 'Task',
                     }"
                     v-for="(event, idx) in currentEvents" :key="idx">
                    <div class="w-5 h-5 absolute right-2 cursor-pointer"
                        @click="removeEvent(event)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    <div class="">{{event.eventName}}</div>
                    <div class="text-xs rounded bg-white text-gray-700 inline px-4">{{event.eventType}}</div>
                </div>
            </div>
            <div class="datePage__eventList text-center w-full py-8" v-else>
                No available event for this date...Let's start adding some
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
    <Dialog :title="'Add Event'" @accept="storeEvent">
        <div class="addEvent__form">
            <Input :label="'Name'"
                   :placeholder="'Name'"
                   v-model="event.name"/>
            <Select :options="eventOptions" :label="'Type'" v-model="event.type"></Select>
        </div>
    </Dialog>
</template>

<script>
    import Dialog from '../components/Dialog'
    import Select from '../components/Select'
    import Input from '../components/Input'
    import {getCurrentInstance, reactive} from 'vue'
    import {useStore, mapGetters} from 'vuex'

    export default {
        components: {
            Dialog,
            Select,
            Input
        },
        computed: {
            ...mapGetters(['currentEvents'])
        },
        setup(props) {
            const store = useStore();
            store.commit("eventsByDate", {date: props.date});
            const event = reactive({
                name: '',
                type: 'Meeting',
                storedEvents: []
            });
            const internalInstance = getCurrentInstance();

            const emitter = internalInstance.appContext.config.globalProperties.emitter;

            const addEvent = () => {
                event.name = '';
                emitter.emit('toggleDialog');
            };

            const removeEvent = (event) => {
                store.commit("removeEvent", {uuid: event.uuid});
                store.commit("eventsByDate", {date: props.date});
            };

            const storeEvent = () => {
                const obj = {
                    eventType: event.type,
                    eventName: event.name,
                    eventDate: props.date
                };
                store.commit("addEvent", obj);
                store.commit("eventsByDate", {date: props.date});
                emitter.emit('toggleDialog');
            };

            return {
                addEvent,
                removeEvent,
                storeEvent,
                event,
            }
        },
        props: {
            date: {
                type: String,
                default: () => {
                    return ''
                }
            },
            eventOptions: {
                type: Array,
                default: () => {
                    return [
                        'Meeting',
                        'Appointment',
                        'Task',
                    ]
                }
            },
        },
    }

</script>
