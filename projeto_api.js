//importação -- dependencias
const express = require('express')
const bodyParser = require('body-parser')

//criando a aplicação
const app = express() 

//body-parser é um módulo que converte o body da requisição, para vários formatos. Ex.: Json
app.use(bodyParser.json())

//criando a porta para
const port = process.env.PORT || 3000;

//cria a função 
const listenFunction = () => console.log('Serve Listen in port: ' + port)
app.listen(port, listenFunction)

//CRIANDO API PARA LOGAR
const login = [
    {
        email: 'andreia@g.com',
        password: '1234'
        //id : 1
    }
]

//listando login e verificando se a requisição foi bem sucedida
const listLogin = (request, response) => {
    return response.status(200).send(login)
}

//create login  - cadastrar usuário 
const createLogin = (request, response) => {
    const newUser = request.body
    console.log('NEWUSER', newUser)
    login.push(newUser)
    if (newUser.name && newUser.email && newUser.password) {
        return response.status(201).send({msg : 'User added successfully'})        
    }else{
        return response.status(400).send({msg : 'Verificar body'})
    }
}

//Metodos htpp para API Login 
app.get('/logins',listLogin)

app.post('/logins',createLogin)


//API para TODO LIST
const todolist = [
    {
        title: 'Study API',
        text: 'Aprendendo sobre os métodos HTTP',
        id: 1
        
    }
]
//Listando os TODO List
const tdlist = (request, response) => {
    return response.status(200).send(todolist)
}
//Criando os TODO List
const createToDoList = async (request, response) => {    
    const todos = await request.body
    console.log('TODOLIST',todos)
    todolist.push(todos)
    if (todos.title && todos.text && todos.id){
        return response.status(201).send({msg: 'TODO OK'})
    }else{
        return response.status(400).send({msg: 'TODO NOT FOUND'})
    }
}

const upToDoList = async (request, response) => {
    const id = await request.params.id 
    if(id){
        return response.status(201).send({msg: 'To Do List excluido com sucesso'})
    }else{
        return response.status(400).send({msg : 'Veitificar ID'})
    }
    
}
const deleteToDoList = (request, response) => {
    const id = request.params.id
    console.log('id', id)
    var isFoundTodoList = false
    if (todolist.length > 0) {
        todolist.find((element,index) =>{
            if (element.id == id){
                isFoundTodoList = True
                 todolist.splice(id, 1)
            }
        })
    }
    if(isFoundTodoList){
        return response.status(201).send({ msg: "Excluido com Sucesso"})
    }else{
        return response.status(400).send ({ msg : 'To Do List não encontrado na lista'})
    }
    //localStorage.setItem('todolist', Json.stringify(todolist))   

}


//Metodos http para API TODO LIST
app.get('/todolist', tdlist)
app.post('/todolist', createToDoList)
app.put('/todolist/:id',upToDoList)
app.delete('/todolist/:id',deleteToDoList)

