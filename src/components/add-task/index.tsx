import React, { useRef } from 'react';

interface IProps {
    callBack: (value: string) => void;
}

export default function (props: IProps) {
    let inputRef = useRef(null);
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={() => {
                const { callBack } = props;
                if (typeof callBack === "function") {
                    if (inputRef) {
                        const current: HTMLInputElement = inputRef.current;
                        if (typeof current === "object" && current !== null) {
                            console.dir(current);
                            console.dir(current.value);                            
                        }
                    }
                }
            }}
            >
                Add.
            </button>
        </div>
    )
}