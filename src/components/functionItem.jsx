import React, { useRef, useState } from 'react'
import {FaArrowCircleRight} from 'react-icons/fa'
import FunctionCloud from './FunctionCloud';
import { temporaryClass } from '../utils';

function FunctionItem(props) {
    const input = useRef()
    const [result, setResult] = useState('')
    const [state, setState] = useState(0)
    const [children, setChildren] = useState([])

    const startSearch = async () => {
        if (props.item.input && input.current.value.length === 0) {
            temporaryClass(input.current, 'reject-shake', 500)
            setState(0)
        } else {
            setState(1)
            
            const url = props.item.url.includes('https://') ? props.item.url : `https://allpurpose.netlify.app/.netlify/functions/${props.item.url}${input.current?.value ? input.current?.value.replace(' ', '%20') : ''}`
            await fetch(url)
            .then((res) => {
                return props.item.json ? res.json() : res.text()
            }).then((data) => {
                if (props.item.images) {
                    setChildren(
                        props.item.b64 ?
                        [<img key={props.item.name} alt='result' src={`data:image/jpeg;charset=utf-8;base64,${data}`} />]
                        :
                        data.images.map((url) => {
                            return <img key={props.item.name} alt='result' src={url} className='function-cloud-result-image' />
                        })    
                    )
                    return
                }
                
                if (props.item.json) {
                    const rows = []
                    Object.entries(props.item.key ? data[props.item.key] : data).forEach(([key, value]) => {
                        rows.push(<tr><th>{key}</th><td>{value}</td></tr>)
                    })
                    const table = <table>
                        {rows}
                    </table>
                    setChildren([table])
                    return
                }

                setResult(data)
                return
                
            })
            .catch((err) => {
                console.warn(err)
                setResult("Invalid result. Try another query...")
            })
            
            setTimeout(() => setState(2), Math.random() * 1000 + 1000)
        }
    }
            
    return ( 
        <div className="function-item">
            
            <div className="function-item-details">
                <div className='function-item-title'>
                    {props.item.title}
                </div>
                <div className="function-item-description">
                    {props.item.description}
                </div>
            </div>

            <div className={`function-item-execute-button ${props.item.input ? 'has-input' : ''}`}>
                <FaArrowCircleRight onClick={() => {
                    startSearch()
            }} style={{
                    minWidth: '100%',
                    minHeight: '100%'
                }}/>
                { props.item.input && 
                    <input type="text" onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault()
                            startSearch()
                        }
                    }} className='function-item-input'ref={input} placeholder='Search...' />
                }
            </div>

            <FunctionCloud state={state} result={result} cloud={props.cloud} children={children} smallText={props.item.json} used={props.item.used} />
                


        </div>
     );
}

export default FunctionItem;