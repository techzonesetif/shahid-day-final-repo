/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import Style from './Markdown.module.css'
import { useEffect,useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';





import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'

import ReactDOM from 'react-dom/client'




export default function Styledmarkdown({children}){
  const markdown = useRef(null);
  const [markdo,setMarkdo]=useState('')
useEffect(()=>{
      let code=document.querySelectorAll('.code')
      setMarkdo(markdown.current.classList[0])
      // console.log(markdo)
      code.forEach((ele)=>{
        ele.style.position="relative"
        ele.innerHTML += `<span class="${Style.Copie}">copie<span>`;
        ele.childNodes[1].addEventListener('click', function () {
          navigator.clipboard.writeText(ele.childNodes[0].innerText)
          ele.childNodes[1].innerHTML = `<span style="color:rgb(92, 248, 60)">copied<span>`
          setTimeout(()=>ele.childNodes[1].innerHTML = `copie`,700)
        }) 
      })
},[])

useEffect(()=>{
if (markdo) {
  let content=document.querySelectorAll(`.${markdo} > *`)
  content.forEach((e)=>{ e.setAttribute("dir", "auto");})
  content.forEach((e)=>{  
   
    if ( e.tagName =='P') {
if (e.innerText.includes("slidermark{")) {
  e.setAttribute("markcalss", e.innerText.match(/slidermark{(.*?)}/i)[1] )
  let rea=e.innerText.match(/slidermark{(.*?)}/i)[1].split(',')
  ReactDOM.createRoot(e).render(<Slidermark srcs={rea}/>)
}
}
    if ( e.tagName =='P') {
if (e.innerText.includes("MC{")) {
  e.setAttribute("markcalss", e.innerText.match(/MC{(.*?)}/i)[1] )
 e.innerText= e.innerText.replace(/MC{.*}/,'' )
}
}
  })
}
},[markdo,children])


return(
  <div   ref={markdown}    className={Style.Markdown}  >

  <Markdown 
  contentEditable="true"
    children={children}
    components={{
      code(props) {
        const {children, className, ...rest} = props
        const match = /language-(\w+)/.exec(className?className:'language-bash' )
        return match ? (
        <SyntaxHighlighter 
        className="code"

            {...rest}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            // style={docco}
            style={vscDarkPlus}
            
        />
        ) : (
        <code    {...rest} className={className}>
            {children}
        </code>
        )
      }
    }}
    
  />
  </div>
)
}





  function Slidermark({srcs}){
  return(
    <>
      <div className={Style.viewer} >
      {srcs.map((e,i)=><img
                        key={i} src={`https://lh3.googleusercontent.com/d/${e}`} 
                        onError={(e)=>{
                          // e.currentTarget.src='/6348321.jpg';
                          e.currentTarget.style=`
                        background-color: rgb(${Math.random()*150},${Math.random()*150},${Math.random()*150});
                          `
                          e.currentTarget.onerror=null;
                        }}
                        />)}
      </div>

    </>
  )
  
  }