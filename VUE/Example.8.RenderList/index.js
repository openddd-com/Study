Vue.component('my-component', {
    template: '<p class="foo bar">{{ msg }}</p>'
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
/* 数组更新检测
push() 
pop()
shift()
unshift()
splice()
sort()
reverse()
*/
vm.items.push({ message: 'Baz' })
//直接替换
vm.items = vm.items.filter(function (item) { return item.message.match(/Foo/) })

//1.当你利用索引直接设置一个项时，
//不触发状态更新,例如：
var indexOfItem = 0, newValue = 1, newLength = 1;
vm.items[indexOfItem] = newValue;
// 触发状态更新,例如：
Vue.set(vm.items, indexOfItem, newValue);
vm.items.splice(indexOfItem, 1, newValue);
//2.当你修改数组的长度时，
//不触发状态更新，例如：
vm.items.length = newLength
//触发状态更新，例如：
vm.items.splice(newLength)

//对象更改检测注意事项
//1.Vue 不能检测对象属性的添加或删除
var vm1 = new Vue({
    data: {
        a: 1
    }
});
// `vm1.a` 现在是响应式的
vm1.b = 2
// `vm1.b` 不是响应式的

//对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。
//但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。
var vm2 = new Vue({
    data: {
        userProfile: {
            name: 'Anika'
        }
    }
});
Vue.set(vm2.userProfile, 'age', 27);
//或
vm2.$set(vm2.userProfile, 'age', 27);

//有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()
//想添加新的响应式属性,不要这样
Object.assign(vm2.userProfile, {
    age: 27,
    favoriteColor: 'Vue Green'
});
//应该这样做:
vm2.userProfile = Object.assign({}, vm2.userProfile, {
    age: 27,
    favoriteColor: 'Vue Green'
});

//显示过滤/排序结果
var vm_app1 = new Vue({
    el: '#app1',
    data: {
        numbers: [1, 2, 3, 4, 5],
        newTodoText: '',
        items: [{
            id: 1,
            msg: "taylor"
        }],
        todos: [{
            isComplete: false,
            value: 'value is false completed'
        }]
    },
    computed: {
        evenNumbers: function () {
            return this.numbers.filter(function (number) {
                return number % 2 === 0
            })
        }
    },
    methods: {
        even: function (numbers) {
            return numbers.filter(function (number) {
                return number % 2 === 0
            })
        }
    }
});
Vue.component('todo-item', {
    template: '\
      <li>\
        {{ title }}\
        <button v-on:click="$emit(\'remove\')">X</button>\
      </li>\
    ',
    props: ['title']
})
new Vue({
    el: '#todo-list-example',
    data: {
        newTodoText: '',
        todos: [
            {
                id: 1,
                title: 'Do the dishes',
            },
            {
                id: 2,
                title: 'Take out the trash',
            },
            {
                id: 3,
                title: 'Mow the lawn'
            }
        ],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    }
})