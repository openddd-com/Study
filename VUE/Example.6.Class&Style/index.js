Vue.component('my-component', {
    template: '<p class="foo bar">Hi</p>'
});
var vm = new Vue({
    el: '#app',
    data: {
        isActive: true,
        hasError: false,
        classObject: {
            active: true,
            'text-danger': false
        },
        error: {
            type: 'fatal'
        },
        activeClass: 'active',
        errorClass: 'text-danger',

        activeColor: 'red',
        fontSize: 30,
        styleObject: {
            color: 'red',
            fontSize: '30px'
        },
        baseStyles: {
            color: 'red',
            fontSize: '30px'
        },
        overridingStyles: {
            color: 'blue',
            fontSize: '14px'
        }
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

