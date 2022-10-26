<template>
	<div v-if="filter" class="grid-auto" grid-block="50">
		
			<div class="grid-auto">
				<label class="label-container-2 grid-span-1"><span class="material-icons"> filter_list </span>Total:
					<div>{{dataReq.length }}</div>
				</label>
				
				<label class="label-container-2 grid-span-1">Filtrar por: 
					<select class="select" v-model="interaction.index_column">
						<option v-for="(item, index) in dataRequired.dataHeader" :key="index" :value="index">
							{{ item }}
						</option>
					</select>
				</label>

				<label class="label-container-2 grid-span-1"><span class="material-icons"> filter_alt </span>Total filtrados:
					<div>{{ interaction.lengthFilter }}</div>
				</label>

				<FilterTable :idTable="this._id" :lengthTable="dataReq.length" @conteo="handleConteo"
			:index_column="interaction.index_column" />
		</div>
		
	</div>

	<div class="container-table" :data-container-table-key="data_container_table_key + 't'" :id="_id_container"
		:style="interaction.styleHeight" @click="_click">
		<h4 class="title" v-if="titles != ''">
			{{ titles }}
		</h4>
		<table class="table">
			<thead :id="_id_table_head">
				<slot name="header"></slot>
				<tr>
					<th v-if="contador && filter">N°</th>
					<th v-else-if="contador">Total #{{ dataReq.length }}</th>
					<slot name="th"></slot>
				</tr>
			</thead>
			<tbody @mousedown="tableMouseDown" @dblclick="tableDblClick" :id="_id" v-bind="$attrs">
				<slot name="body"></slot>

				<tr v-for="(item, index) in dataReq" :key="index">
					<td v-if="contador" class="text-center">#{{ index + 1 }}</td>
					<slot name="td" v-bind:item="item"></slot>
				</tr>
			</tbody>
			<tfoot>
				<slot name="foot"></slot>
			</tfoot>
		</table>
	</div>
</template>
<script>
import FilterTable from './FilterTable.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
	name: 'Table',
	components: { FilterTable },
	emits: ['dataResp', 'update:modelValue'],
	props: {
		reading: {
			type: Boolean,
			default: false,
		},
		titles: { type: String, default: '' },
		contador: { type: Boolean, default: false },
		filter: { type: Boolean, default: true },
		data_container_table_key: { String, default: '1' },
		height: { Number, default: 400 },
		width: { Number, default: "auto" },
		dataReq: {
			Array,
			default: [],
			lengthFilter: 0,
		},
		modelValue: { type: Object, default: {} },
		_click: { type: Function, default: () => { } },
		activeDblClick: { type: Boolean, default: false },
		selected: { type: Boolean, default: false },
	},
	data() {
		return {
			length_header: 1,
			_id: 'id_' + uuidv4(),
			_id_container: 'id_' + uuidv4(),
			_id_table_head: 'id_' + uuidv4(),
			indexRow: 0,
			dataResp: 0,
			dom: {},
			interaction: {
				lengthTable: 0,
				lengthFilter: 0,
				styleHeight: {},
				index_column: 0,
			},
			dataRequired: {
				dataTable: [],
				dataHeader: [],
			},
		};
	},

	mounted() {
		this.length_header = document.querySelectorAll('#' + this._id_table_head + ' tr').length;

		this.interaction.styleHeight = {
			height: this.height + 'px', width: this.width + 'px',
		};
		if (this.reading) {
			this.tableMouseDown = () => { };
		}

		if (this.filter) {
			let th = document.querySelectorAll('#' + this._id_table_head + ' th');
			this.dataRequired.dataHeader.push('TODOS');
			th.forEach((element) => {
				this.dataRequired.dataHeader.push(element.innerText);
			});
		}
	},
	created() { },
	methods: {
		tableMouseDown(e) {
			if (!this.activeDblClick) {
				let rowSelected = document.querySelectorAll(`#${this._id} tr.selected`);
				if (rowSelected.length > 0) {
					rowSelected.forEach((i) => {
						i.classList.remove('selected');
					});
				}

				let tr = e.target.parentNode;
				if (tr.tagName != 'TR') {
					tr = tr.parentNode;
					if (tr.tagName != 'TR') {
						tr = tr.parentNode;
						if (tr.tagName != 'TR') {
							tr = tr.parentNode;
						}
					}
				}

				tr.classList.add('selected');
				this.dataResp = this.dataReq[tr.rowIndex - this.length_header];
				this.$emit('dataResp', this.dataResp);
				this.$emit('update:modelValue', this.dataResp);
			}
		},
		tableDblClick(e) {
			if (this.activeDblClick) {
				let rowSelected = document.querySelectorAll(`#${this._id} tr.selected`);
				if (rowSelected.length > 0) {
					rowSelected.forEach((i) => {
						i.classList.remove('selected');
					});
				}

				let tr = e.target.parentNode;

				if (tr.tagName != 'TR') {
					tr = tr.parentNode;
					if (tr.tagName != 'TR') {
						tr = tr.parentNode;
						if (tr.tagName != 'TR') {
							tr = tr.parentNode;
						}
					}
				}

				tr.classList.add('selected');
				this.dataResp = this.dataReq[tr.rowIndex - this.length_header];

				this.$emit('dataResp', this.dataResp);
				this.$emit('update:modelValue', this.dataResp);
			}
		},
		handleConteo(value) {
			this.interaction.lengthFilter = value;
		},
	},
	watch: {
		dataReq: function () {
			if (this.selected) {
				if (this.dataReq.length > 0) {
					setTimeout(() => {
						let tr = document.querySelector(`#${this._id} tr`);
						tr.classList.add('selected');
						this.dataResp = this.dataReq[0];
						this.$emit('dataResp', this.dataResp);
					}, 30);
				}
			}
		},
	},
	unmounted() { },
};
</script>