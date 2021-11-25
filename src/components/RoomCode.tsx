 import Copy from '../assets/images/copy.svg'; 

import'../styles/room-code.scss';

import {Button} from '../components/Button'

type RoomCodeProps = {
  code: string;
}  
const RoomCode  = ({code}: RoomCodeProps) => {
  //copia um conteudo da pagina
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="room-code-component">
      <Button>
        <img src={Copy} alt="Copy room" onClick={copyRoomCodeToClipboard}/>
      </Button>
      <span>{code}</span>
    </div>
  );
}

export {RoomCode};