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
          <button type="button" class="btn btn-sm btn-outline-primary">
            <i class="bi bi-table"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-primary">
            <i class="bi bi-card-list"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-primary">
            <i class="bi bi-square"></i>
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

    <div class="row">
      <div class="col">

        <div class="card" style="width: 18rem;">
          <template v-if="attributes.get('img')">
            <img :src="attributes.get('img')" class="card-img-top" alt="profile picture" />
          </template>
          <div class="card-body">
            <h5 class="card-title">{{ getTitle() }}</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <button class="btn btn-sm btn-primary">View details</button>
          </div>
        </div>

        <div class="card" style="width: 18rem;">
          <template v-if="attributes.get('img')">
            <img :src="attributes.get('img')" class="card-img-top" alt="profile picture" />
          </template>
          <div class="card-body">
            <h5 class="card-title">{{ getTitle() }}</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <button class="btn btn-sm btn-primary">View details</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const attributes = ref<Map<string, string>>(new Map())

function loadCustomer() {
  attributes.value = new Map([
    ['img', 'https://via.placeholder.com/150'],
    ['name', 'John Doe'],
    ['email', ''],
  ])
}

function getTitle() {
  return attributes.value.get('name') || 'Customer';
}

onMounted(() => {
  loadCustomer();
});

</script>
