import React from 'react'
import { BiLoader } from 'react-icons/bi'
import { icons } from './home'


function FunctionCloud(props) {
    return (  
        <div className={`function-cloud ${props.state === 2 ? 'function-cloud-show-result' : ''}`}>
            <div className={`function-cloud-main ${props.state === 1 ? 'cloud-pulsing' : ''}`}>
                <img src={props.cloud} className='cloud-img' alt="" />
                { props.state === 1 &&
                    <BiLoader className='function-cloud-loader' />
                }
                    <div className="function-cloud-used-images-container">
                        {props.used.map((name) => 
                            <img src={icons[name]} key={name} className='function-cloud-used-image' alt="" srcset="" />
                        )}
                    </div>
            </div>
            <p className={`function-cloud-result ${props.smallText ? 'small-text' : ''}`}>
                { props.result }
                { props.children.length > 0 ?
                    <div className="function-cloud-result-image-container">
                        {props.children}
                    </div>
                : null }
            </p>
        </div>
    );
}

export default FunctionCloud;