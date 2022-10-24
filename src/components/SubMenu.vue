<template>
	<div v-show="active" class="dropdown-setting sub-menu active" :id="_id" v-bind:style="styleActive">
		<ul>
			<li v-for="(item, index) in dataMenu" :key="index" @click="item.action" :[item.disabled]="liIsDisabled">
				<p>
					<i class="material-icons">{{ item.icon }}</i
					>{{ item.text }}
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
	name: 'SubMenu',
	components: {},
	props: {
		dataMenu: {
			type: Array,
			required: true,
		},
		key_container: {
			type: String,
			default: '1',
		},
	},
	data() {
		return {
			_id: 'id_' + uuidv4(),
			_id_table_container: '',
			active: true,
			liIsDisabled: false,
			styleActive: {
				top: '0px',
				left: '0px',
			},
			height_menu: 0,
			width_menu: 0,
		};
	},
	mounted() {
		this._id_table_container = document.querySelectorAll(`div[data-container-table-key="${this.key_container}t"]`)[0].id;

		let menu = document.getElementById(this._id);
		this.height_menu = menu.offsetHeight;
		this.width_menu = menu.offsetWidth;
		this.active = false;
		this.tableSubMenu();
	},
	created() {},
	methods: {
		tableSubMenu() {
			//muestra el sub-menu al hacer click derecho o touch en las filas de una tabla

			let container = document.getElementById(this._id_table_container);
			container.addEventListener('contextmenu', (e) => {
				console.log({e})
				e.preventDefault()
				if (e.target.localName == 'th') return false;
				if (e.target.localName == 'td') this.liIsDisabled = false;
				else this.liIsDisabled = true;

				let height_Window = window.innerHeight;
				let width_window = window.innerWidth;
				let pageY_top = e.pageY;
				let pageX_left = e.pageX;
				if (pageY_top + this.height_menu >= height_Window) {
					pageY_top = pageY_top - this.height_menu - 5;
				}
				if (pageX_left + this.width_menu >= width_window) {
					pageX_left = pageX_left - this.width_menu + 5;
				}
				this.styleActive.top = `${pageY_top + 5}px`;
				this.styleActive.left = `${pageX_left - 10}px`;

				this.active = true;
			});

			let body = document.querySelectorAll('body');
			body[0].addEventListener('click', () => {
				this.active = false;
			});
		},
	}
};
</script>