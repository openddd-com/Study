Vue.component('my-component', {
    template: '<p class="foo bar">Hi</p>'
});
var vm = new Vue({
    el: '#app',
    data: {
        ok: true,
        loginType:'email'
    },
    computed: {
        classObjectComputed: function () {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal'
            }
        }
    }
});

