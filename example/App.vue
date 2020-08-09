<template>
    <section id="app">
        <div class="container">
            <h1 class="text-center my-4">Vue Table component</h1>
            <your-component :headers="headers" :url="url">
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
                    field: 'id',
                },
                {
                    description: 'Name',
                    field: 'name',
                },
                {
                    description: 'Last',
                    field: 'last',
                },
                {
                    description: 'Email',
                    field: 'email',
                },
            ],
            url: 'https://reqres.in/api/users?page=1'
        };
    },
  }
</script>

<style>
    @import'~bootstrap/dist/css/bootstrap.css';
</style>
