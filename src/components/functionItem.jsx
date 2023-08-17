import React, { useRef, useState } from 'react'
import {FaArrowCircleRight} from 'react-icons/fa'
import FunctionCloud from './FunctionCloud';
import { temporaryClass } from '../utils';

function FunctionItem(props) {
    const input = useRef()
    const [result, setResult] = useState('')
    const [state, setState] = useState(0)
    const [images, setImages] = useState([])

    const startSearch = async () => {
        if (props.item.input && input.current.value.length === 0) {
            temporaryClass(input.current, 'reject-shake', 500)
            setState(0)
        } else {
            setState(1)
            
            const url = props.item.url.includes('https://') ? props.item.url : `https://allpurpose.netlify.app/.netlify/functions/${props.item.url}${input.current?.value ? input.current?.value.replace(' ', '%20') : ''}`
            console.log(url)

            await fetch(url)
            .then((res) => {
                return (props.item.images && !props.item.b64) ? res.json() : res.text()
            }).then((data) => {
                console.log(data)
                if (!props.item.images) {
                    setResult(data)
                    return
                }
                
                setImages(
                    props.item.b64 ?
                    [<img alt='result' src={`data:image/jpeg;charset=utf-8;base64,${data}`} />]
                    :
                    data.images.map((url) => {
                        return <img alt='result' src={url} className='function-cloud-result-image' />
                    })
                
                )
            })
            .catch((err) => {
                console.warn(err)
                setResult("Invalid result. Try another query...")
            })
            
            setTimeout(() => setState(2), 2000)
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

            <div className="function-item-execute-button">
                <FaArrowCircleRight onClick={() => {
                    startSearch()
            }} style={{
                    width: '100%',
                    height: '100%'
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

            <FunctionCloud state={state} result={result} cloud={props.cloud} images={images} />
                


        </div>
     );
}

export default FunctionItem;