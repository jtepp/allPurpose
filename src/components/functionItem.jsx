import React, { useRef, useState } from 'react'
import {FaArrowCircleRight} from 'react-icons/fa'
import FunctionCloud from './FunctionCloud';

function FunctionItem(props) {
    const input = useRef()
    const [result, setResult] = useState("null")
    const [state, setState] = useState(0)

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

            <div className="function-item-execute-button" onClick={() => {
                setState(() => {
                    setTimeout(() => setState(2), 3000)
                    return 1
                })
            }}>
                <FaArrowCircleRight style={{
                    width: '100%',
                    height: '100%'
                }}/>
                { props.item.input && 
                    <input type="text" name="" id="" className='function-item-input' ref={input} placeholder='Search...' />
                }
            </div>

            <FunctionCloud state={state} result={result} cloud={props.cloud} />
                


        </div>
     );
}

export default FunctionItem;