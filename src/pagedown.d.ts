
declare module "@nixster/pagedown" {
    
    import { Converter } from 'showdown';
    export { Converter };
    
    // @todo Incomplete types.
    export type HookCollection = any;
    
    export function getSanitizingConverter(): Converter;
    
    export interface TranslateStrings {
        bold: string;
        boldexample: string;
        italic: string;
        italicexample: string;
        link: string;
        linkdescription: string;
        linkdialog: string;
        quote: string;
        quoteexample: string;
        code: string;
        codeexample: string;
        image: string;
        imagedescription: string;
        imagedialog: string;
        olist: string;
        ulist: string;
        litem: string;
        heading: string;
        headingexample: string;
        hr: string;
        undo: string;
        redo: string;
        redomac: string;
        help: string;
    }
    
    export interface HelpButton {
        handler: () => void;
    }
    
    export type EditorOptions = {
        // @todo Incomplete typing.
        helpButton: HelpButton;
        
        // Translation strings.
        strings: TranslateStrings;
    }
    
    export class Editor {
        constructor(converter: Converter, idPostfix?: string, options?: Partial<EditorOptions>);
        
        public hooks: HookCollection;
        
        getConverter(): Converter;
        
        // Only needs to be called once.
        run(): void;
        
        // Only available after run().
        refreshPreview?(): void;
    }
}
