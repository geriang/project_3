import React, { useCallback } from 'react'
import { NumericFormat } from "react-number-format";

export default function NumberBlock(props) {

    const updateValue = useCallback((values) =>{
        const {floatValue} = values 
        props.updateParentValue(floatValue)
        
    },[props])

    return (
        <>
            <div>
                <div className="form-floating mb-3">
                    <NumericFormat className="form-control" id="floatingInput" placeholder="demo" prefix={props.prefix} suffix={props.suffix} thousandSeparator="," onValueChange={updateValue} />
                    <label htmlFor="floatingInput">{props.label}</label>
                    
                </div>
            </div>

        </>
    )
}