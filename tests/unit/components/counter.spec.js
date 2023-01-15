// importar shallowMount para montar el componente

// mount: monta todo el componente y los subcomponentes
// shallowMount: montada mas suave

import { shallowMount} from '@vue/test-utils'

// importar el componente
import Counter from '@/components/Counter'


describe('Counter Component', () => {

    let wrapper 

    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })

    // test('debe hacer match con el snapshot', () => {

    //     // Arreglar
    //     const wrapper = shallowMount (Counter) // envolver todo (componente Counter)

    //     // Observar el resultado          
    //     // el wrapper extrae el html
    //     expect( wrapper.html() ).toMatchSnapshot() // captura del codigo: detectar si hay cambios 
    // })

    test('h2 debe de tener el valor por defecto "Counter"', () => {
        // Arreglar 
        // Nuestro sujeto de pruebas
        // shallowMount: no necesita renderizar comp internos
        // const wrapper = shallowMount (Counter) // envolver todo (componente Counter)

        // VERIFICAMOS QUE EXISTA etiqueta h2
        expect ( wrapper.find('h2').exists() ).toBeTruthy() // retorna true false

        // todos los que coincidan con el h2 (findAll)
        // const h2 = wrapper.find('h2')
        // console.log(h2.text()) // h2.text: para obtener el texto de la etiqueta

        // alaternativa
        const h2Value = wrapper.find('h2').text()
        
        // Observar el resultado  o Acerccion
        // expect( h2.text() ).toBe('Counter')
  
        expect( h2Value ).toBe('Counter')
               
    })

    test('el valor por defecto debe de ser 100 en el parrafo', () => {
        
        // Wrapper
        // const wrapper = shallowMount (Counter)

        // pTags
        // const pTags = wrapper.findAll('p')
        // console.log(pTags)
        
        // alaternativa busq de p por data-atributte
        const value = wrapper.find('[data-testid="counter"]').text()

       
        // expect segundo p === 100
        // expect( pTags[1].text() ).toBe('100')
       
        expect( value ).toBe('100')
    })

    // esperar a que se renderize el metodo async
    test('debe de incrementar y decrementar el contador', async() => {
        
        // Wrapper = montar el componente
        // const wrapper = shallowMount (Counter)
    
        // referencia al boton con desectructuracion
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')
        
        // simular el click
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        
        // obtener el valor por defecto del counter
        // let value = wrapper.find('[data-testid="counter"]').text()
        
        // el valor por defecto = 100, al hacer click incrementa en 1 entonces 101
        // expect( value ).toBe('101')
        
        // referencia al boton
        // const decreaseBtn = wrapper.findAll('button')[1]
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        
        // obtener el valor por defecto del counter
        const value = wrapper.find('[data-testid="counter"]').text()
        
        expect( value ).toBe('101')

    })

    test('debe de establecer el valor por defecto', () => {
        
        // leer la properties del component
        // console.log( wrapper.props() )

        const { start } = wrapper.props()

        const value = wrapper.find('[data-testid="counter"]').text()

        expect( Number(value) ).toBe( start ) 


    })

    test('debe de mostrar la prop title', () => {
        // asegurar que recibamos el title como una properties
        // leer el valor de la properties
        // asegurar que el valor de la props se mueste en el html
        // console.log(wrapper.html());
        
        const title = 'Hola Mundo!!!!'
        const wrapper = shallowMount ( Counter, {
            props: {
                // title: title
                title
            }
        })

        expect( wrapper.find('h2').text()).toBe(title)

    })



})