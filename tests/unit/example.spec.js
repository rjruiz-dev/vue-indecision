// PRUEBAS CON FRAMEWORK JEST
// Test Suite -> Test (pruebas individuales)
// describe('el componente')
describe('Example Component', () => {
  // todas las pruebas relacionadas al componente
  test('Debe de ser mayor a 10',() => {

    // Arreglar
    let value = 10;

    // Estimulo
    value = value + 2

    // Observar el resultado
    
    // if (value > 10){
    //   // TODO: todo bien!
    // } else {
    //   throw `${value} no es mayor a 10`
    // }

    // con metodo del framework jest
    expect(value).toBeGreaterThan(10)

  })
})