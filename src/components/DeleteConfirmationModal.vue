<template>
    <div class="delete-confirmation-modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <h3 class="modal-title">Are you sure?</h3>
            <div class="modal-buttons">
                <button class="btn btn-confirm" @click="confirmDelete">Confirm</button>
                <button class="btn btn-cancel" @click="closeDeleteModal">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        confirmDelete() {
            this.$emit('delete');
            this.closeDeleteModal();
        },
        closeDeleteModal() {
            this.$emit('close');
        },
    },
};
</script>

<style>
.delete-confirmation-modal {
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

.btn {
    margin-left: 10px;
}

.btn-confirm {
    background-color: #dc3545;
    color: #fff;
}

.btn-cancel {
    background-color: #ccc;
    color: #000;
}
</style>