<template>
	<div class="grid-span-1">
		<label class="label-container-2">
			<span class="i-Search material-icons">search</span>
			<input v-bind="$attrs" type="search" placeholder="Filtrar" class="input" v-model="dom.filter"
				@keyup="filterTable" />
		</label>
	</div>
</template>

<script>
export default {
	name: 'FilterTable',
	components: {},
	props: {
		index_column: {
			type: Number,
			default: 0,
		},
		idTable: String,
		lengthTable: { Number, default: 0 },
	},
	data() {
		return {
			conteo: 0,
			dom: {
				filter: '',
			},
			interaction: {},
		};
	},
	mounted() { },
	created() { },
	methods: {
		filterTable() {
			this.conteo = this.filter(this.dom.filter);
			if (this.conteo === this.lengthTable) this.conteo = 0;
		},
		filter(value) {
			// realiza en filtro de una tabla
			let rows = document.querySelectorAll('#' + this.idTable + ' tr');
			let conteo = 0;
			for (var i = 0; i < rows.length; i++) {
				let showRow = false;
				let row = rows[i];
				row.style.display = 'none';
				if (this.index_column == 0) {
					for (var x = 0; x < row.childElementCount; x++) {
						if (row.children[x].textContent.toLowerCase().indexOf(value.toLowerCase().trim()) > -1) {
							showRow = true;
							break;
						}
					}
				} else {
					if (row.children[this.index_column - 1].textContent.toLowerCase().indexOf(value.toLowerCase().trim()) > -1) {
						showRow = true;
					}
				}

				if (showRow) {
					row.style.display = null;
					conteo++;
				}
			}
			return conteo;
		},
	},
	watch: {
		conteo: function () {
			this.$emit('conteo', this.conteo);
		},
	},
};
</script>