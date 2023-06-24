import React from 'react'

function FunctionItem(props) {
    return ( 
        <div className="function">
            {props.title}

            {/* show input terminal (with big send button below) 
                after sending, show progress going to cloud, where it loads and computes,
                then returns with the result

                small window with the description next to it
            */}


        </div>
     );
}

export default FunctionItem;