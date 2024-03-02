import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { RewrittenRenderer, type MarkedOpts } from './utils';

/** @description generate basic options */
const genOpts = (async = false, opts: MarkedOpts = {}): MarkedOpts => {
    const renderer = new RewrittenRenderer();
    console.log(renderer);
    // basic opts
    const basic: MarkedOpts = {
        async,
        breaks: true,
        renderer,
    };

    const langPrefix = 'hljs language-';

    if (async) {
        return {
            ...basic,
            // options for async Hljs
            ...(markedHighlight({
                langPrefix,
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
            }) as MarkedOpts),
            ...opts,
        };
    }

    return {
        ...basic,
        // options for sync Hljs
        ...(markedHighlight({
            langPrefix,
            highlight(code, lang, info) {
                const langStr = lang === info ? info : lang;
                const language = hljs.getLanguage(langStr) ? lang : 'plaintext';
                const { value: result } = hljs.highlight(code, { language });

                return result;
            },
        }) as MarkedOpts),
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
