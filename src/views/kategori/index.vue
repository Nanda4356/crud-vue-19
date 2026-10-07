<script setup lang="ts">

//import ref dan onMounted dari Vue
import { ref, onMounted } from "vue";

//import service api
import Api from "../../api";

// Interface Kategori
interface Kategoris {
    id?: number;
    name: string;
}

// State kategori
const kategori = ref<Kategoris[]>([]);

// Fetch data kategori dari API
const fetchDataKategori = async () => {
    try {

        //fetch data kategori dari API
        const response = await Api.get("/api/kategori");

        //set data kategori
        kategori.value = response.data.data || response.data;

    } catch (error) {

        //log error
        console.error("Error fetching kategori:", error);
    }
};

//run hook "onMounted"
onMounted(() => {

    //call method "fetchDataPosts"
    fetchDataKategori();
});

// Handle delete kategori
const deleteKategori = async (id: number) => {
  try {

    //delete kategori berdasarkan id
    await Api.delete(`/api/kategori/${id}`);

    //call method "fetchDataPosts"
    fetchDataKategori();

  } catch (error) {

    //log error
    console.error("Error deleting kategori:", error);
  }
};
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link to="/kategori/create" class="btn btn-md btn-success rounded-5 shadow border-0 mb-3">
                    ADD NEW KATEGORI
                </router-link>
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col" style="width: 15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="kategori.length === 0">
                                    <td colspan="6" class="text-center">
                                        <div class="alert alert-danger mb-0">No data available</div>
                                    </td>
                                </tr>
                                <tr v-for="kategoris in kategori" :key="kategoris.id">
                                    <td>{{ kategoris.name }}</td>
                                    <td class="text-center">
                                        <router-link :to="`/kategori/edit/${kategoris.id}`"
                                            class="btn btn-sm btn-primary rounded-5 shadow border-0 me-2">
                                            EDIT
                                        </router-link>
                                        <button @click="deleteKategori(kategoris.id)"  class="btn btn-sm btn-danger rounded-5 shadow border-0">
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
