<template>
  <div class="container py-5">
    <div class="row">
      <div class="col">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search customers by customer email address..."
            aria-label="Search customers by customer email address"
            aria-describedby="customers-search-btn"
          />
          <button class="btn btn-outline-primary" type="button" id="customers-search-btn">Search</button>
        </div>
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

    <div v-if="currentView === 'card'" class="row mt-2">
      <div class="col-6 mr-2 mb-2 col-md-3" v-for="customer in customers">
        <CustomerCard :customer="customer" />
      </div>
    </div>
    <div v-else-if="currentView === 'table'" class="row mt-2">
      table view
    </div>

  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import CustomerCard from '../components/CustomerCard.vue';
import Customer from '../models/Customer.model';
import CustomersService from '../services/customers.service';
import { useToast } from "vue-toastification";

type AllowedViews = 'card' | 'table';

const toast = useToast()
const currentView = ref<AllowedViews>('card');
const customers = ref<Customer[]>([])


function loadCustomer() {
  // customers.value = [
  //   { id: 'a123', attributes: new Map([['first_name', 'Ama'], ['last_name', 'Governor'], ['email', 'ama.governor@example.com']]) },
  //   { id: 'a123', attributes: new Map([['email', 'ama.governor2@example.com']]) },
  //   { id: 'a123', attributes: new Map([['email', 'ama.governor2@example.com']]) },
  //   { id: 'a123', attributes: new Map([['email', 'ama.governor2@example.com']]) },
  //   { id: 'a123', attributes: new Map([['email', 'ama.governor2@example.com']]) },
  //   { id: 'a123', attributes: new Map([['email', 'ama.governor2@example.com']]) },
  // ]
  CustomersService.getCustomers()
    .then(res => {
      customers.value = res.data.customers
    })
    .catch((err) => {
      toast.error(`Failed to load customers \n${err}`)
    })
}

onBeforeMount(() => {
  loadCustomer();
});

</script>
