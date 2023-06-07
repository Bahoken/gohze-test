<script>
import store from '../store.js';
import DeleteConfirmationModal from './DeleteConfirmationModal.vue';

export default {
    name: 'CrudTable',
    components: {
        DeleteConfirmationModal,
    },
    data() {
        return {
            isEditModalOpen: false,
            editedItem: null,
            data: store.state.tableData,
            isDeleteModalOpen: false,
        };
    },
    beforeMount() {
        store.dispatch('loadDataFromLocalStorage');
        console.log('---reloaded data---',store.state.tableData);

    },
    computed: {
        tableData() {
            return this.data;
        },
    },
    methods: {

        viewItem(item) {
            // Handle view action
            console.log('View item:', item);
        },

        openEditModal(item) {
            console.log('--- item ---', item);
            this.editedItem = { ...item }; // Create a copy of the item being edited
            this.isEditModalOpen = true;
        },

        closeEditModal() {
            this.isEditModalOpen = false;
        },

        saveChanges() {

            // Find the index of the edited item in the data array
            const index = this.data.findIndex(item => item.id === this.editedItem.id);

            if (index !== -1) {
                // Update the item in the data array with the edited values
                this.data[index] = { ...this.editedItem };

                // Update the item in the Vuex store
                store.commit('updateItem', { index, item: this.editedItem });

                // Save the data to local storage
                localStorage.setItem('data', JSON.stringify(this.data));

                console.log('Changes saved:', this.editedItem);
            }

            this.closeEditModal();
        },

        deleteItemConfirm() {
            // Delete the item from the data array
            const index = this.data.findIndex(item => item.id === this.editedItem.id);
            if (index !== -1) {
                this.data.splice(index, 1);
                // Update the data in the Vuex store
                store.commit('deleteItem', this.editedItem.id);
                // Save the data to local storage
                localStorage.setItem('data', JSON.stringify(this.data));
            }
            this.closeDeleteModal();
        },

        openDeleteModal(item) {
            this.editedItem = item;
            this.isDeleteModalOpen = true;
        },

        closeDeleteModal() {
            this.isDeleteModalOpen = false;
        },

    },
};
</script>

<template>
    <div>

        <div class="card">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th scope="col">ACTIONS</th>
                        <th scope="col">ROLE NAME</th>
                        <th scope="col">PERMISSION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index"
                        :class="index % 2 === 0 ? 'table-row-even' : 'table-row-odd'">
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td class="btn-container">
                            <button class="btn btn-view" @click="openViewModal(item)">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn btn-edit" @click="openEditModal(item)">
                                <i class="fas fa-pencil"></i>
                            </button>
                            <button class="btn btn-trash" @click="openDeleteModal(item)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                        <td>{{ item.roleName }}</td>
                        <td>{{ item.permission }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Edit Modal -->
        <div class="modal" :class="{ 'display-block': isEditModalOpen }">
            <div class="modal-dialog">
                <div class="modal-content" v-if="editedItem">
                    <div class="modal-header--custom">
                        <p class="modal-title">Edit Role</p>
                        <button type="button" class="close" @click="closeEditModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Inputs for editing -->
                        <div class="form-group">
                            <label for="editRoleName">Role Name</label>
                            <input type="text" class="form-control" id="editRoleName" v-model="editedItem.roleName">
                        </div>
                        <div class="form-group">
                            <label for="editPermission">Permission</label>
                            <input type="text" class="form-control" id="editPermission" v-model="editedItem.permission">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="saveChanges">Save</button>
                        <button type="button" class="btn btn-secondary" @click="closeEditModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- delete modal -->
        <delete-confirmation-modal v-if="isDeleteModalOpen" 
            @delete="deleteItemConfirm"
            @close="closeDeleteModal">
        </delete-confirmation-modal>


    </div>
</template>
  

  
<style scoped>
.modal-header--custom {
    display: flex;
    flex-direction: row;
    padding-block: 1.5rem;
    padding-inline: 2rem;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}

.display-block {
    display: block;
}

.btn-view,
.btn-edit,
.btn-trash {
    background: transparent;
}

.btn-view {
    color: #2eb375;
}

.btn-edit {
    color: #0787ff;
}

.btn-trash {
    color: #e05656;
}

.btn-container {
    gap: .2rem;
}

input[type="checkbox"] {
    padding: 2rem;
    cursor: pointer !important;
}

.thead-dark {
    background: #ddd;
    color: #fff;
}

.card {
    background: #fff;
    display: flex;
    width: 97vw;
    margin: 0 auto;
    padding: 2rem;
    padding-top: 3rem;
    border-radius: .75rem;
    justify-content: center;
    align-items: center;
}

th {
    text-align: center;
}

.table {
    text-align: center;
    width: 100%;
}

.table-row-even {
    background-color: #f8f9fa;
    /* Alternate color for even rows */
}

.table-row-odd {
    background-color: #e9ecef;
    /* Alternate color for odd rows */
}
</style>
  