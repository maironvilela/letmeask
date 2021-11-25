import React from 'react';
import { ReactNode } from 'react';
import cn from 'classnames';

 
import '../styles/question.scss';

type QuestionProps = {
  message: string;
  author: {
    name: string,
    avatar: string,
  }
  isAnswered?:boolean;
  isHighlighted?:boolean;
  children?: ReactNode;
}

 
const Question = ({
  message, 
  author, 
  children, 
  isAnswered = false, 
  isHighlighted = false
}: QuestionProps) => {
  
  return (
    
    <div id="question-component"
         className={cn(
           {answered: isAnswered},
           {highlighted: isHighlighted}
         )}> 

      <strong>
        {message}
      </strong>
 
      <div className="footer-message">
        <div className="avatar">
          <img src = {author.avatar} alt=""/>
          <strong>{author.name}</strong>
        </div>
        <div>
          {children}
        </div>
      </div>
      
    </div>
  );
}

export { Question };