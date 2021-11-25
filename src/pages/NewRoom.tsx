 import { useCallback, FormEvent, useState, useEffect } from 'react';
 import { Link, useHistory } from 'react-router-dom';  
 
 import '../styles/new-room.scss'

 import IllustrationImg from '../assets/images/illustration.svg'
 import Logo from '../assets/images/logo.svg'

 import { useAuth } from '../hooks/useAuth';
 import {Button} from '../components/Button'
import { database } from '../service/firebase';
 
 
const NewRoom =() => {
  const {user} = useAuth()

  const history = useHistory();

  const [newRoom, setNewRoom] = useState("")

  useEffect(() =>{
    if(!user){
      history.push('/')
    }
  },[user,history])

  const handleCreateRoom = useCallback(async (event: FormEvent) =>{
    event.preventDefault();

    if(newRoom.trim() === ""){
      return;
    }

    const roomRef = database.ref('rooms')
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    }) 

    history.push(`/admin/rooms/${firebaseRoom.key}`)
    },[ user,newRoom,history])



  return(

    
    
    <div id="new-room-page">
      <aside> 
        <img src={IllustrationImg} alt="Ilustração simbolizando pergustar e respostas"/>
          <strong>Toda pergunta tem uma resposta</strong>

          <p>Aprenda e compartilhe o conhecimento com outras pessoas</p>

       
      </aside>

      <main>
        <div>
          <img src={Logo} alt="Logo"/>
          <form onSubmit={handleCreateRoom}>
            <strong>Crie uma nova sala</strong>
            <input
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value) }/>
            <Button>Criar Sala</Button>         
          </form>
          <div className="enter-room">
            <p>Quer entrar em uma sala ja existente?</p>
            <Link to="/">Clique aqui</Link>
          </div> 
        </div>
      </main>
      
  </div>  
 
  )
}

export { NewRoom }