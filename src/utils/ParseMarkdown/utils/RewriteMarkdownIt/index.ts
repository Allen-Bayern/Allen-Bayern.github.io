import MarkdownIt from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import hljs from 'highlight.js';
import { freeze as freezeObj } from 'immer';

type MdItOptions = MarkdownIt.Options;

/** @description default option of this new class */
const realDefaultOpts: MdItOptions = {
    highlight(codeStr, language) {
        if (language && hljs.getLanguage(language)) {
            return hljs.highlight(codeStr, { language }).value;
        }

        return ''; // use external default escaping
    },
    html: true,
    xhtmlOut: true,
};

// to rewrite renderer
const createRenderer = () => {
    const oldRenderer = new Renderer();
    const oldRules = freezeObj(oldRenderer.rules, true);

    oldRenderer.rules = oldRules;
    return oldRenderer;
};

/** @description Extend a new class */
export class RealMarked extends MarkdownIt {
    private _realOpts: MdItOptions = {
        ...realDefaultOpts,
    };

    constructor(opts: MdItOptions = {}) {
        super({
            ...realDefaultOpts,
            ...opts,
        });

        this._realOpts = {
            ...realDefaultOpts,
            ...opts,
        };
    }

    override render<T extends object>(src: string, env?: T): string {
        const realEnv = env || {};
        return createRenderer().render(super.parse(src, realEnv), this._realOpts, realEnv);
    }
}
