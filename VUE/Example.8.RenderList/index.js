Vue.component('my-component', {
    template: '<p class="foo bar">Hi</p>'
});
var vm = new Vue({
    el: '#app',
    data: {
        parentMessage: 'Parent',
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ],
        object: {
            firstName: 'John',
            lastName: 'Doe',
            age: 30
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

