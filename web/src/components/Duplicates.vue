<template>
  <q-card style="width: 480px; max-width: 80vw;">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Possible Duplicates</div>
      <q-space />
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          :label="useJaroWinkler ? 'Use Similarity' : 'Use JaroWinkler'"
          @click="$emit('toggle-jaro-winkler', !useJaroWinkler)"
          color="secondary"
          flat
        />
        <q-btn icon="close" flat round dense v-close-popup />
      </div>
    </q-card-section>
    <q-card-section>
      <q-table
        flat
        :data="rows"
        :columns="columns"
        v-if="!loading"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <q-table :data="props.row.similarities" :columns="similarityColumns" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['rows', 'useJaroWinkler'],
  data() {
    return {
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left',
        },
        {
          name: 'email_address',
          label: 'Email Address',
          field: 'email_address',
          align: 'left',
        },
      ],
      similarityColumns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left',
        },
        {
          name: 'email_address',
          label: 'Email Address',
          field: 'email_address',
          align: 'left',
        },
        {
          name: 'weigth',
          label: 'Probability',
          field: 'weigth',
          format: (val) => `${(val * 100).toFixed(2)}%`,
        },
      ],
    };
  },
};
</script>
