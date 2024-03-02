import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { RewrittenRenderer, type MarkedOpts } from './utils';

/** @description generate basic options */
const genOpts = (async = false, opts: MarkedOpts = {}): MarkedOpts => {
    // options for async Hljs
    const asyncHljs: MarkedOpts = markedHighlight({
        langPrefix: 'hljs language-',
        async: true,
        highlight(code, lang, info) {
            const langStr = lang === info ? info : lang;
            const language = hljs.getLanguage(langStr) ? lang : 'plaintext';
            const { value: result } = hljs.highlight(code, { language });

            // async
            return new Promise<typeof result>((resolve, reject) => {
                if (result) resolve(result);
                else reject('No code parsed');
            });
        },
    });

    // options for sync Hljs
    const syncHljs: MarkedOpts = markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const langStr = lang === info ? info : lang;
            const language = hljs.getLanguage(langStr) ? lang : 'plaintext';
            const { value: result } = hljs.highlight(code, { language });

            return result;
        },
    });

    // basic opts
    const basic: MarkedOpts = {
        async,
        breaks: true,
        renderer: new RewrittenRenderer(),
    };

    if (async) {
        return {
            ...basic,
            ...asyncHljs,
            ...opts,
        };
    }

    return {
        ...basic,
        ...syncHljs,
        ...opts,
    };
};

/**
 * @description to parse markdown async
 * @param mdString markdown string
 * @param opts Options for markdown function
 * @returns parsed markdown
 */
export const parseMarkdownAsync = (mdString: string, opts: MarkedOpts = {}): Promise<string> =>
    marked(mdString, genOpts(true, opts) as MarkedOpts & { async: true });

/**
 * @description to parse markdown
 * @param mdString markdown string
 * @param opts Options for markdown function
 * @returns parsed markdown
 */
export const parseMarkdownSync = (mdString: string, opts: MarkedOpts = {}): string =>
    marked(mdString, genOpts(false, opts));
