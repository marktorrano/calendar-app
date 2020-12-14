<template>
    <div class="container w-full bg-gray-100 text-gray-900 mx-auto py-10">
        <div class="calendar">
            <div class="calendar__month flex justify-between p-20">
                <i class="button__prev border-solid inline-block p-2 border-black border-t-0 border-r-2 border-b-2 border-l-0 p-6 cursor-pointer"
                   @click="previousMonth"></i>
                <div class="calendar__date">
                    <h1>{{months[selectedMonth]}} {{selectedYear}}</h1>
                    <p>{{currentDate}}</p>
                </div>
                <i class="button__next -rotate-45 border-solid inline-block p-2 border-black border-t-0 border-r-2 border-b-2 border-l-0 p-6 cursor-pointer"
                   @click="nextMonth"></i>
            </div>
            <div class="calendar__weekdays p-20 flex justify-around">
                <div v-for="(day, index) in days" :key="index" class="w-1/7 flex justify-center">{{day}}</div>
            </div>
            <div class="calendar__days px-20 flex flex-wrap justify-start">
                <div v-for="(data, index) in lastDaysOfPrevMonth" :key="index" class="w-1/7 h-40 border-2 p-1 m-0 previousMonth__day bg-gray-300 calendar__day">{{data.day}}</div>
                <div v-for="(data, index) in currentMonthDays" :key="index" class="w-1/7 h-40 border-2 p-1 m-0 calendar__day">{{data.day}}</div>
                <div v-for="(data, index) in firstDaysOfNextMonth" :key="index" class="w-1/7 h-40 border-2 p-1 m-0 nextMonth__day bg-gray-300 calendar__day">{{data.day}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import useDates from '../use/dates';

    export default {
        setup(){
            const {
                previousMonth,
                nextMonth,
                selectedMonth,
                selectedYear,
                currentDate,
                lastDaysOfPrevMonth,
                currentMonthDays,
                firstDaysOfNextMonth,
            } = useDates();
            return {
                previousMonth,
                nextMonth,
                selectedMonth,
                selectedYear,
                currentDate,
                lastDaysOfPrevMonth,
                currentMonthDays,
                firstDaysOfNextMonth,
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
            }
        },
    }
</script>

<style scoped>

</style>