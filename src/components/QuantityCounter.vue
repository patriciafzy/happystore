<template>
  <div>
    <button v-on:click= "increment()">+</button>
    <span>{{counter}}</span>
    <button v-on:click= "decrement()">-</button>
  </div>
</template>


<script>
export default {
    data() {
        return {
            counter: 0,
        }
    },

    props: {
        item: {
            type: Object
        }
    },

    methods: {
        increment() {
            if (this.counter < 10) {
                this.counter++; 
            } else {
                alert("You cannot buy more than 10 items.")
            }
            this.$emit('counter', this.item, this.counter)
    },
        decrement() {
            if (this.counter > 0) {
                this.counter--; 
            }
            this.$emit('counter', this.item, this.counter)
        }
    }
};

</script>

<style scoped> 
    button{
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center; 
        color: #bb0d38a8; 
    }

</style>
