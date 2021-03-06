new Vue({
    el: '#app',
    data: {
        now: new Date(),
        foo: 'bar'
    },
    //Init Events&Lifecycle,then

    beforeCreate: function () {
        console.log('beforeCreate: ' + this.now)
    },
    //Init injections&reactivity,then

    created: function () {
        console.log('created: ' + this.now)
    },
    //created: () => console.log('created: ' + this.now) //箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例 

    //if Has "el" Option||when vm.$mount(el) is called, then
    //If Has "template" option=>Compile template into render function
    //If Has not "template" option=>Compile el`s outerHTML as template
    //then
    beforeMount: function () {
        console.log('beforeMount: ' + this.now)
    },
    //Create vm.$el and replace "el" with it
    mounted: function () {
        console.log('mounted: ' + this.now)
    },
    //when data changes,
    beforeUpdate: function () {
        console.log('beforeUpdate: ' + this.now)
    },
    //Virtual DOM re-render and patch
    updated: function () {
        console.log('updated: ' + this.now)
    },
    //when vm.$destroy() is called
    beforeDestroy: function () {
        console.log('beforeDestroy: ' + this.now)
    },
    //Teardown watchers,child components and event listeners
    destroyed: function () {
        console.log('destroyed: ' + this.now)
    }
})