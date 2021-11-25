import {useHistory} from 'react-router-dom'; 
 
import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import LogoGoogleImg from '../assets/images/google-icon.svg'
 
import { FiMoon } from "react-icons/fi";

 

 
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useCallback } from 'react';
  
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import { useState } from 'react';
import { FormEvent } from 'react';
import { database } from '../service/firebase';

export function Home(){

  const {theme, toggleTheme} =  useTheme();

  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState('')


  const handleEnterToRoom = useCallback(async (event: FormEvent) =>{
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists() ){
      alert("Room does not exists.");
      return;
    } 

    if(roomRef.val().closedAt){
      alert("Room already closed.");
      return;

    } 
    

    history.push(`/rooms/${roomCode}`)

  },[roomCode, history])


  const handleCreateRoom = useCallback(async ()=>{

    if(!user){
      await singInWithGoogle();
    } 
  
    history.push('/rooms/new')

  },[history, singInWithGoogle, user])

  return(
    <div id="page-auth">

      <aside>
         <img src={IllustrationImg} alt="Ilustração simbolizando pergustar e respostas"/>
        <strong>Toda pergunta tem uma resposta</strong>       
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
 
      <main className={theme}>    

        <div className="main-content">  

        <button onClick={toggleTheme} className="btn-mode" >
           <FiMoon color={theme === 'dark'?'#FFF':'#000'}/>
         </button>

          <img src={LogoImg} alt="Logo"/>

          <button className="btn-create-room" onClick={handleCreateRoom}> 
            <img src={LogoGoogleImg} alt="Log Google" />
            Crie sua Sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleEnterToRoom}>
            <input className="btn-enter-the-room"
                  placeholder="Digite o Código da Sala"
                  onChange={(event) => setRoomCode(event.target.value)}/>
            <Button >
              Entrar na Sala
            </Button>
          </form>
           
  
        </div>   

      </main>
    </div>

  )
}