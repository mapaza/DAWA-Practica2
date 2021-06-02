/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPersonsRepository')} obj.PersonsRepository
 */
 export default ({ PersonRepository }) => {
  return async ({ nombre, dni,telefono,email,direccion }) => {
    const nuevaEntidad = {
      nombre: nombre,
      dni:dni,
      telefono:telefono,
      email:email,
      direccion:direccion
    }
    return await PersonRepository.add(nuevaEntidad)
  }
}
