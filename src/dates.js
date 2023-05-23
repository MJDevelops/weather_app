import { getMonth, getDate, setMonth } from 'date-fns';

export default class Dates {
    static getMonthName() {
        return new Date().toLocaleString('en-US', { month: 'long' });
    }

    static getDayName() {
        return new Date().toLocaleString('en-US', { weekday: 'long'});
    }

    static getDayNumber() {
        return new Date().getDate(this.date).toString();
    }

    static getYear() {
        return new Date().getFullYear().toString();
    }
}