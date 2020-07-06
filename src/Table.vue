<template>
    <div>
        <div class="row">
            <div class="col-12">
                Registros a mostrar:
            </div>
            <div class="col-12 col-sm-12 col-md-4 mr-auto mb-4">
                <select class="form-control ml-md-1" v-model.number="perPage">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div class="col-12 col-sm-12 col-md-4 mb-4">
                <div class="input-group">
                    <input class="form-control" type="search" v-model="query" placeholder="Buscar" />
                    <div class="input-group-append">
                        <button class="input-group-text" id="btnGroupAddon">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table" id="categories">
                <thead>
                    <tr>
                        <th v-for="(header, index) in titles" :key="index" @click="setSort(header)">
                            {{ header.description }} <span v-if="header.selected">&ddarr;</span>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="this.records.length > 0">
                    <tr v-for="(record, index) in records" :key="index" :id="index">
                        <slot name="record" :record="record"></slot>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <th>Sin datos</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="row">
            <div class="mb-4 col-12 col-sm-12 col-md-6 col-lg-9 text-center text-sm-center text-md-left">
                Registros del {{ this.from }} al {{ this.to }} de un total de {{ this.total }}
            </div>
            <div class="mb-4 col-12 col-sm-12 col-md-3 col-lg-2">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a
                                class="page-link"
                                :class="[page == 1 ? 'disabled text-muted' : '']"
                                href="#"
                                aria-label="First"
                                @click="goToFirst"
                            >
                                <span aria-hidden="true">&lt;&lt;</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a
                                class="page-link"
                                :class="[page == 1 ? 'disabled text-muted' : '']"
                                href="#"
                                aria-label="Previous"
                                @click="goToPrev"
                            >
                                <span aria-hidden="true">&lt;</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a
                                class="page-link"
                                :class="[page == last ? 'disabled text-muted' : '']"
                                href="#"
                                aria-label="Next"
                                @click="goToNext"
                            >
                                <span aria-hidden="true">&gt;</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a
                                class="page-link"
                                :class="[page == last ? 'disabled text-muted' : '']"
                                href="#"
                                aria-label="Last"
                                @click="goToLast"
                            >
                                <span aria-hidden="true">&gt;&gt;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="mb-4 col-12 col-sm-12 col-md-3 col-lg-1">
                <div class="input-group">
                    <input
                        type="number"
                        step="1"
                        class="form-control"
                        :placeholder="'Ir a página'"
                        :value="page"
                        @change="setPage($event)"
                    />

                    <div class="input-group-append">
                        <button class="input-group-text">
                            {{ last }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import axios from 'axios'

    export default {
        mounted() {
            this.prepareTitles();
        },
        created() {
            this.loadData();
        },
        props: {
            headers: {
                type: Array,
                default: function () {
                    return []
                },
            },
            url: {
                type: String,
                default: function () {
                    return ''
                },
            },
        },
        data() {
            return {
                titles: this.headers,
                page: 1,
                last: 1,
                records: [],
                total: 0,
                state: {},
                perPage: 10,
                from: 0,
                to: 0,
                query: '',
                sort: '',
                direction: '',
            };
        },
        watch: {
            page() {
                this.loadData();
            },
            perPage() {
                if (this.page == 1) {
                    this.loadData();
                } else {
                    this.page = 1;
                }
            },
            query(current) {
                if (current.length == 0 || this.query.length == 0) {
                    this.resetState();
                } else {
                    if (current.length >= 3) {
                        if (!this.state.hasOwnProperty('records')) {
                            this.saveState();
                        }

                        this.page = 1;
                        this.sort = '';
                        this.loadData();
                    }
                }
            },
        },
        methods: {
            getLink() {
                return `${this.url}?page=${this.page}&per_page=${this.perPage}${this.getQuery()}${this.getSortBy()}`;
            },
            loadData() {
                axios.get(this.getLink())
                    .then((response) => {
                        this.last = response.data.last_page;
                        this.total = response.data.total;
                        this.from = response.data.from;
                        this.to = response.data.to;
                        this.records = response.data.data;
                    })
            },
            nextPage() {
                if (this.page < this.last) {
                    this.page++;
                }
            },
            saveState() {
                this.state.page = this.page;
                this.state.last = this.last;
                this.state.records = this.records;
                this.state.total = this.total;
                this.state.from = this.from;
                this.state.to = this.to;
                this.state.sort = this.sort;
            },
            resetState() {
                this.records = this.state.records;
                this.page = this.state.page;
                this.last = this.state.last;
                this.total = this.state.total;
                this.from = this.state.from;
                this.to = this.state.to;
                this.sort = this.state.sort;

                this.state = {};
            },
            goToFirst() {
                this.page = 1;
            },
            goToLast() {
                this.page = this.last;
            },
            goToNext() {
                if (this.page < this.last) {
                    this.page++;
                }
            },
            goToPrev() {
                if (this.page > 1) {
                    this.page--;
                }
            },
            setPage(event) {
                let number = parseInt(event.target.value);

                if (number < 1) {
                    this.page = 1;
                } else if (number > this.last) {
                    this.page = this.last;
                } else {
                    this.page = number;
                }
            },
            getQuery() {
                if (this.state.hasOwnProperty('records')) {
                    if (this.query.length) {
                        return `&query_by=${this.query}`;
                    }

                    return '';
                }

                return '';
            },
            getSortBy() {
                if (this.sort.length) {
                    return this.direction;
                }

                return '';
            },
            prepareTitles() {
                if (this.titles.length) {
                    // Add  the selected custom field
                    this.titles = this.titles.forEach((title) => {
                        this.$set(title, 'selected', false);
                    });
                }
            },
            setSort(header) {
                this.titles = this.titles.forEach((title) => {
                    title.selected = false;
                });

                header.selected = true;

                let direction = this.getDirection(header);

                if (this.sort == header.field) {
                    if (this.direction == direction.asc) {
                        this.direction = direction.desc;
                    } else if (this.direction == direction.desc) {
                        this.direction = direction.asc;
                    } else {
                        this.direction = direction.asc;
                    }
                } else {
                    this.sort = header.field;
                    this.direction = direction.asc;
                }

                this.loadData();
            },
            getDirection(header) {
                return {
                    desc: `&ordered_desc=${header.field}`,
                    asc: `&ordered_asc=${header.field}`,
                };
            },
        },
    };
</script>