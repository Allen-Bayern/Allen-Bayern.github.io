import MarkdownIt from 'markdown-it';
import frontMatter from 'markdown-it-front-matter';
import { sanitize } from 'dompurify';
import { RealMarked } from './utils';
import { copyExcludeKeys } from '../ObjectMethods';

interface ParseMdOpts extends MarkdownIt.Options {
    onParseFrontMeta?(fm: string): void;
}

/**
 * @description to render markdown string
 * @param mdString markdown string
 * @param selfDefineOpts options
 * @returns render result
 */
export const renderMarkdown = (mdString: string, selfDefineOpts: ParseMdOpts = {}): string => {
    const {
        onParseFrontMeta = fm => {
            console.log(fm);
        },
    } = selfDefineOpts;
    const opts = copyExcludeKeys(selfDefineOpts, ['onParseFrontMeta'] as const);

    return sanitize(new RealMarked(opts).use(frontMatter, onParseFrontMeta).render(mdString));
};

/**
 * @description to render markdown string async
 * @param mdString markdown string
 * @param selfDefineOpts options
 * @returns render result
 */
export const renderMarkdownAsync = (mdString: string, selfDefineOpts: ParseMdOpts = {}) => {
    const {
        onParseFrontMeta = fm => {
            console.log(fm);
        },
    } = selfDefineOpts;
    const opts = copyExcludeKeys(selfDefineOpts, ['onParseFrontMeta'] as const);
    // create a renderer
    const mdRenderer = new RealMarked(opts).use(frontMatter, onParseFrontMeta);

    return new Promise<string>((resolve, reject) => {
        const renderedHtml = sanitize(mdRenderer.render(mdString));
        if (renderedHtml) {
            resolve(renderedHtml);
        } else {
            reject('Empty markdown file input');
        }
    });
};
