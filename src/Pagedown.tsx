
import * as React from 'react';
import { useRef, useMemo, useLayoutEffect } from 'react';
import { Converter } from 'showdown';
import { getSanitizingConverter, Editor } from '@nixster/pagedown';

export type PagedownProps = {
    className?: string;
    disabled?: boolean;
    name?: string;
    defaultValue?: string;
    onUpdate?: (value: string) => void;
    converter?: Converter;
}

export function Pagedown(props: PagedownProps) {
    const editor = useRef<Editor>();
    const element = useRef<HTMLTextAreaElement | null>(null);
    
    const postfix = useMemo(generatePostfix, []);
    
    useLayoutEffect(() => {
        const converter = props.converter || getSanitizingConverter();
        editor.current = new Editor(converter, postfix);
        editor.current.run();
    }, []);
    
    // @todo This probably doesn't trigger on button actions, dialogs, etc.
    // @todo We should do some debouncing here as we're listening to all
    // keyup, change and input events.
    function onAction() {
        if (props.onUpdate && element.current) {
            props.onUpdate(element.current.value);
        }
    }
    
    return (
        <div className={"wmd-panel " + props.className}>
            <div
                id={"wmd-button-bar" + postfix}
                className="wmd-button-row"
            />
            <textarea
                ref={element}
                id={"wmd-input" + postfix}
                className="wmd-input"
                name={props.name}
                disabled={props.disabled}
                onInput={onAction}
                onChange={onAction}
                onKeyUp={onAction}
                defaultValue={props.defaultValue}
            />
            <div
                id={"wmd-preview" + postfix}
                className="wmd-preview content"
            />
        </div>
    )
}

function randomWithin(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function generatePostfix() {
    return "-" + Math.floor(randomWithin(10000, 99999)).toString(16);
}
