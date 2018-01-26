var example1 = new Vue({
    el: '#example-1',
    data: {
        message: 'hello world!',
        checked: true
    }
});
new Vue({
    el: '#example-2',
    data: {
        checkedNames: []
    }
});
new Vue({
    el: '#example-4',
    data: {
        picked: ''
    }
});
new Vue({
    el: '#example-5',
    data: {
        selected: 'A'
    }
});
new Vue({
    el: '#example-6',
    data: {
        selected: []
    }
});
new Vue({
    el: '#example-3',
    data: {
        selected: 'A',
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' }
        ]
    }
})

new Vue({
    el: '#example-8',
    data: {
        picked: 'A',
        toggle: 'A',
        pick:'A',
        a:'a',
        msg:'msg',
        age:31,
        selected: 'A',
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' }
        ]
    }
})