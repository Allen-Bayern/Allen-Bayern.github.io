import MarkdownIt from 'markdown-it';
import { sanitize } from 'dompurify';
import { RealMarked } from './utils';

type MdItOptions = MarkdownIt.Options;

/**
 * @description to render markdown string
 * @param mdString markdown string
 * @param selfDefineOpts options
 * @returns render result
 */
export const renderMarkdown = (mdString: string, selfDefineOpts: MdItOptions = {}): string => {
    return sanitize(new RealMarked(selfDefineOpts).render(mdString));
};

/**
 * @description to render markdown string async
 * @param mdString markdown string
 * @param selfDefineOpts options
 * @returns render result
 */
export const renderMarkdownAsync = (mdString: string, selfDefineOpts: MdItOptions = {}) => {
    // create a renderer
    const mdRenderer = new RealMarked(selfDefineOpts);

    return new Promise<string>((resolve, reject) => {
        const renderedHtml = sanitize(mdRenderer.render(mdString));
        if (renderedHtml) {
            resolve(renderedHtml);
        } else {
            reject('Empty markdown file input');
        }
    });
};
