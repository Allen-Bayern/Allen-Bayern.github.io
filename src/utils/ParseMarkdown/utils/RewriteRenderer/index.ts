import { Renderer, marked } from 'marked';
import { copyExcludeKeys } from '../../../ObjectMethods';
import type { MarkedOpts } from '../TypesDefined';

type SuperMarkedOpts = MarkedOpts &
    Partial<{
        className: string;
        classPrefix: string;
    }>;

/** @description rewrite the origin class `Render` */
export class RewrittenRenderer extends Renderer {
    private _className = '';
    private _classPrefix = '';

    constructor(opts?: SuperMarkedOpts) {
        const superOpts = opts ? (copyExcludeKeys(opts, ['className', 'classPrefix'] as const) as MarkedOpts) : void 0;
        super(superOpts);

        // given values to className and classPrefix
        if (opts) {
            const { className, classPrefix } = opts;
            this._className = className ?? '';
            this._classPrefix = classPrefix ?? '';
        }
    }

    // Rewrite the h render
    heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6, raw: string, slugger: marked.Slugger): string {
        // computeClassName
        const hClassName = `class=${this._classPrefix ? `${this._classPrefix}-` : ''}h${level}`;

        if (this.options.headerIds) {
            const id = this.options.headerPrefix + slugger.slug(raw);
            return `<h${level} id="${id}" class="${hClassName}">${text}</h${level}>\n`;
        }

        // ignore IDs
        return `<h${level} class="${hClassName}">${text}</h${level}>\n`;
    }

    // Rewrite the h render
    text(cnt: string) {
        return `<p class="${this._classPrefix}-p">${cnt}</p>`;
    }
}
