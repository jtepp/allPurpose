import React from 'react'
import { BiLoader } from 'react-icons/bi'

function FunctionCloud(props) {
    return (  
        <div className={`function-cloud ${props.state === 2 ? 'function-cloud-show-result' : ''}`}>
            <div className={`function-cloud-main ${props.state === 1 ? 'cloud-pulsing' : ''}`}>
                <img src={props.cloud} alt="" />
                { props.state === 1 &&
                    <BiLoader className='function-cloud-loader' />
                }
            </div>
            <p className="function-cloud-result">
                { props.result }
                { props.images.length > 0 ?
                    <div className="function-cloud-result-image-container">
                        {props.images}
                    </div>
                : null }
            </p>
        </div>
    );
}

export default FunctionCloud;