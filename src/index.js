import "./styles/style.scss";

Vue.filter("date", time => moment(time).format("DD/MM/YY, HH:mm"));

/* eslint-disable no-new */
new Vue({
	name: "notebook",
	el: "#notebook",
	// 数据
	data() {
		return {
			notes: JSON.parse(localStorage.getItem("notes")) || [],
			// 选中笔记的 ID
			selectedId: localStorage.getItem("selected-id") || null
		};
	},
	// 计算属性
	computed: {
		selectedNote() {
			// 返回与 selectedId 匹配的笔记
			return this.notes.find(note => note.id === this.selectedId);
		},
		notePreview() {
			// Markdown 渲染为 HTML
			return this.selectedNote ? marked(this.selectedNote.content) : "";
		},
		sortedNotes() {
			// 排序笔记
			return this.notes
				.slice()
				.sort((a, b) => a.created - b.created)
				.sort((a, b) => {
					return a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1;
				});
		},
		linesCount() {
			// 计算行数
			if (this.selectedNote) {
				// 计算换行符的个数
				return this.selectedNote.content.split(/\r\n|\r|\n/).length;
			}
		},
		wordsCount() {
			// 计算单词数
			if (this.selectedNote) {
				let s = this.selectedNote.content;
				// 将换行符转换为空格
				s = s.replace(/\n/g, " ");
				// 排除开头和结尾的空格
				s = s.replace(/(^\s*)|(\s*$)/gi, "");
				// 将多个重复空格转换为一个
				s = s.replace(/\s\s+/gi, " ");
				// 返回空格数量
				return s.split(" ").length;
			}
		},
		charactersCount() {
			// 计算字符数
			if (this.selectedNote) {
				return this.selectedNote.content.split("").length;
			}
		}
	},
	// 侦听器
	watch: {
		notes: {
			// 方法名
			handler: "saveNotes",
			// 需要使用这个选项来侦听数组中每个笔记属性的变化
			deep: true
		},
		selectedId(val, oldVal) {
			localStorage.setItem("selected-id", val);
		}
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
				content: "**你好！** 这条笔记是使用 [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) 编写！",
				created: time,
				favorite: false
			};
			// 添加到列表中
			this.notes.push(note);
			// 选中新建笔记
			this.selectNote(note);
		},
		// 移除笔记
		removeNote() {
			if (this.selectedNote && confirm("是否删除笔记？")) {
				// 将选中的笔记从笔记列表中移除
				const index = this.notes.indexOf(this.selectedNote);
				if (index !== -1) {
					this.notes.splice(index, 1);
				}
			}
		},
		// 选择笔记
		selectNote(note) {
			this.selectedId = note.id;
		},
		// 保存笔记
		saveNotes() {
			// 在存储之前不要忘记把对象转换为 JSON 字符串
			localStorage.setItem("notes", JSON.stringify(this.notes));
			console.log("Notes saved!", new Date());
		},
		// 收藏笔记
		favoriteNote() {
			this.selectedNote.favorite ^= true;
		}
	}
});
