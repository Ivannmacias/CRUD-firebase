import React,{useEffect,useState} from 'react'
import {firebase} from './firebase'


function App() {

  const [Tareas, setTareas] = useState([])
  const [Tarea, setTarea] = useState('')
  const [ModoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')

useEffect(()=>{
const obtenerDatos = async()=>{
 try {
   const db = firebase.firestore()
   const data = await db.collection('tareas').get()
  console.log(data);
   
   const arrayData = data.docs.map(doc=>({id: doc.id , ...doc.data()}))

setTareas(arrayData)

 } catch (error) {
   
  console.log(error);
 }

}


obtenerDatos()

},[])

const agregar =async(e)=>{

  e.preventDefault()
  
  if(!Tarea.trim()){
    console.log("elemento vacio");
    return
  }
  
  try {
    const db = firebase.firestore()

    const nuevaTarea =
    {name: Tarea, fecha: Date.now()}

    const data = await db.collection('tareas').add(nuevaTarea)
    
    setTareas([
      ...Tareas,
      {...nuevaTarea, id: data.id}

    ])

    setTarea('')
  } catch (error) {
    console.log(error);
  }
  
}

const eliminar= async (id)=>{
  try {
  const db = firebase.firestore()
 
 await db.collection('tareas').doc(id).delete()
    const tareasFiltrado = Tareas.filter(item=>(item.id !==id))
    setTareas(tareasFiltrado)
} catch (error) {
    
  }
}

const activarEdicion = (item)=>{
  setModoEdicion(true)
  setTarea(item.name)
  setId(item.id)

}

const editar =async (e)=>{
e.preventDefault()

if(!Tarea.trim()){
  
console.log("campo vacio");
return

}

try {

  const db = firebase.firestore()
  await db.collection('tareas').doc(id).update({name:Tarea })
  
  const arrayEditado = Tareas.map(item=>(
    item.id === id ?{id:item.id,fecha: item.fecha,name:Tarea}: item

  ))

  setTareas(arrayEditado)

  setModoEdicion(false)
  setTarea('')
  setId('')

} catch (error) {
  console.log(error);
}


}

  return (
    <div className="container mt-3">
      <h1>Consumo de API</h1>
      <hr/>
    <div className="row">
    <div className="col-md-6">
      <h1>
        {
          ModoEdicion ? 'Editar' :'Formulario'
        }
        </h1>

      <form onSubmit={ModoEdicion ? editar : agregar}>
        <input type="text"
        placeholder="ingrese tarea"
        className="form-control mb-2"
        onChange={e=>(setTarea(e.target.value))}
        value={Tarea}
        />
        <button 
        className="btn btn-dark btn-block" 
        type="submit">
          {
            ModoEdicion ? 'Editar':'Agregar'

          }
          </button>
      </form>
    </div>

      <div className="col-md-6">
       <ul className="list-group">
         {
           Tareas.map(item=>(
            <li className="list-group-item" key={item.id}>{item.name}
            <button className="btn btn-danger float-right" onClick={()=>eliminar(item.id)}>Eliminar</button>
            <button className="btn btn-warning mr-2 float-right" onClick={()=>activarEdicion(item)}>Editar</button>
            

            </li>
           ))

         }
       </ul>
      </div>
    </div>


    </div>
  );
}

export default App;
