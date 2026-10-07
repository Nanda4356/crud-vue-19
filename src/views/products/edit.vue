<script setup lang="ts">

//import ref dan onMounted dari vue
import { ref, onMounted } from "vue";

//import useRoute dan useRouter dari vue-router
import { useRoute, useRouter } from "vue-router";

//import Api dari folder api
import Api from "../../api";

interface Category {
    id: number;
    name: string;
}

const categories = ref<Category[]>([]);

// Interface Errors
interface Errors {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    kategori_id?: string[];
}

// State untuk form
const name = ref("");
const description = ref("");
const price = ref("");
const stock = ref("");
const kategori_id = ref("");

const fetchCategories = async () => {
    try {
        const response = await Api.get("/api/kategori");

        // Sesuaikan jika respon laravel kamu pakai response.data.data
        categories.value = response.data.data || response.data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
};

onMounted(() => {
    fetchCategories();
});

// State errors
const errors = ref<Errors>({});

//initiate route and router
const route = useRoute();
const router = useRouter();

// Fetch product details
const fetchDetailProduct = async () => {
    try {

        //fetch data product berdasarkan id
        const response = await Api.get(`/api/products/${route.params.id}`);

        //set data ke state
        name.value = response.data.data.name;
        description.value = response.data.data.description;
        price.value = response.data.data.price;
        stock.value = response.data.data.stock;
        kategori_id.value = response.data.data.kategori_id;

    } catch (error) {

        //log error
        console.error("Error fetching product:", error);
    }
};

//run hook "onMounted"
onMounted(() => {

    //call method "fetchDetailProduct"
    fetchDetailProduct();
});

// Handle form submission
const updateProduct = async () => {

    //initiate form data
    const formData = new FormData();

    //append data to form data
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("stock", stock.value);
    formData.append("kategori_id", kategori_id.value);
    formData.append("_method", "PUT");

    try {

        //send data to api
        await Api.post(`/api/products/${route.params.id}`, formData);

        //redirect to products page
        router.push("/products");

    } catch (error: any) {

        //set error to state
        if (error.response && error.response.data.errors) {
            errors.value = error.response.data.errors;
        }
    }
};
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <form @submit.prevent="updateProduct">
                            <div class="mb-3">
                                <label class="form-label fw-bold">name</label>
                                <input type="text" v-model="name" class="form-control" placeholder="name Product" />
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    {{ errors.name[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Description</label>
                                <textarea v-model="description" class="form-control" rows="5"
                                    placeholder="Description Product"></textarea>
                                <div v-if="errors.description" class="alert alert-danger mt-2">
                                    {{ errors.description[0] }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Price</label>
                                        <input type="number" v-model="price" class="form-control"
                                            placeholder="Price Product" />
                                        <div v-if="errors.price" class="alert alert-danger mt-2">
                                            {{ errors.price[0] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Stock</label>
                                        <input type="number" v-model="stock" class="form-control"
                                            placeholder="Stock Product" />
                                        <div v-if="errors.stock" class="alert alert-danger mt-2">
                                            {{ errors.stock[0] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Category</label>
                                <select v-model="kategori_id" class=" form-control">
                                    <option value="">-- Select Category --</option>
                                    <!-- Disamakan menggunakan variabel 'category' -->
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>

                                <div v-if="errors.kategori_id" class="alert alert-danger mt-2">
                                    {{ errors.kategori_id[0] }}
                                </div>
                            </div>
                            <button type="submit"
                                class="btn btn-md btn-primary rounded-5 shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
