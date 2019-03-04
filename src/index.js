import './style/main.scss';

new Vue({
    name: 'notebook',

    el: '#notebook',
    // 数据
    data() {
        return {
            content: localStorage.getItem('content') || '你可以写 **markdown** ',
        }
    },
    // 计算属性
    computed: {
        notePreview() {
            // Markdown 渲染为 HTML
            return marked(this.content);
        },
    },
    // 侦听器
    watch: {
        content: 'saveNote',
    },
    // 通用函数
    methods: {
        // 保存笔记
        saveNote(val, oldval) {
            console.log('新笔记：', val, '旧笔记：', oldval);
            console.log('保存笔记：', this.content);
            localStorage.setItem('content', this.content);
            this.reportOperation('保存');
        },
        // 报告操作
        reportOperation(opName) {
            console.log(opName, '操作完成了');
        },
    },
    // 当实例准备就绪就会调用这个钩子
    // created() {
    //     this.content = localStorage.getItem('content') || '你可以写 **markdown** ';
    // }
});

