import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

const store =  createStore({
    state() {
        return {
            events: [],
            currentEvents: []
        }
    },
    mutations: {
        addEvent(state, payload) {
            payload.uuid = uuidv4();
            state.events.push(payload);
        },
        eventsByDate(state, payload) {
            state.currentEvents = state.events.filter( event => event.eventDate === payload.date);
        },
        removeEvent(state, payload) {
            const index = state.events.findIndex( event => event.uuid === payload.uuid);
            if (index) {
                state.events.splice(index, 1);
            }
        },
    },
    actions: {},
    getters: {
        events: state => {
            return state.events;
        },
        currentEvents: state => {
            return state.currentEvents;
        },

    }
});

export default store;