<template>
  <div class="TimelineEvent container-fluid p-3">
    <div class="row position-relative">
      <div class="col">
        <i :class="getEventIcon()"></i>
        <span class="m-2">{{ getEventName() }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        Event data:
        <span style="font-size: larger;">{{ event.data }}</span>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col text-end text-muted">
        <small>{{ event.dateTime }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimelineEvent from '../models/TimelineEvent.model';

const props = defineProps<{
  event: TimelineEvent
}>()

function getEventIcon() {
  switch (props.event.type) {
    case 'page-visit':
      return 'bi bi-eye';
    case 'attribute-change':
      return 'bi bi-person-badge';
    default:
      return 'bi bi-calendar-event';
  }
}

function getEventName() {
  switch (props.event.type) {
    case 'page-visit':
      return 'Page visit';
    case 'attribute-change':
      return 'Attribute change';
    default:
      return props.event.type;
  }
}
</script>

<style scoped lang="scss">
.TimelineEvent {
  background-color: white;
  border-radius: 4px;
  border-left: 4px solid black;
}

.divider {
  width: 100%;
  border-top: 1px solid black;
  margin-top: 50%;
}
</style>
