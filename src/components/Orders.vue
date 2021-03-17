<template>
    <div>
        <nav> 
            <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
            </ul>
            <ul>
        <li v-for="(item, index) in orders" v-bind:key="index"> 
        <p v-for="(value, key, index) in item[1]" v-bind:key="index">{{ key }} : {{ value }}</p>
        <button v-bind:id="item[0]" v-on:click.prevent=deleteItem($event)>Delete</button>
        <button v-bind:id="item[0]" v-on:click.prevent=route($event)>Modify</button>        

        </li>
            </ul>
        </nav>
    </div>

</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            orders:[]
        }
    },

    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((snapshot) => {
              let item = {};
              snapshot.docs.forEach((doc) => {
                item = [doc.id, doc.data()];
                this.orders.push(item);
              });
            });
        }, 

        deleteItem: function(event) {
          let doc_id = event.target.getAttribute("id");
          database.collection('orders').doc(doc_id).delete().then(() => {location.reload()});
        },

        route: function(event) {
          this.id = event.target.getAttribute("id");
          this.$router.push({ name: 'modify', params: {id: this.id} });
        }
    },

    created() {
          this.fetchItems() 
    } 
}

</script>

<style>
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

/* .liheader2 li {
    display: inline;
    float: left;
} */

#liheader {
    display: in-line;
        /* width:725px;
        display: inline-block; */
}

button {
  width: 80px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

modifyorders {
    font-size: 30px;
}

</style>