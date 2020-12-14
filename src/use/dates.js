import { ref, computed } from "vue";

export default function useEventSpace() {
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
}