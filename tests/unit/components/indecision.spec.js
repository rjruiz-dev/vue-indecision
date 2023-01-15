import { shallowMount} from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Indecision Component', () => {
    let wrapper 
    let clgSpy // console.log espia

    // mock del fetch
    global.fetch = jest.fn( () => Promise.resolve({
        // respuesta de la promesa
        json: () => Promise.resolve({
            // resuleve la petision del endpoin retorna
           answer: 'yes',
           forced: false,
           image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }) ) //funcion jest Promise.resolve: crea promesa y la resuelve de manera instantanea

    beforeEach(() => {
        wrapper = shallowMount(Indecision)

        clgSpy = jest.spyOn( console, 'log') // obj, metodo

        // proceso de limpieza individual para escribir el simbolo de "?"...
        // clgSpy.clear

        // proceso de limpieza para todo el test suite
        jest.clearAllMocks()
    })

    test('debe hacer match con el snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot() // captura del codigo:
    })

    test('escribir en el input no debe de disparar nada (console.log)', async () => {
        
        // funcion espia
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer') //  wrapper instancia del componente donde esta montado, vm intnacia de vue


        // hacer la referencia al input
        const input = wrapper.find('input') 
        
        // si la modificiacion afecta al doom, hay que esperar a q se vuelva a renderiazar por eso poner await
        await input.setValue('Hola Mundo')

        // evaluar si el console.log fue disparado toHaveBeenCalled
        // expect( clgSpy ).toHaveBeenCalled()
        expect( clgSpy ).toHaveBeenCalledTimes(1)
        
        // getAnswer no debe ser llamado
        expect( getAnswerSpy ).toHaveBeenCalledTimes(0)
        expect( getAnswerSpy ).not.toHaveBeenCalled()

    })

    test('escribir el simbolo de "?" debe de disparar el getAnswer', async () => {
        // funcion espia
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer') //  wrapper instancia del componente donde esta montado, vm intnacia de vue

        // hacer la referencia al input
        const input = wrapper.find('input') 
        
        // si la modificiacion afecta al doom, hay que esperar a q se vuelva a renderiazar por eso poner await
        await input.setValue('?')

        // getAnswer debe ser llamado
        expect( getAnswerSpy ).toHaveBeenCalledTimes(1)
        expect( getAnswerSpy ).toHaveBeenCalled()
    })

    test('prueba en getAnswer', async () => {
        // obtener un si
        await wrapper.vm.getAnswer()

        // console.log(wrapper.vm.img);
        // console.log(wrapper.vm.answer);

        // esperando que la imgen exista
        const img = wrapper.find('img')

        expect( img.exists()).toBeTruthy()
        expect( wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif') // que se la misma imagen que estoy esperando
        expect( wrapper.vm.answer).toBe('Si!')
    })

    test('pruebas en getAnswer - fallo en el API', async () => {
        // simular el fallo en el api 
        fetch.mockImplementationOnce( () => Promise.reject('API is down'))
       
        await wrapper.vm.getAnswer()

        // si todo sale mal por eje la imagen no existe
        const img = wrapper.find('img')

        expect( img.exists() ).toBeFalsy()
        expect( wrapper.vm.answer).toBe('No se pudo cargar del API')
    })
})