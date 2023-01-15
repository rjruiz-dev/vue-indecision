<template>
    <!-- <img src="https://via.placeholder.com/250" alt="bg"> -->
    <!-- v-bind, utilizo shortcuod :src -->
    <!-- v-if: como la img es null = false  -->
    <img  v-if="img" :src="img" alt="bg">

    <div class="bg-dark">

    </div>
               
    <div class="indecision-container">
        <input
          type="text"
          placeholder="Hazme una pregunta"
          v-model="question"> <!-- enlazar el input con la propiedad reactiva --> 
          
        <p>Recuerda terminar con un signo de interrogación (?)</p>

        <!-- renderizo este segmento  so la pregunta es valida -->
        <div v-if="isValidQuestion">
            <h2>{{ question }}</h2>
            <h1>{{ answer }}</h1>
        </div>

    </div>
</template>

<script>
export default {
     data() {
        return {
            // propiedad reactiva
            question: null,
            answer: null,
            img: null,
            // es una bandera para saber cunado debo mostrar cierto texto
            isValidQuestion: false
        }
    },
    methods: {
        async getAnswer() {

            try {
                // cuando se esta haciendo la peticion el msj: Pensando...
                this.answer = 'Pensando...'

                // peticion con fetch
                // es una promesa, extraer el json
                // const data = await fetch('https://yesno.wtf/api').then( r => r.json() )
                // console.log(data);
                
                // desectructuracion de lo q me intersa
                const { answer, image } = await fetch('https://yesno.wtf/api').then( r => r.json() )
                // console.log(answer);

                // es la propiedad = la const desectructurada
                this.answer = answer === 'yes' ? 'Si!' : 'No!'
                this.img = image 

            } catch (error) {
                //  si el fetch falla
                console.log('IndecisionComponent: ', error);
                this.answer = 'No se pudo cargar del API'
                this.img = null
            }
            
        }
    },    
    // watch: como si fuera un obj, en este caso esta pendiente de la pro reactiva question
    watch: {
        // cuando el question cambia
        question (value, oldValue){
            // loqueamos el obj {}
            // console.log({value, oldValue });

            this.isValidQuestion = false

            console.log( { value });

            // si el nuevo valor incluye singo ?
            // console.log(value.includes('?')); // devuelve true o false
            if ( !value.includes('?') ) return

            this.isValidQuestion = true

            // TODO: Realizar petición http invocando el metodo getAnswer()
            this.getAnswer()
        }
    }

}
</script>

<style >

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>