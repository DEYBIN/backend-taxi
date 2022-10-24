<template>
	<div :id="wrapperId" class="simple-typeahead">
		<label class="label-container"
			>{{ texts }}
			<input
				:id="inputId"
				class="input"
				:class="['search']"
				type="text"
				:placeholder="placeholder"
				v-model="input"
				:disabled="is_disabled"
				@keyup="keyUpSearch"
				@focus="onFocus"
				@blur="onBlur"
				@keydown.down.prevent="onArrowDown"
				@keydown.up.prevent="onArrowUp"
				@keydown.enter.tab.prevent="selectCurrentSelection"
				autocomplete="off"
				v-bind="$attrs"
			/>
		</label>
		<div v-if="isListVisible" class="simple-typeahead-list">
			<div class="simple-typeahead-list-header" v-if="$slots['list-header']"><slot name="list-header"></slot></div>
			<div
				class="simple-typeahead-list-item"
				:class="{ 'simple-typeahead-list-item-active': currentSelectionIndex == index }"
				v-for="(item, index) in filteredItems"
				:key="index"
				@mousedown.prevent
				@click="selectItem(item)"
				@mouseenter="currentSelectionIndex = index"
			>
				<span
					class="simple-typeahead-list-item-text"
					:data-text="itemProjection(item)"
					v-html="boldMatchText(returnMach(item))"
				></span>
			</div>
			<div class="simple-typeahead-list-footer" v-if="$slots['list-footer']"><slot name="list-footer"></slot></div>
		</div>
	</div>
</template>

<script>
//import { API } from '../library/library';

export default {
	name: 'Search',
	emits: ['selectItem'],
	props: {
		id: {
			type: String,
		},
		url:{
			type: String,
			default: '',
			required: true
		},
		text: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		defaultItem: {
			default: null,
		},
		itemProjectionJson: {
			type: Object,
			default: { code: 'n_docu', detalle: 'l_deta' },
		},
		projectionJson: {
			type: Boolean,
			default: true,
		},
		itemProjection: {
			type: Function,
			default(item) {
				return item;
			},
		},
		minInputLength: {
			type: Number,
			default: 2,
			validator: (prop) => {
				return prop >= 0;
			},
		},
		on_focus_null: {
			type: Boolean,
			default: false,
		},
		blur_disabled: {
			type: Boolean,
			default: false,
		},
	},
	mounted() {
		if (this.defaultItem !== undefined && this.defaultItem !== null) {
			this.selectItem(this.defaultItem);
		}
	},
	data() {
		return {
			inputId: this.id || `simple_typeahead_${(Math.random() * 1000).toFixed()}`,
			texts: this.text,
			input: '',
			isInputFocused: false,
			currentSelectionIndex: 0,
			list:[],
			is_disabled: false,
		};
	},
	methods: {
		update() {},
		keyUpSearch(){
			if (this.input.length>4){
				if (this.list.length>0) return false
				API(this.url+encodeURI(this.input)).then((response) => {
					this.list = response.data;
				});
			}else{
				this.list = [];
			}
		},
	
		onFocus() {
			if (this.on_focus_null) {
				this.input = '';
				document.getElementById(this.inputId).value = '';
			}

			this.isInputFocused = true;
			
		},
		onBlur() {
			this.isInputFocused = false;
			if (this.blur_disabled==true) this.is_disabled=true;
		},
		onArrowDown($event) {
			if (this.isListVisible && this.currentSelectionIndex < this.filteredItems.length - 1) {
				this.currentSelectionIndex++;
			}
			this.scrollSelectionIntoView();
		},
		onArrowUp($event) {
			if (this.isListVisible && this.currentSelectionIndex > 0) {
				this.currentSelectionIndex--;
			}
			this.scrollSelectionIntoView();
		},
		scrollSelectionIntoView() {
			setTimeout(() => {
				const list_node = document.querySelector(`#${this.wrapperId} .simple-typeahead-list`);
				const active_node = document.querySelector(
					`#${this.wrapperId} .simple-typeahead-list-item.simple-typeahead-list-item-active`
				);
				if (
					!(
						active_node.offsetTop >= list_node.scrollTop &&
						active_node.offsetTop + active_node.offsetHeight < list_node.scrollTop + list_node.offsetHeight
					)
				) {
					let scroll_to = 0;
					if (active_node.offsetTop > list_node.scrollTop) {
						scroll_to = active_node.offsetTop + active_node.offsetHeight - list_node.offsetHeight;
					} else if (active_node.offsetTop < list_node.scrollTop) {
						scroll_to = active_node.offsetTop;
					}
					list_node.scrollTo(0, scroll_to);
				}
			});
		},
		selectCurrentSelection() {
			if (this.currentSelection) {
				this.selectItem(this.currentSelection);
			}
		},
		selectItem(item) {
			this.input = this.projectionJson ? item[this.itemProjectionJson.code] : this.itemProjection(item);
			this.currentSelectionIndex = 0;
			document.getElementById(this.inputId).blur();
			this.$emit('selectItem', item);
		},
		escapeRegExp(string) {
			return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		},
		boldMatchText(text) {
			const regexp = new RegExp(`(${this.escapeRegExp(this.input)})`, 'ig');
			return text.replace(regexp, '<strong>$1</strong>');
		},
		returnMach(item) {
			if (this.projectionJson) {
				return `${item[this.itemProjectionJson.code]}: ${item[this.itemProjectionJson.detalle]}`;
			} else {
				return this.itemProjection(item);
			}
		},
	},
	computed: {
		wrapperId() {
			return `${this.inputId}_wrapper`;
		},
		filteredItems() {
			const regexp = new RegExp(this.escapeRegExp(this.input), 'i');
			let items = [];
			if (this.projectionJson) {
				if (this.list<=0) return false
				items = this.list.filter((item) => {
					if (item[this.itemProjectionJson.code].match(regexp) || item[this.itemProjectionJson.detalle].match(regexp)) {
						return item;
					}
				});
			} else {
				if (this.list<=0) return false
				items = this.list.filter((item) => this.itemProjection(item).match(regexp));
			}

			return items;
		},
		isListVisible() {
			return this.isInputFocused && this.input.length >= this.minInputLength && this.filteredItems.length;
		},
		currentSelection() {
			return this.isListVisible && this.currentSelectionIndex < this.filteredItems.length
				? this.filteredItems[this.currentSelectionIndex]
				: undefined;
		},
	},
};
</script>
