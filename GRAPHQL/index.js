const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v4: uuid } = require('uuid')
const axios = require('axios')
const { KnownArgumentNamesOnDirectivesRule } = require('graphql/validation/rules/KnownArgumentNamesRule')
const { UniqueDirectivesPerLocationRule, isInterfaceType } = require('graphql')

let films=[]

const typeDefs = gql` 

  type Query {
    getPersons: [Person!]!
    getAccounts(dni: String): [Account!]!
    getAccountsTotal(dni: String): Int!
    getAccountsbyID(dni: String,nroAccount:String): [TransactionsbyAccount!]!
  }

  type Person {
    _id: String!    
    nombre: String!
    dni: String!
    telefono: Int!
    email: String!
    direccion: String!     
  }
  type Transaction {
    id: String!    
    id_account: String!
    nro_cuenta_origen: String
    nro_cuenta_destino: String
    token: String!
    cantidad: Int!
    description: String!
    tipo_transaction: String!  
    fecha_trans: String!    
  }
  type Account {
    _id: String!    
    id_person: String!
    nro_cuenta: String!
    saldo: Int!
    tipo: String!
    fecha_creacion: String!    
  }

  type TransactionsbyAccount {
    nombre_person: String!
    nro_cuenta: String!
    saldo_cuenta: Int! 
    transactions: [Transaction!]!   
  }  
  type Mutation {
    addTransaction(
      dni: String!    
      nro_cuenta_origen: String!
      nro_cuenta_destino: String!       
      cantidad: String!
      description: String!     
    ): Transaction
  }
  

`

let api="http://localhost:3000/api"

const resolvers = {
  Query: {

    //Query cuentas segun dni
    getAccounts: (root, args) => {
        let res=axios.get(api+"/accounts/"+args.dni).then((result) => {
            console.log(result.data.data)
            return result.data.data
      
          }).catch((error) => {
              return []
          });
        return res
      },
    //Query cuentas segun dni total saldo
    getAccountsTotal: (root, args) => {
      let res=axios.get(api+"/accounts/"+args.dni).then((result) => {
          console.log(result.data.data)
          const accounts= result.data.data
          let sum = accounts.reduce((a, b) => +a + +b.saldo, 0);
          console.log(sum)
          return sum
          
        }).catch((error) => {
            return []
        });
      return res
    },
    //Query cuentas cupo segun dni e id
    getAccountsbyID: (root, args) => {
      let res=axios.get(api+"/transactions/"+args.dni+"/"+args.nroAccount).then((result) => {
          console.log(result.data.data)
          return result.data.data
          
        }).catch((error) => {
            return []
        });
      return res
    },
    //Query cuentas segun dni
    getPersons: (root, args) => {
      let res=axios.get(api+"/persons").then((result) => {
          console.log(result.data.data)
          return result.data.data
        }).catch((error) => {
            return []
        });
      return res
    }
  },
    Mutation: {
      addTransaction: (root, args) => {
          const trans = {...args}
          let res = axios.post(api+"/transactions/transfer", trans).then((result) => {
              console.log(result.data.data)
              return result.data.data
          }).catch((error) => {
                return []
          });
        return res
      },
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
