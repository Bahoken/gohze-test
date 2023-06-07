<script setup>
import CrudHead from '@/components/CrudHead.vue'
import CrudTable from '@/components/CrudTable.vue';
import store from '../store.js';
import flag from '../assets/flag.png';
</script>

<template>
    <div>
        <span class="user--details">

            <div class="user--details--toggle">
                <i class="fas fa-moon"></i>
            </div>

            <div class="user--details--info">
                <div class="user--details--info--lang">
                    <img :src="flag" alt="flag" class="flag">
                    English
                    <i class="fas fa-calendar"></i>
                </div>
                <div class="user--details--info--perso">
                    example@gohze.org
                    <i class="fas fa-caret-down"></i>
                </div>
            </div>

        </span>
        <span class="list--details">
            <p class="list--details--title">
                List of roles |
            <i class="fas fa-home list--details--icon"></i>
            </p>
        </span>

        <main class="user--main"> 
            <CrudHead />
            <CrudTable :key="store.state.tableKey" />
        </main>
        
    </div>
</template>

<style>

    .list--details {
        margin-block: 2rem;
        margin-inline: 2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .list--details--title {
        font-size: 2rem;
        font-weight: 600;
    }

    .list--details--icon {
        color: #eb4c4c;
        font-size: 2rem;
    }

    .user--main {
        margin-bottom: 2rem;
    }

    .user--details {
        display: flex;
        margin-top: 1rem;
        margin-inline: 1rem;
        align-items: center;
        justify-content: space-between;
    }

    .user--details--toggle > i {
        font-size: 2.5rem;
        color: #eb4c4c;
    }

    .user--details--info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.75rem;
        font-size: 1.75rem;
    }

    .flag {
        width: 2.5rem;
    }

</style>