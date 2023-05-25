export default class DOMContent {
    static getCitySearch() {
        const search = document.querySelector('.form__field');
        return search.value;
    }
}