<template>
	<div class="container-tabs">
		<div class="group-tabs">
			<ul class="tabs" :id="_id">
				<li class="tab" @click="selectTab(index)" v-for="(item, index) in dataMenu" :key="index"
					:class="[tab_active == index ? 'active' : '']">
					<i class="material-icons">{{ item.icon }}</i>
					{{ item.name }}
				</li>
				<li class="slider" :style="interaction.style_slider"></li>
			</ul>
		</div>
		<div class="group-panels">
			<div class="panel" v-for="(_, index) in dataMenu" :key="index"
				:class="[tab_active == index ? 'active' : '']">
				<slot :name="'panel-' + (index + 1)"> </slot>
			</div>
		</div>
	</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
// function sliderTabs(inputId) {
// 	let tabone = document.querySelectorAll('#' + inputId + ' .tab');
// 	let sliderone = document.querySelectorAll('#' + inputId + ' .slider');
// 	sliderone[0].style.width = tabone[0].offsetWidth + 'px';
// 	// document.getElementById(inputId).addEventListener('click', function (e) {
// 	// 	if (e.target.className != 'tab') return false;
// 	// 	let width = parseFloat(e.target.offsetWidth);
// 	// 	let tagInnertText = e.target.innerText;
// 	// 	let node = Array.prototype.slice.apply(this.children);
// 	// 	let sliding = 0;
// 	// 	let nex = 0;
// 	// 	node.map((i, key) => {
// 	// 		if (i.innerText == tagInnertText) nex++;
// 	// 		if (nex == 0) sliding += (parseFloat(node[key].offsetWidth));
// 	// 	});
// 	// 	let slider = document.querySelectorAll('#'+inputId+' .slider');
// 	// 	slider[0].style.left = sliding + 'px';
// 	// 	slider[0].style.width = width + 'px';
// 	// });
// }

export default {
	name: 'TabsPanels',
	components: {},
	props: {
		dataMenu: {
			type: Array,
			required: true,
		},
		titulo: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			_id: 'id_' + uuidv4(),
			tab_active: 0,
			active: true,
			interaction: {
				style_slider: {
					width: '0px',
					left: '0px',
				},
				tabs: [],
			},
		};
	},
	mounted() {
		this.active = false;
		this.initStyle()
	},
	created() { },
	methods: {
		selectTab(index) {
			//muestra el sub-menu al hacer click derecho o touch en las filas de una tabla
			this.tab_active = index;
			this.interaction.tabs[index];
			let width = parseFloat(this.interaction.tabs[index].offsetWidth);
			let sliding = 0;
			let nex = 0;
			this.interaction.tabs.forEach((i, key) => {
				if (key == index) nex++;
				if (nex == 0) sliding += parseFloat(this.interaction.tabs[key].offsetWidth);
			});
			this.interaction.style_slider = {
				width: width + 'px',
				left: sliding + 'px',
			};
		},
		initStyle() {
			this.interaction.tabs = document.querySelectorAll('#' + this._id + ' .tab');
			this.interaction.style_slider = {
				width: this.interaction.tabs[0].offsetWidth + 'px',
				left: '0px',
			};


		},
	},
	watch: {},
};
</script>