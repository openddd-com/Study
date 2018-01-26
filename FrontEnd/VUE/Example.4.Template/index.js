new Vue({
    el: '#app',
    data: {
        now: new Date(),
        foo: 'bar',
        rawHtml: "<span style='color:red'>This should be red</span>",//绝不要对用户提供的内容使用插值
        dynamicId:1,
        isButtonDisabled:false,
        seen:true,
        url:'index.html',
        doSomething:function(){
            console.log('doSomething: ' + new Date())
        },
        onSubmit:function(){
            console.log('onSubmit: ' + new Date())
        },
    },
    //Init Events&Lifecycle,then

    beforCreate: function () {
        console.log('beforCreate: ' + this.now)
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
    },
    //don`t know how to call?
    customfunc:function()
    {
        console.log('customfunc: ' +new date())
    }
})