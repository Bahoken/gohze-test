<template>
  <div>

    <div class="crud-head">

      <div class="picklist-group">
        <label for="entries">Show</label>
        <select class="picklist-group--select" id="entries">
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
        <label for="entries">Entries</label>
      </div>

      <div class="pagination">
        <button class="btn btn-secondary btn-rounded">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="btn btn-secondary btn-rounded">
          1
        </button>
        <button class="btn btn-secondary btn-rounded btn-active">
          2
        </button>
        <button class="btn btn-secondary btn-rounded">
          3
        </button>
        <button class="btn btn-secondary btn-rounded">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <div class="search-group">
        <button class="btn btn-primary" @click="openNewModal()">
          <i class="fas fa-plus"></i> New
        </button>
        <button class="btn btn-danger">
          <i class="fas fa-trash"></i> Delete
        </button>
        <input type="text" class="form-control" placeholder="Search...">
      </div>

    </div>

    <!-- <h1>I'm here</h1> -->

    <!-- New Item Modal -->
    <div class="modal--custom" v-if="isNewModalOpen">
      <div class="modal-background"></div>
      <!-- Modal content -->
      <div class="modal-content">
          <h3 class="modal-title">Create New Item</h3>
          <div class="modal-body">
            <!-- Input fields for item properties -->
            <input v-model="newItem.role" type="text" placeholder="role name" />
            <input v-model="newItem.permission" type="text" placeholder="permission" />
            <!-- Add more input fields as needed -->

            <!-- Modal buttons -->
            <div class="modal-buttons">
              <button class="btn btn-primary" @click="saveNewItem">Save</button>
              <button class="btn btn-cancel" @click="cancelNewModal">Cancel</button>
            </div>
          </div>
      </div>
    </div>
    

  </div>
</template>

<script>

import store from '../store.js';

export default {
  name: 'CrudHead',
  data() {
    return {
      isNewModalOpen: false,
      newItem: {
        role: '',
        permission: '',
        // Add more properties for the new item as needed
      }
    };
  },
  methods: {
    openNewModal() {
      console.log('--- open ---')
      this.isNewModalOpen = true;
    },
    cancelNewModal() {
      this.isNewModalOpen = false;
      // Reset the new item form fields if needed
      this.newItem.role = '';
      this.newItem.permission = '';
    },
    saveNewItem() {
      // Add validation and other logic as needed
      // Create a new item object based on the form fields
      const newItem = {
        roleName: this.newItem.role,
        permission: this.newItem.permission,
        // Set other properties of the new item as needed
      };

      // Dispatch an action to save the new item in the store
      store.dispatch('addItem', newItem);

      // Save the updated tableData to localStorage
      const updatedData = JSON.stringify(store.state.tableData);
      localStorage.setItem('data', updatedData);

      // Close the modal and reset the form fields
      this.cancelNewModal();
    }
  }
};
</script>

<style scoped>
.btn-active {
  background: #f54b4b;
  color: #fff;
}

.btn {
  display: flex !important;
  justify-content: center;
  gap: .5em;
  align-items: center;
}

.btn-rounded {
  border-radius: 100%;
}

.crud-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1rem;
  margin: 2rem;
  background: #fff;
  border-radius: .75rem;
}

.picklist-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.form-control {
  width: fit-content;
}

.search-group {
  display: flex;
  flex-direction: row;
  gap: .5rem;
}

.picklist-group--select {
  padding: .25rem;
  border-radius: .5rem;
}

.pagination {
  display: flex;
  gap: 1rem;
}

.btn {
  display: flex;
  flex-direction: row;
}

.modal--custom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Dark transparent background */
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
}

.modal-title {
    font-size: 20px;
    margin-bottom: 10px;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
}

.modal-body {
  display: flex;
  gap: 2rem;
}

.modal-body > input {
  padding: .5rem;
  border: .25rem solid #ddd;
  border-radius: .5rem;
}

</style>
