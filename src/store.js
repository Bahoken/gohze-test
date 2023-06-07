import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tableData: (localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : [
            { id: 'AC1', roleName: 'Role 1', permission: 'Permission 1' },
            { id: 'AC2', roleName: 'Role 2', permission: 'Permission 2' },
            { id: 'AC3', roleName: 'Role 3', permission: 'Permission 3' },
            // Add more data objects as needed
        ],
        tableKey: 0
    },

    mutations: {
        SET_TABLE_DATA(state, data) {
            state.tableData = data;
        },
        updateItem(state, payload) {
            // Update the item in the tableData array
            state.tableData[payload.index] = payload.item;
        },
        deleteItem(state, itemId) {
            state.tableData = state.tableData.filter(item => item.id !== itemId);
        },
    },

    actions: {
        loadDataFromLocalStorage({ commit }) {
            const storedData = localStorage.getItem('data');
            console.log('-- stored --', storedData);
            if (storedData) {
                commit('SET_TABLE_DATA', JSON.parse(storedData));
            } else {
                // Use default data from the store state
                // Replace 'defaultTableData' with your actual default data in the store state
                commit('SET_TABLE_DATA', [...tableData]);
            }
        },
        addItem({ commit, state }, newItem) {
            // Generate a unique ID for the new item
            const id = state.tableData.length + 1;

            // Create a copy of the current tableData array
            const updatedData = [...state.tableData];

            // Add the new item with the generated ID
            const itemToAdd = {
                id,
                ...newItem
            };
            updatedData.push(itemToAdd);

            // Commit the mutation to update the tableData state
            commit('SET_TABLE_DATA', updatedData);

            // Update the tableDataKey to trigger re-rendering of the CrudTable component
            state.tableKey += 1;
        }
    },
    getters: {
        // Define getters here if needed
    },
});

export default store;
