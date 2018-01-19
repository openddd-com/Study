var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello',
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar',
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    computed: {
        //计算属性是基于它们的依赖进行缓存的
        // 计算属性的 getter
        reversedMessageComputed: function () {
            // `this` 指向 vm 实例
            return this.message.split('').reverse().join('')//message是响应式依赖
        },
        nowComputed: function () {
            return Date.now() //Date.now() 不是响应式依赖
        },
        fullNameComputed: function () {
            return this.firstName + ' ' + this.lastName
        },
        fullNameGetSet: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    },
    // 在组件中
    methods: {
        reversedMessageMethods: function () {
            return this.message.split('').reverse().join('')
        },
        nowMethods: function () {
            return Date.now()
        },
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        // 请参考：https://lodash.com/docs#debounce
        getAnswer: _.debounce(
            function () {
                if (this.question.indexOf('?') === -1) {
                    this.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                this.answer = 'Thinking...'
                var vm = this
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // 这是我们为判定用户停止输入等待的毫秒数
            500
        )
    },
    //侦听属性。当你有一些数据需要随着其它数据变动而变动时
    watch: {
        //下面代码是命令式且重复的。将它与计算属性的版本fullNameComputed进行比较
        firstName: function (val) {
            this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val
        },
        //当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
        // 如果 `question` 发生改变，这个函数就会运行
        question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
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
    customfunc: function () {
        console.log('customfunc: ' + new date())
    }
});
console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'