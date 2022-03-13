<template>
  <div class="Customer container mb-4">
    <div class="row">
      <!-- profile pane -->
      <div class="col-12 col-md-4">
        <div class="row">
          <div class="col text-center">
            <img :src="customerProfileImg" alt="profile picture" class="img-rounded profile-img" />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-12">
            <h5>
              {{ customerTitle }}
              <template v-if="isDeleting">
                <span class="float-end">
                  <button
                    class="btn btn-sm btn-outline-danger me-2"
                    title="Cancel delete"
                    @click="isDeleting = false"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-outline-success"
                    title="Confirm delete"
                    @click="onDeleteCustomer()"
                  >
                    <i class="bi bi-check"></i>
                  </button>
                </span>
              </template>
              <button
                v-else
                class="btn btn-sm btn-outline-danger float-end"
                title="Delete customer"
                @click="isDeleting = true"
              >
                <i class="bi bi-trash"></i>
              </button>
            </h5>
          </div>
          <div class="col-12">
            <p>Joined on {{ customerJoinDate }}</p>
          </div>
          <div class="col-12">
            <h5>Event summary</h5>
            <apexchart type="donut" :options="eventsChartOptions" :series="eventsChartData"></apexchart>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12 d-flex justify-content-between">
            <h5>Attributes</h5>
            <div class="span">
              <template v-if="isEditingAttributes">
                <button
                  class="btn btn-sm btn-outline-danger me-2"
                  title="Cancel edit"
                  @click="isEditingAttributes = false"
                >
                  <i class="bi bi-x"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-success"
                  title="Confirm edit"
                  @click="onEditAttribute()"
                >
                  <i class="bi bi-check"></i>
                </button>
              </template>
              <button
                v-else
                class="btn btn-sm btn-outline-primary"
                @click="onEditAttributesBtnClick()"
              >
                <i class="bi bi-pencil"></i> Edit
              </button>
            </div>
          </div>
          <div id="attributes-box" class="col-12">
            <div
              v-for="(attributeName, i) in Object.keys(customer?.attributes ?? {})"
              :key="attributeName"
              class="row"
              :class="{ 'bg-light': i % 2 !== 0 }"
            >
              <div class="col">{{ attributeName }}</div>
              <div class="col">
                <input
                  v-if="isEditingAttributes"
                  type="text"
                  class="form-control form-control-sm"
                  aria-label="attribute value"
                  :disabled="immutableAttributes.includes(attributeName)"
                  v-model="customerAttributesEditForm[attributeName]"
                />
                <span v-else>{{ customer?.attributes[attributeName] }}</span>
              </div>
            </div>
          </div>
          <template v-if="!isEditingAttributes">
            <div v-if="isAddingAttribute" class="col-12">
              <form ref="addAttributeForm" @submit="onAddAttribute">
                <div class="row">
                  <div class="col-6">
                    <small>
                      <label for="attribute-name">Name</label>
                    </small>
                    <br />
                    <input
                      type="text"
                      id="attribute-name"
                      class="form-control"
                      placeholder="Attribute name"
                      v-model="customerAttributesAddForm.name"
                      required
                    />
                  </div>
                  <div class="col-6">
                    <small>
                      <label for="attribute-name">Value</label>
                    </small>
                    <br />
                    <input
                      type="text"
                      id="attribute-name"
                      class="form-control"
                      placeholder="Attribute value"
                      v-model="customerAttributesAddForm.value"
                      required
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col text-end">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger me-2"
                      title="Cancel"
                      @click="isAddingAttribute = false"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-success"
                      title="Add"
                      @click="onAddAttribute()"
                    >
                      <i class="bi bi-check"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div v-else class="col-12 text-end">
              <button class="btn btn-sm btn-outline-primary" @click="onAddAttributeBtnClick()">
                <i class="bi bi-plus"></i> Add attribute
              </button>
            </div>
          </template>
        </div>
      </div>

      <!-- events timeline -->
      <div class="col bg-light mt-5 mt-md-0">
        EVENTS TIMELINE
        <TimelineEvent
          class="mt-3"
          :event="{ data: '/dummy-page', type: 'page-visit', dateTime: Date() }"
        />
        <TimelineEvent
          class="mt-3"
          :event="{ data: '{ name: Kwesi }', type: 'attribute-change', dateTime: Date() }"
        />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useToast } from 'vue-toastification';
import Customer from '../models/Customer.model';
import CustomerService from '../services/customers.service';
import TimelineEvent from '../components/TimelineEvent.vue';
import dayjs from 'dayjs';
import { customerHasName, getCustomerName } from '../customer-utils';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: string,
}>()

const customer = ref<Customer | null>(null);
const toast = useToast();
const immutableAttributes = ref(['email', 'created_at'])
const router = useRouter()

function loadCustomer() {
  CustomerService.getCustomer(props.id)
    .then(res => {
      customer.value = res.data?.customer;
    })
    .catch(err => {
      toast.error(`Failed to load latest customer information. Refresh page\n ${err}`);
    })
}

const customerProfileImg = computed(() => {
  return customer.value?.attributes.image_url || 'https://images.pexels.com/photos/4668511/pexels-photo-4668511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
})

const customerTitle = computed(() => {
  if (!customer.value) {
    return
  }

  if (customerHasName(customer.value)) {
    return getCustomerName(customer.value)
  }
  return customer.value.attributes.email
})

const customerJoinDate = computed(() => {
  return dayjs(customer.value?.attributes.created_at).format('MMM DD, YYYY HH:MM')
})

const eventsChartData = computed(() => {
  // return Object.keys(customer.value?.events ?? {})
  return [1, 2, 3, 4, 5]
})

const eventsChartOptions = computed<any>(() => {
  return {
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        // xaxis: Object.keys(customer.value?.events ?? {}),
        xaxis: ['event-1', 'event-2', 'event-3', 'event-4', 'event-5'],
        legend: {
          display: false
        }
      }
    }]
  }
})

const isAddingAttribute = ref(false);
const customerAttributesAddForm = ref({ name: '', value: '' });
const isEditingAttributes = ref(false);
const customerAttributesEditForm = ref<{ [attributeName: string]: string }>({});
const addAttributeForm = ref<HTMLFormElement>();

function onAddAttributeBtnClick() {
  customerAttributesAddForm.value = { name: '', value: '' }
  isAddingAttribute.value = true;
}

function onAddAttribute() {
  if (!isAddAttributeFormValid()) {
    return
  }

  const newCustomer = JSON.parse(JSON.stringify(customer.value)) as Customer;
  newCustomer.attributes[customerAttributesAddForm.value.name] = customerAttributesAddForm.value.value;

  CustomerService.updateCustomer(newCustomer)
    .then(() => {
      toast.success('Attribute added successfully');
      isAddingAttribute.value = false;
      loadCustomer();
    })
    .catch(() => {
      toast.error('Failed to add attribute');
    })
    .finally(() => {
      addAttributeForm.value?.classList.remove('was-validated');
    })
}

function isAddAttributeFormValid() {
  addAttributeForm.value?.classList.add('was-validated');
  if (!customerAttributesAddForm.value.name) {
    return false;
  }
  if (!customerAttributesAddForm.value.value) {
    return false;
  }
  return true;
}

function onEditAttributesBtnClick() {
  customerAttributesEditForm.value = JSON.parse(JSON.stringify(customer.value?.attributes))
  isEditingAttributes.value = true;
}

function onEditAttribute() {
  if (!isEditAttributeFormValid()) {
    return
  }

  const newCustomer = JSON.parse(JSON.stringify(customer.value)) as Customer;
  newCustomer.attributes = customerAttributesEditForm.value;

  CustomerService.updateCustomer(newCustomer)
    .then(() => {
      toast.success('Attributes successfully edited');
      isEditingAttributes.value = false;
      loadCustomer();
    })
    .catch(() => {
      toast.error('Failed to edit attributes');
    })
}

function isEditAttributeFormValid() {
  return true
}


const isDeleting = ref(false);

function onDeleteCustomer() {
  if (!customer.value) {
    return
  }

  CustomerService.deleteCustomer(customer.value.id)
    .then(() => {
      toast.success('Customer deleted successfully');
      router.push('/')
    })
    .catch(() => {
      toast.error('Failed to delete customer');
    })
}

onBeforeMount(() => {
  loadCustomer();
});

</script>

<style scoped lang="scss">
.profile-img {
  height: 200px;
}

#attributes-box {
  max-height: 35vh;
  overflow-y: auto;
}
</style>
