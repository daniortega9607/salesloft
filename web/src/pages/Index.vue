<template>
  <q-page class="flex flex-center">
    <q-table
      title="Salesloft People"
      :data="people"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      @request="getPeople"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-sm">
          <q-btn label="Sync New" @click="syncPeople"/>
          <q-btn color="primary" label="Count Chars" @click="countChars"/>
          <q-btn color="secondary" label="Find Duplicates" />
        </div>
      </template>
    </q-table>
    <q-dialog
      v-model="frequency"
    >
      <characters-counter :rows="charactersCounter"/>
    </q-dialog>
  </q-page>
</template>

<script>
import CharactersCounter from '../components/CharactersCounter.vue';

export default {
  name: 'PageIndex',
  components: { CharactersCounter },
  data() {
    return {
      frequency: false,
      charactersCounter: [],
      people: [],
      columns: [
        {
          name: 'first_name',
          label: 'First Name',
          field: 'first_name',
          align: 'left',
        },
        {
          name: 'last_name',
          label: 'Last Name',
          field: 'last_name',
          align: 'left',
        },
        {
          name: 'email_address',
          label: 'Email Address',
          field: 'email_address',
          align: 'left',
        },
        {
          name: 'title',
          label: 'Job Title',
          field: 'title',
          align: 'left',
        },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      loading: false,
    };
  },
  async mounted() {
    this.getPeople({ pagination: this.pagination });
  },
  methods: {
    async getPeople({ pagination }) {
      this.loading = true;
      const { data: people } = await this.$axios.get('/people', {
        params: {
          $limit: pagination.rowsPerPage ? pagination.rowsPerPage : this.pagination.rowsNumber,
          $skip: (pagination.page - 1) * pagination.rowsPerPage,
        },
      });
      this.loading = false;
      if (people) {
        this.people = people.data;
        this.pagination.rowsNumber = people.total;
        this.pagination.rowsPerPage = pagination.rowsPerPage || people.total;
        this.pagination.page = pagination.page;
      }
    },
    async syncPeople() {
      this.loading = true;
      const { data: response } = await this.$axios.post('/people/sync');
      this.loading = false;
      if (response) {
        if (response.message) {
          this.$q.notify({
            message: response.message,
          });
        }
        this.getPeople({ pagination: this.pagination });
      }
    },
    async countChars() {
      this.loading = true;
      const { data: response } = await this.$axios.get('/people/char-frequency', {
        params: {
          order: 'desc',
        },
      });
      if (response) {
        this.charactersCounter = response;
        this.frequency = true;
      }
      this.loading = false;
    },
    // async findDuplicates() {
    // }
  },
};
</script>
