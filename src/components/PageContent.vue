<template> 
    <div id = 'itemsList'>
        <nav>
            <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            </ul>
        </nav>
        <ul>
            <li id = 'list' v-for= "item in items" :key="item.name">
                <b>{{ item.name }}</b> <br><br>
                <img :src="item.imageURL"><br>
                {{ "$" + item.price }}<br><br>
                <qtyCounter v-bind:item ="item" v-on:counter="onCounter"></qtyCounter>
            </li>
        </ul>
        <basket id = 'shoppingBasket' v-bind:itemsSelected="itemsSelected" :collatedOrders="collatedOrders"></basket>
    </div>

</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from "../firebase.js"


export default {
    components: {
        'qtyCounter' : QuantityCounter,
        'basket' : Basket
    },
    
    // props: {
    //     itemsList: {
    //         type: Object
    //     }
    // },

    data() {
        return {
            itemsSelected: [],
            items: [],
            collatedOrders: {}
        } 
    },

    methods : {

        fetchItems:function(){
            database.collection('menu').get().then((snapshot)=>{
                let item = {}
                snapshot.forEach(doc=>{
                    item=doc.data()
                    item.id=doc.id
                    this.items.push(item) 
                    });      
                });    
        },

        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {

        // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0]; 

                    if (item_name == item.name && count > 0) {
                        this.itemsSelected.splice(i, 1);
                        this.itemsSelected.push([item.name, count, item.price]); 
                        return;
                    } else if (item_name == item.name && count == 0) {
                        this.itemsSelected.splice(i, 1);
                        return;
                    } else if (i == this.itemsSelected.length - 1 && item_name != item.name) {
                        this.itemsSelected.push([item.name, count, item.price]); 
                    }
                } 
            }

            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.collatedOrders[this.itemsSelected[i][0]] = this.itemsSelected[i][1];
            }
            for (let i = 0; i < this.items.length; i++) {
                if (!(this.items[i].name in this.collatedOrders)) {
                  this.collatedOrders[this.items[i].name] = 0;
                }
            }          
        }
    },

    created() {
      this.fetchItems()    
    }
} 

</script>

<style scoped> 

    #itemsList {
        width: 100%;
        max-width: 70%;
        margin: 0px;
        padding: 0 5px;
        box-sizing: border-box;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        border: 1px solid #222;
        margin: 10px; 
    }

    #liheader {
        width:500px;
        display: inline-block;
    }

    img {
        width: 135px;
        height: 135px;
    }

    #price {
        font-size: 30px;
    }

    #itemName {
        font-size: 30px;
    }

    #shoppingBasket {
        position: absolute;
        top: 23%;
        left: 78%;
    }

</style>

    