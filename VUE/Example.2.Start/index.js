var obj = {
    foo: 'bar'
}
Object.freeze(obj)
new Vue({
    el: '#app',
    data() {
        return {
            obj
        }
    }
})
new Vue({
    data: {
        a: 1
    },
    created: function () {
        // `this` 指向 vm 实例
        console.log('a is: ' + this.a)
    }
})