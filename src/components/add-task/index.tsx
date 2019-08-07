import React, { useRef } from 'react';
import ITask from '../../interfaces/ITask';

interface IProps {
    callBack: (taskName: string) => void;
}

export default function (props: IProps) {
    let inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={() => {
                const { callBack } = props;
                if (typeof callBack === "function") {
                    if (inputRef) {
                        const {current} = inputRef;
                        if (typeof current === "object" && current !== null) {
                           const {value} = current;
                           callBack(value);                       
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