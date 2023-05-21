import React, { useCallback } from 'react';

export default function DropdownBlock(props) {

    // passing array as props as props.option received from parent component has to be forcefully pass through
    const options = props.option?.[0] || [];

    const updateValue = useCallback((e) => {
        props.updateParentValue(e.target.value)
    }, [props])


    return (
        <>
            <div>
                <div className="form-floating mb-3">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={updateValue}>
                        {options.map((option, index) => { return (<option key={index} value={option}>{option}</option>) })}
                    </select>
                    <label htmlFor="floatingSelect">{props.label}</label>
                </div >
            </div >
        </>
    );
};