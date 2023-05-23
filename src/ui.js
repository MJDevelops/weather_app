import Dates from "./dates";

export default class UI {
    static constructNav() {}
    static conctructDateOverview() {
        const month = Dates.getMonthName();
        const abreviationMonth = month.substring(0, 2);
        const year = Dates.getYear();
        const day = Dates.getDayName();
    }
}