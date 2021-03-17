<template> 
    <div>
        <h2>Menu: </h2>
        <!-- <basket id = 'shoppingBasket' v-bind:itemsSelected = "itemsSelected"></basket> -->
        <!-- <ul>
            <li v-for= "item in itemsSelected" :key="item.id">
                <b>{{item[0] + ' x ' + item[1] }}</b> <br>
            </li>
        </ul> -->
        <ul>
        <li v-for= "item in itemsSelected" :key="item.id">
             <b>{{item[0] + ' x ' + item[1] }}</b> <br>
        </li> 
        </ul>
        <button v-on:click="sendOrder">Add Order</button>
        <!-- <button v-on:click= "show = !show">Calculate Total</button>
        <p v-show= "show">Subtotal: {{"$" + findTotal()}} </p>
        <p v-show= "show">Grand Total: {{"$" + (findTotal() * 1.07).toFixed(2)}}</p> -->

    </div>

</template>

<script>
// import QuantityCounter from './components/QuantityCounter.vue'
import database from "../firebase.js"


export default {

    data() {
        return {
            show: false,
        }
    },

    
    props: {
        itemsSelected: {
            type: Array
        }, 

        collatedOrders: {
            type: Array
        }
    },

    methods: {
        // findTotal() {
        //     let cost = 0; 
        //     for (let i = 0; i < this.itemsSelected.length; i++) {
        //         this.item_selected = this.itemsSelected[i];
        //         cost += this.item_selected[1] * this.item_selected[2];
        //     }
        //     return cost; 
        // },

        sendOrder: function() {
            database.collection('orders').add(this.collatedOrders).then(() => {location.reload()});
        }
    },
} 

</script>

<style scoped> 
    button{
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center; 
        color: #bb0d38a8; 
    }

</style>

