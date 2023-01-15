<!--Counter.vue el componente hijo -->
<template>
    <!-- props: title -->
    <h2>{{ customTitle }}</h2> 
    <!-- se invoca como una propiedad mas, distinto a la invocacion de un metodo -->
    <p> {{ counter }} <sup>2</sup> = {{ squareCounter }}</p>  
    <p data-testid="counter"> {{ counter }}</p> <!-- data-testid="counter" se recomineda esto especifico para las pruebas un id o una clase se pueden e,iminar o borrar sino se necesita -->

    <div class="buttons-container">
        <!-- <button v-on:click="increase">+1</button> -->
        <button @click="increase">+1</button>
        <button @click="decrease">-1</button>
    </div>
</template>

<script>
export default {
    // propiedades de entrada del componente, se definen luego del export default
    // props: ['title','start'],
    props: {
        title: String,
        // start: Number
        // definimos como queremos que luzca y se comporte start
        start: {
            type: Number,
            default: 100,
            // required: true
            // validacion personalizada
            validator( value ) {
                return value >=0
            }
        }
    },
    // name: 'rodri'
    // data es una funcion que regresa un objeto
    data() {
        return {
            // counter: 5
            counter: this.start

        }
    },
    methods: { 
        getSquaredValue() {
            return this.counter * this.counter  // this.counter hace referencina al objeto, al valor que tengo en la data
        },
        increase() {
            // this.counter = this.counter + 1 
            this.counter++ 
        },
        decrease() {
            this.counter-- 
        }
    },
    computed: { // es otro obj muy parecido a los method
        // se guardan en el cache, deben retornar algo
        squareCounter() {      
            return this.counter * this.counter
        },
        customTitle () {
            // return this.title != null ? this.title : 'Counter'     
            // return this.title ? this.title : 'Counter'     
            return this.title || 'Counter'     

        }
    }
}
</script>

<style>
    button {
        background-color: #64bb87;
        border-radius: 5px;
        border: 1px solid white;
        color: white;
        cursor: pointer;
        margin: 0 5px;
        padding: 5px 15px;
        transition: 0.3s ease-in-out;
    }

    button:hover {
        background-color: #5aa67b;
        transition: 0.3s ease-in-out;
    }
</style>