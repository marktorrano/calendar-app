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
        return new Date(date.value.getFullYear(), date.value.getMonth(), 1).getDay();
    });

    const lastDayIndex = computed(() => {
        return new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDay();
    });

    const nextDays = computed(() => {
        const numOfDays = 32 - new Date(date.value.getFullYear(), date.value.getMonth(), 32).getDate();
        const additionalCells =  (firstDayIndex.value < lastDayIndex.value || numOfDays <= 29) ? 14 : 7;
        return additionalCells - lastDayIndex.value - 1
    });

    const lastDaysOfPrevMonth = computed(() => {
        let days = [];
        for (let day = firstDayIndex.value; day > 0; day--) {
            const dayResult = prevLastDayOfPrevMonth.value - day + 1;
            const dateTime = new Date(selectedYear.value, selectedMonth.value, 0);
            const obj = {
                day: dayResult,
                dateTime: dateTime,
                dateTimeString: dateTime.toDateString(),
                muted: true,
                date: `${selectedYear.value}-${selectedMonth.value}-${dayResult}`,
            };
            days.push(obj);
        }
        return days;
    });

    const currentMonthDays = computed(() => {
        let days = [];
        for (let day = 1; day <= lastDay.value; day++) {
            const dayResult = day;
            const dateTime = new Date(selectedYear.value, selectedMonth.value, dayResult);
            const obj = {
                day: dayResult,
                dateTime,
                dateTimeString: dateTime.toDateString(),
                muted: false,
                date: `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dayResult}`,
            };
            days.push(obj)
        }
        return days;
    });

    const firstDaysOfNextMonth = computed(() => {
        let days = [];
        for (let day = 1; day <= nextDays.value; day++) {
            const month = selectedMonth.value + 1;
            const dateTime = new Date(selectedYear.value, month , day);
            const obj = {
                day,
                dateTime,
                dateTimeString: dateTime.toDateString(),
                muted: true,
                date: `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${day}`,
            };
            days.push(obj);
        }
        return days;
    });

    const allCalendarDays = computed(() => {
        return lastDaysOfPrevMonth.value.concat(currentMonthDays.value, firstDaysOfNextMonth.value);
    });

    const previousMonth = function() {
        const prevMonth = date.value.getMonth() - 1;
        date.value = new Date(date.value.setMonth(prevMonth));
    };

    const nextMonth = function() {
        const nextMonth = date.value.getMonth() + 1;
        date.value = new Date(date.value.setMonth(nextMonth));
    };

    const goToCurrentMonth = function() {
        date.value = new Date();
    };

    return {
        nextMonth,
        previousMonth,
        lastDay,
        firstDayIndex,
        lastDayIndex,
        selectedMonth,
        selectedYear,
        currentDate,
        monthDays,
        lastDaysOfPrevMonth,
        goToCurrentMonth,
        allCalendarDays
    };
}