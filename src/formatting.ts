const beautify = require('./js-beautify').js_beautify;

export interface IFormatConfig {
    tabSize: number;
    sortUsingsEnabled: boolean;
    sortUsingsSystemFirst: boolean;
    sortUsingsSplitGroups: boolean;
    styleEnabled: boolean;
    styleNewLineMaxAmount: number;
    styleIndentPreprocessorIgnored: boolean;
}

export interface IResult {
    source?: string;
    error?: string;
}

export const process = (content: string, options: IFormatConfig): IResult => {
    if (options.styleEnabled) {
        const beautifyOptions = {
            brace_style: 'collapse,preserve-inline',
            indent_size: options.tabSize,
            preserve_newlines: true,
            max_preserve_newlines: options.styleNewLineMaxAmount > 0 ? options.styleNewLineMaxAmount : 0,
            jslint_happy: false,
            space_after_anon_function: true,
            space_in_empty_paren: true,
            keep_array_indentation: false,
            e4x: false
        };
        // masking preprocessor directives for beautifier - no builtin support for them.
        content = content.replace(/#(define|if|else|endif)(^\n)*/g, `__vscode_pp__$1$2`);
        content = beautify(content, beautifyOptions);
        // restore masked preprocessor directives.
        content = content.replace(/( *)__vscode_pp__/g, options.styleIndentPreprocessorIgnored ? '#' : '$1#');
    }

    if (options.sortUsingsEnabled) {
        const usingRegex = /(\n? *using\s+[.\w]+;)+/g;
        const trimSemiColon = /^\s+|;\s*$/;
        content = content.replace(usingRegex, (rawBlock: string) => {
            const items = rawBlock.split('\n').filter((l) => l && l.trim().length > 0);
            items.sort((a: string, b: string) => {
                let res = 0;
                // because we keep lines with indentation and semicolons.
                a = a.replace(trimSemiColon, '');
                b = b.replace(trimSemiColon, '');
                if (options.sortUsingsSystemFirst) {
                    if (a.indexOf('System') === 6) { res--; }
                    if (b.indexOf('System') === 6) { res++; }
                    if (res !== 0) {
                        return res;
                    }
                }
                for (let i = 0; i < a.length; i++) {
                    const lhs = a[i].toLowerCase();
                    const rhs = b[i] ? b[i].toLowerCase() : b[i];
                    if (lhs !== rhs) {
                        res = lhs < rhs ? -1 : 1;
                        break;
                    }
                    if (lhs !== a[i]) { res++; }
                    if (rhs !== b[i]) { res--; }
                    if (res !== 0) {
                        break;
                    }
                }
                return res === 0 && b.length > a.length ? -1 : res;
            });
            if (options.sortUsingsSplitGroups) {
                let i = items.length - 1;
                const baseNS = /\s*using\s+(\w+).*/;
                let lastNS = items[i--].replace(baseNS, '$1');
                let nextNS: string;
                for (; i >= 0; i--) {
                    nextNS = items[i].replace(baseNS, '$1');
                    if (nextNS !== lastNS) {
                        lastNS = nextNS;
                        items.splice(i + 1, 0, '');
                    }
                }
            }
            if (rawBlock[0] === '\n') {
                items.unshift('');
            }
            return items.join('\n');
        });
    }

    return { source: content };
};