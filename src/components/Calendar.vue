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
    import { ref, computed } from 'vue';

    export default {
        setup(){
            const date = ref(new Date());
            const currentDate = ref(new Date().toDateString());

            const selectedMonth = computed(() => {
                return date.value.getMonth();
            });

            const selectedYear = computed(() => {
                return date.value.getFullYear();
            });

            const monthDays = computed(() => {
                return new Date(selectedYear.value, selectedMonth.value, 0).getDate();
            });

            const lastDay = computed(() => {
                return new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDate();
            });

            const prevLastDayOfPrevMonth = computed(() => {
                return new Date(date.value.getFullYear(), date.value.getMonth(), 0).getDate();
            });

            const firstDayIndex = computed(() => {
                return date.value.getDay();
            });

            const lastDayIndex = computed(() => {
                return new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDay();
            });

            const lastDays = computed(() => {
                return 14 - lastDayIndex.value - 1
            });

            const lastDaysOfPrevMonth = computed(() => {
                let days = [];
                for (let day = firstDayIndex.value; day >= 0; day--) {
                    const dayResult = prevLastDayOfPrevMonth.value - day;
                    const obj = {
                        day: dayResult,
                        dateTime: new Date(selectedYear.value, selectedMonth.value, 0),
                        date: `${selectedYear.value}-${selectedMonth.value}-${dayResult}`,
                    };
                    days.push(obj);
                }
                return days;
            });

            const currentMonthDays = computed(() => {
                let days = [];
                for (let day = 0; monthDays.value >= day; day++) {
                    const dayResult = day + 1;
                    const dateTime = new Date(selectedYear.value, selectedMonth.value, dayResult);
                    const obj = {
                        day: dayResult,
                        dateTime,
                        date: `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dayResult}`,
                    };
                    days.push(obj)
                }
                return days;
            });

            const firstDaysOfNextMonth = computed(() => {
                let days = [];
                for (let day = 1; day <= lastDays.value; day++) {
                    const month = selectedMonth.value + 1;
                    const dateTime = new Date(selectedYear.value, month , day);
                    const obj = {
                        day,
                        dateTime,
                        date: `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${day}`,
                    };
                    days.push(obj);
                }
                return days;
            });

            const previousMonth = function() {
                const prevMonth = date.value.getMonth() - 1;
                date.value = new Date(date.value.setMonth(prevMonth));
            };

            const nextMonth = function() {
                const nextMonth = date.value.getMonth() + 1;
                date.value = new Date(date.value.setMonth(nextMonth));
            };

            return {
                nextMonth,
                previousMonth,
                lastDay,
                prevLastDayOfPrevMonth,
                firstDayIndex,
                lastDayIndex,
                lastDays,
                selectedMonth,
                selectedYear,
                currentDate,
                monthDays,
                lastDaysOfPrevMonth,
                firstDaysOfNextMonth,
                currentMonthDays
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