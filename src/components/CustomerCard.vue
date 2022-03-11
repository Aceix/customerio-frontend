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
    <br>
    <router-link :to="`/customers/${customer.id}`" class="btn btn-sm btn-primary mt-2">View details</router-link>
  </div>
</div>
</template>


<script setup lang="ts">
import { customerHasName, getCustomerName } from '../customer-utils';
import Customer from '../models/Customer.model';

const props = defineProps<{
  customer: Customer
}>()

function hasName() {
  return customerHasName(props.customer);
}

function getName() {
  return getCustomerName(props.customer);
}
</script>


<style scoped lang="scss">
</style>
