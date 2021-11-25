import { useEffect, useState } from "react";
import { database } from "../service/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string,
  },
  likes: Record<string,{
    authorId: string;
  }>
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}>

type Question = {
  id:string,
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likeId: string | undefined,
  likeCount: number,

}


export function useRoom(roomId: string){
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('') 
  const {user} = useAuth();




  useEffect(() =>{
    const roomRef = database.ref(`/rooms/${roomId}`)  
    // listener que ouve um evento uma unica vez. on ouve vários eventos
    // value retorna todos as informaçoes da sala
    roomRef.on('value',room =>{
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
       const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) =>{
       return{
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {})
                       .find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      }) 
        
      setQuestions(parsedQuestions);
      setTitle(databaseRoom.title); 
     
      
      return() =>{
        roomRef.off('value')
      }
    })      
  },[roomId, user?.id])


  return {questions, title}
  
 }