<template>
  <div class="container py-5">
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Search customers by customer email address..."
          aria-label="Search customers by customer email address"
          v-model="searchText"
        />
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-6">
        View
        <div class="btn-group" role="group" aria-label="Toggle customers view">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary"
            :class="{ 'active': currentView === 'card' }"
            @click="currentView = 'card'"
          >
            <i class="bi bi-card-list"></i>
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-primary"
            :class="{ 'active': currentView === 'table' }"
            @click="currentView = 'table'"
          >
            <i class="bi bi-table"></i>
          </button>
        </div>
      </div>
      <div class="col-6 text-end">
        <button class="btn btn-primary">
          <i class="bi bi-plus"></i>
          Add Customer
        </button>
      </div>
    </div>

    <template v-if="currentView === 'card'">
      <div v-if="loading" class="row loader">
        <div class="col d-flex flex-column justify-content-center align-items-center">
          <i class="bi bi-arrow-clockwise"></i>
          <span>Loading customers...</span>
        </div>
      </div>
      <template v-else>
        <div class="row mt-2">
          <div class="col-6 mr-2 mb-2 col-md-3" v-for="customer in displayedCustomers">
            <CustomerCard :customer="customer" />
          </div>
        </div>
        <div v-if="displayedCustomers.length" class="row mt-2">
          <div class="col text-end">
            <button
              class="btn btn-sm btn-outline-primary me-2"
              :disabled="pagination.page <= 1"
              @click="pagination.page--"
            >&lt; Prev</button>
            <button
              class="btn btn-sm btn-outline-primary"
              :disabled="pagination.page >= pagination.total"
              @click="pagination.page++"
            >Next &gt;</button>
          </div>
        </div>
      </template>
    </template>
    <template v-else-if="currentView === 'table'">
      <div class="row mt-2">table view</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import CustomerCard from '../components/CustomerCard.vue';
import Customer from '../models/Customer.model';
import CustomersService from '../services/customers.service';
import { useToast } from "vue-toastification";

type AllowedViews = 'card' | 'table';

const toast = useToast()
const currentView = ref<AllowedViews>('card');
const customers = ref<Customer[]>([])
const loading = ref(false);

function loadCustomer() {
  loading.value = true;
  CustomersService.getCustomers()
    .then(res => {
      customers.value = res.data.customers
    })
    .catch((err) => {
      toast.error(`Failed to load customers \n${err}`)
    })
    .finally(() => {
      loading.value = false;
    })
}

const searchText = ref('');
const pagination = reactive({
  page: 1,
  perPage: 30,
  total: 0,
});

watch(customers, () => {
  pagination.total = Math.ceil(customers.value.length / pagination.perPage);
})

watch(searchText, () => {
  pagination.page = 1;
})

const displayedCustomers = computed(() => {
  return customers.value
    .filter(customer => customer.attributes.email.toLowerCase().includes(searchText.value.toLowerCase()))
    .slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage);
})

onBeforeMount(() => {
  loadCustomer();
});

</script>

<style scoped lang="scss">
.loader {
  margin-top: 4rem;
  font-size: xx-large;
}
</style>
