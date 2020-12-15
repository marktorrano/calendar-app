<template>
    <div class="container w-full text-gray-900 mx-auto py-10 shadow-2xl mt-8">
        <div class="calendar">
            <div class="calendar__month flex justify-between px-20">
                <div class="button__container">
                    <i class="button__prev border-solid inline-block p-2 border-black border-t-0 border-r-2 border-b-2 border-l-0 p-6 cursor-pointer"
                       @click="previousMonth"></i>
                </div>
                <div class="calendar__date w-8/12 flex justify-between">
                    <div class="w-9/12">
                        <h1 class="text-3xl">{{months[selectedMonth]}} {{selectedYear}}</h1>
                        <p>{{currentDate}}</p>
                    </div>
                    <div class="w-20">
                        <div class="px-4 py-2 shadow-2xl border rounded cursor-pointer hover:bg-blue-400 hover:text-white text-bold"
                             @click="goToCurrentMonth"
                        >Today</div>
                    </div>
                </div>
                <div class="button__container">
                    <i class="button__next -rotate-45 border-solid inline-block p-2 border-black border-t-0 border-r-2 border-b-2 border-l-0 p-6 cursor-pointer"
                       @click="nextMonth"></i>
                </div>
            </div>
            <div class="calendar__weekdays pt-20 px-10 pb-4 flex justify-around">
                <div v-for="(day, index) in days" :key="index" class="w-1/7 flex justify-center">{{day}}</div>
            </div>
            <div class="calendar__days px-20 flex flex-wrap justify-start">
                <router-link :to="{ name: 'Date Page', params: { date: data.date}}"
                             v-for="(data, index) in lastDaysOfPrevMonth"
                             :key="index"
                             :class="{
                                 'calendar__day--current' : currentDate === data.dateTimeString
                             }"
                             class="w-1/7 h-40 border-2 p-1 m-0 calendar__day bg-gray-300">
                    <div class="calendar__dayLabel">{{data.day}}</div>
                    <div class="calendar_events flex flex-wrap overflow-hidden">
                        <div class="calendar_event w-4/12 flex justify-center align-middle m-2"
                             v-for="(eventType, idx) in eventTypes" :key="idx">
                             <span v-if="getEventCountByType(events, eventType, data.date)"
                                   class="text-white font-bold text-sm p-1 w-full text-center rounded shadow-lg"
                                   :class="{
                                    'bg-purple-400': eventType === 'Meeting',
                                    'bg-yellow-500': eventType === 'Appointment',
                                    'bg-blue-400': eventType === 'Task',
                                 }"
                             >{{getEventCountByType(events, eventType, data.date)}}</span>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{ name: 'Date Page', params: { date: data.date}}"
                             v-for="(data, index) in currentMonthDays"
                             :key="index"
                             :class="{
                                 'calendar__day--current' : currentDate === data.dateTimeString
                             }"
                             class="w-1/7 h-40 border-2 p-1 m-0 calendar__day">
                    <div class="calendar__dayLabel">{{data.day}}</div>
                    <div class="calendar_events flex flex-wrap overflow-hidden">
                        <div class="calendar_event w-4/12 flex justify-center align-middle m-2"
                             v-for="(eventType, idx) in eventTypes" :key="idx">
                             <span v-if="getEventCountByType(events, eventType, data.date)"
                                   class="text-white font-bold text-sm p-1 w-full text-center rounded shadow-lg"
                                   :class="{
                                    'bg-purple-400': eventType === 'Meeting',
                                    'bg-yellow-500': eventType === 'Appointment',
                                    'bg-blue-400': eventType === 'Task',
                                 }"
                             >{{getEventCountByType(events, eventType, data.date)}}</span>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{ name: 'Date Page', params: { date: data.date}}"
                             v-for="(data, index) in firstDaysOfNextMonth"
                             :key="index"
                             :class="{
                                 'calendar__day--current' : currentDate === data.dateTimeString
                             }"
                             class="w-1/7 h-40 border-2 p-1 m-0 calendar__day bg-gray-300">
                    <div class="calendar__dayLabel">{{data.day}}</div>
                    <div class="calendar_events flex flex-wrap overflow-hidden">
                        <div class="calendar_event w-4/12 flex justify-center align-middle m-2"
                             v-for="(eventType, idx) in eventTypes" :key="idx">
                             <span v-if="getEventCountByType(events, eventType, data.date)"
                                   class="text-white font-bold text-sm p-1 w-full text-center rounded shadow-lg"
                                   :class="{
                                    'bg-purple-400': eventType === 'Meeting',
                                    'bg-yellow-500': eventType === 'Appointment',
                                    'bg-blue-400': eventType === 'Task',
                                 }"
                             >{{getEventCountByType(events, eventType, data.date)}}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import useDates from '../use/dates';
    import {mapGetters, useStore} from 'vuex'

    export default {
        computed: {
            ...mapGetters(['events'])
        },
        setup() {
            window.store = useStore();
            const getEventCountByType = (events, type, date) => {
                const list = [];
                events.forEach(function(evt) {
                    if (evt.eventType === type && evt.eventDate === date) {
                        list.push(evt);
                    }
                });
                return list.length;
            };
            const eventsByDate = (events, date) => {
                const list = [];
                events.forEach(function(evt) {
                   if (evt.eventDate === date) {
                       list.push(evt);
                   }
                });
                return list;
            };

            const {
                lastDays,
                previousMonth,
                nextMonth,
                selectedMonth,
                selectedYear,
                currentDate,
                lastDaysOfPrevMonth,
                currentMonthDays,
                firstDaysOfNextMonth,
                goToCurrentMonth
            } = useDates();
            return {
                lastDays,
                previousMonth,
                nextMonth,
                selectedMonth,
                selectedYear,
                currentDate,
                lastDaysOfPrevMonth,
                currentMonthDays,
                firstDaysOfNextMonth,
                eventsByDate,
                getEventCountByType,
                goToCurrentMonth
            };
        },
        props: {
            months: {
                type: Array,
                default: () => [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ]
            },
            days: {
                type: Array,
                default: () => [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                ]
            },
            eventTypes: {
                type: Array,
                default: () => [
                    "Meeting",
                    "Appointment",
                    "Task",
                ]
            }
        },
    }
</script>

<style scoped>

</style>