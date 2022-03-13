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
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#create-customer-modal"
        >
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
          <div class="col-12 mr-2 mb-2 col-md-3" v-for="customer in displayedCustomers">
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

  <!-- create customer modal -->
  <div
    class="modal"
    id="create-customer-modal"
    tabindex="-1"
    aria-label="create customer modal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create a customer</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form ref="createCustomerFormRef" @submit="onCreateCustomer">
            <div class="row mb-2">
              <div class="col-3">
                <div class="form-group">
                  <label for="customer-id">ID *</label>
                  <input
                    type="number"
                    class="form-control"
                    id="customer-id"
                    placeholder="Enter customer ID"
                    v-model="createCustomerForm.id"
                    required
                    min="1"
                  />
                  <span class="invalid-feedback">ID must be greater than 0</span>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="customer-email">Email *</label>
                  <input
                    type="email"
                    class="form-control"
                    id="customer-email"
                    placeholder="Enter customer email"
                    v-model="createCustomerForm.attributes.email"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="customer-first-name">First name</label>
              <input
                type="text"
                class="form-control"
                id="customer-first-name"
                placeholder="Enter customer first name"
                v-model="createCustomerForm.attributes.first_name"
              />
            </div>
            <div class="form-group">
              <label for="customer-last-name">Last name</label>
              <input
                type="text"
                class="form-control"
                id="customer-last-name"
                placeholder="Enter customer last name"
                v-model="createCustomerForm.attributes.last_name"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success" @click="onCreateCustomer">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import CustomerCard from '../components/CustomerCard.vue';
import Customer from '../models/Customer.model';
import CustomersService from '../services/customers.service';
import { useToast } from "vue-toastification";
import * as bootstrap from 'bootstrap'

type AllowedViews = 'card' | 'table';

const toast = useToast()
const currentView = ref<AllowedViews>('card');
const customers = ref<Customer[]>([])
const loading = ref(false);

function loadCustomers() {
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

const createCustomerFormRef = ref<HTMLFormElement>();
const createCustomerForm = ref({ id: 0, attributes: { email: '', first_name: '', last_name: '' } })

function onCreateCustomer() {
  if (!isCreateCustomerFormValid()) {
    return;
  }

  const newCustomer: Customer = {
    id: createCustomerForm.value.id,
    attributes: createCustomerForm.value.attributes,
    events: {}
  }
  CustomersService.createCustomer(newCustomer)
    .then(() => {
      toast.success('Customer created successfully')
      createCustomerForm.value = { id: 0, attributes: { email: '', first_name: '', last_name: '' } }
      loadCustomers();
      hideBreateCustomerModal()
    })
    .catch((err) => {
      toast.error(`Failed to create customer.\n${err.message}`)
    })
    .finally(() => {
      createCustomerFormRef.value?.classList.remove('was-validated');
    })
}

function isCreateCustomerFormValid() {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  createCustomerFormRef.value?.classList.add('was-validated');

  if (createCustomerForm.value.id <= 0) {
    return false;
  }
  if (
    !createCustomerForm.value.attributes.email
      .toLowerCase()
      .match(emailPattern)
  ) {
    return false;
  }
  return true;
}

function hideBreateCustomerModal() {
  const createCustomerModalEl = document.getElementById('create-customer-modal')
  if (createCustomerModalEl) {
    bootstrap.Modal.getInstance(createCustomerModalEl)?.hide()
  }
  // needed due to bug in bootstrap
  document.getElementsByClassName('modal-backdrop')?.[0].remove()
  const bodyEl = document.getElementsByTagName('body')[0]
  if (bodyEl) {
    bodyEl.classList.remove('modal-open')
    bodyEl.style.paddingRight = '0px'
    bodyEl.style.overflow = 'auto'
  }
}

onBeforeMount(() => {
  loadCustomers();
});

</script>

<style scoped lang="scss">
.loader {
  margin-top: 4rem;
  font-size: xx-large;
}
</style>
