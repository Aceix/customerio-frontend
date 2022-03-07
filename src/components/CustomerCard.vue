<template>
<div class="CustomerCard card">
  <template v-if="customer.attributes.img">
    <img :src="customer.attributes.img" class="card-img-top" alt="profile picture" />
  </template>
  <div class="card-body">
    <template v-if="hasName()">
      <h5 class="mb-0">{{ getName() }}</h5>
      <small>{{ customer.attributes.email }}</small>
    </template>
    <h5 v-else class="card-title">{{ customer.attributes.email }}</h5>
    
    <button class="btn btn-sm btn-primary mt-2">View details</button>
  </div>
</div>
</template>


<script setup lang="ts">
import Customer from '../models/Customer.model';

const props = defineProps<{
  customer: Customer
}>()

function hasName() {
  return props.customer.attributes.first_name || props.customer.attributes.last_name
}

function getName() {
  const customerAttributes = props.customer.attributes;
  return `${customerAttributes.first_name ?? ''} ${customerAttributes.last_name ?? ''}`
}
</script>


<style scoped lang="scss">
</style>
