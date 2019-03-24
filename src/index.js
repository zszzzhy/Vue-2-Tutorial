import "./styles/style.scss";

/* eslint-disable no-new */
new Vue({
	name: "notebook",
	el: "#notebook",
	// 数据
	data() {
		return {
			content: localStorage.getItem("content") || "你可以写 **markdown** ",
			notes: [],
			// 选中笔记的 ID
			selectedId: null
		};
	},
	// 计算属性
	computed: {
		notePreview() {
			// Markdown 渲染为 HTML
			return this.selectedNote ? marked(this.selectedNote.content) : "";
		},
		addButtonTitle() {
			// 提示笔记数
			return notes.length + " note(s) already";
		},
		selectedNote() {
			// 返回与 selectedId 匹配的笔记
			return this.notes.find(note => note.id === this.selectedId);
		}
	},
	// 侦听器
	watch: {
		content: "saveNote",
		notes: "saveNotes"
	},
	// 通用函数
	methods: {
		// 用一些默认值添加一条笔记，并将其添加到笔记数组中
		addNote() {
			const time = Date.now();
			// 新笔记的默认值
			const note = {
				id: String(time),
				title: `New note ${this.notes.length + 1}`,
				content:
					"**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!",
				created: time,
				favorite: false
			};
			// 添加到列表中
			this.notes.push(note);
		},
		// 保存笔记
		saveNote(val, oldval) {
			console.log("新笔记：", val, "旧笔记：", oldval);
			console.log("保存笔记：", this.content);
			localStorage.setItem("content", this.content);
			this.reportOperation("保存");
		},
		// 报告操作
		reportOperation(opName) {
			console.log(opName, "操作完成了");
		},
		// 选择笔记
		selectNote(note) {
			this.selectedId = note.id;
		},
		saveNotes() {
			// 在存储之前不要忘记把对象转换为 JSON 字符串
			localStorage.setItem("notes", JSON.stringify(this.notes));
			console.log("Notes saved!", new Date());
		}
	}
	// 当实例准备就绪就会调用这个钩子
	// created() {
	//     this.content = localStorage.getItem('content') || '你可以写 **markdown** ';
	// }
});
