 import {ButtonHTMLAttributes} from 'react';

 import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutline?: boolean
}


const Button = ({isOutline, ...props}: ButtonProps) =>(
  <button {...props} className={`button  {isOutline ? 'outline':''}`}/>
)

export { Button }