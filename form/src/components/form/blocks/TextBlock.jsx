import React, { useCallback } from 'react'

export default function TextBlock(props) {

    const updateValue = useCallback((e) => {
        props.updateParentValue(e.target.value)
    }, [props])

    return (
        <>
            <div>
                <div className="form-floating mb-3">
                    <input type={props.type} className="form-control" id="floatingInput" placeholder="demo" onChange={updateValue} />
                    <label htmlFor="floatingInput">{props.label}</label>
                </div>
            </div>

        </>
    )
}