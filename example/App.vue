<template>
    <section id="app">
        <div class="container">
            <h1 class="text-center my-4">Vue Table component</h1>
            <your-component
                :headers="headers"
                :url="url"
                :params="params">
                <template v-slot:record="{ record }">
                    <td>
                        <a href="#">
                            {{ record.id }}
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            {{ record.first_name }}
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            {{ record.last_name }}
                        </a>
                    </td>
                    <td>
                        {{ record.email }}
                    </td>
                </template>
            </your-component>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    {
                        description: 'Id',
                        sortable: 'id',
                    },
                    {
                        description: 'Name',
                        sortable: 'name',
                    },
                    {
                        description: 'Last',
                        sortable: 'last',
                    },
                    {
                        description: 'Email',
                        sortable: 'email',
                    },
                ],
                url: 'https://reqres.in/api/users?page=1',
                params: {
                    filter: 'value'
                },
                data: [
                    {
                        "id":1,
                        "email":"george.bluth@reqres.in",
                        "first_name":"George",
                        "last_name":"Bluth",
                        "avatar":"https://reqres.in/img/faces/1-image.jpg"
                    },
                    {
                        "id":2,
                        "email":"janet.weaver@reqres.in",
                        "first_name":"Janet",
                        "last_name":"Weaver",
                        "avatar":"https://reqres.in/img/faces/2-image.jpg"
                    },
                    {
                        "id":3,
                        "email":"emma.wong@reqres.in",
                        "first_name":"Emma",
                        "last_name":"Wong",
                        "avatar":"https://reqres.in/img/faces/3-image.jpg"
                    },
                    {
                        "id":4,
                        "email":"eve.holt@reqres.in",
                        "first_name":"Eve",
                        "last_name":"Holt",
                        "avatar":"https://reqres.in/img/faces/4-image.jpg"
                    },
                    {
                        "id":5,
                        "email":"charles.morris@reqres.in",
                        "first_name":"Charles",
                        "last_name":"Morris",
                        "avatar":"https://reqres.in/img/faces/5-image.jpg"
                    },
                    {
                        "id":6,
                        "email":"tracey.ramos@reqres.in",
                        "first_name":"Tracey",
                        "last_name":"Ramos",
                        "avatar":"https://reqres.in/img/faces/6-image.jpg"
                    },
                    {
                        "id":7,
                        "email":"michael.lawson@reqres.in",
                        "first_name":"Michael",
                        "last_name":"Lawson",
                        "avatar":"https://reqres.in/img/faces/7-image.jpg"
                    },
                    {
                        "id":8,
                        "email":"lindsay.ferguson@reqres.in",
                        "first_name":"Lindsay",
                        "last_name":"Ferguson",
                        "avatar":"https://reqres.in/img/faces/8-image.jpg"
                    },
                    {
                        "id":9,
                        "email":"tobias.funke@reqres.in",
                        "first_name":"Tobias",
                        "last_name":"Funke",
                        "avatar":"https://reqres.in/img/faces/9-image.jpg"
                    },
                    {
                        "id":10,
                        "email":"byron.fields@reqres.in",
                        "first_name":"Byron",
                        "last_name":"Fields",
                        "avatar":"https://reqres.in/img/faces/10-image.jpg"
                    },
                    {
                        "id":11,
                        "email":"george.edwards@reqres.in",
                        "first_name":"George",
                        "last_name":"Edwards",
                        "avatar":"https://reqres.in/img/faces/11-image.jpg"
                    },
                    {
                        "id":12,
                        "email":"rachel.howell@reqres.in",
                        "first_name":"Rachel",
                        "last_name":"Howell",
                        "avatar":"https://reqres.in/img/faces/12-image.jpg"
                    }
                ],
                objectData: {
                    "total": 50,
                    "per_page": 15,
                    "current_page": 1,
                    "last_page": 4,
                    "first_page_url": "http://laravel.app?page=1",
                    "last_page_url": "http://laravel.app?page=4",
                    "next_page_url": "http://laravel.app?page=2",
                    "prev_page_url": null,
                    "path": "http://laravel.app",
                    "from": 1,
                    "to": 15,
                    "data":[
                        {
                            "id":1,
                            "email":"george.bluth@reqres.in",
                            "first_name":"George",
                            "last_name":"Bluth",
                            "avatar":"https://reqres.in/img/faces/1-image.jpg"
                        },
                        {
                            "id":2,
                            "email":"janet.weaver@reqres.in",
                            "first_name":"Janet",
                            "last_name":"Weaver",
                            "avatar":"https://reqres.in/img/faces/2-image.jpg"
                        },
                    ]
                    }
            };
        },
    }
</script>

<style>
    @import'~bootstrap/dist/css/bootstrap.css';
</style>
