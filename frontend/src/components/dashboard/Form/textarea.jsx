import { useEffect } from 'react'

function Textarea() {
 
/* AutoHeight Textarea */
  useEffect(() => {
    let textarea = document.getElementById('post--content')
    textarea.addEventListener('keyup', function(){
      this.style.height = "1px";
      this.style.height = (25+this.scrollHeight)+"px";
    })
  })

  return (
    <>
        <textarea id="post--content" placeholder="Quoi de neuf aujourd'hui?"></textarea>
    </>
  )
}
  
export default Textarea;