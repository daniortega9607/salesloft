<template>
  <q-card style="width: 480px; max-width: 80vw;">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Characters Frequency</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-table
        flat
        :data="rows"
        :columns="columns"
      >
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['rows'],
  data() {
    return {
      columns: [
        {
          name: 'character',
          label: 'Character',
          field: 'character',
          align: 'left',
        },
        {
          name: 'count',
          label: 'Count',
          field: 'count',
        },
      ],
    };
  },
};
</script>
