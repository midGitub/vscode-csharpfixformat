[![Marketplace](https://vsmarketplacebadge.apphb.com/version-short/Leopotam.csharpfixformat.svg)](https://marketplace.visualstudio.com/items?itemName=Leopotam.csharpfixformat)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/Leopotam.csharpfixformat.svg)](https://marketplace.visualstudio.com/items?itemName=Leopotam.csharpfixformat)
[![Raiting](https://vsmarketplacebadge.apphb.com/rating-short/Leopotam.csharpfixformat.svg)](https://marketplace.visualstudio.com/items?itemName=Leopotam.csharpfixformat)
[![GitHub issues](https://img.shields.io/github/issues/Leopotam/vscode-csharpfixformat.svg)](https://github.com/Leopotam/vscode-csharpfixformat/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Leopotam/vscode-csharpfixformat/master/LICENSE)

# CSharpFixFormat for Visual Studio Code
This extension helps to format C# code. When OmniSharp will support all features - will be deprecated.

## Dependencies
This extension not dependent on any 3dparty extensions (even omnisharp) and works as standalone formatting solution for current C#-file.

## Features
All features available through standard "format document" hotkey after opening C# file.
  * Sort usings in alphabetical order. Doubles will be removed automatically.
  * Fix indent size for all lines (omnisharp still cant do it for wrapped lines).
  * Cleanup empty lines with allowed limit in row.

> Extension provides formatting in batch mode through folder context menu at explorer window.

## Extension Settings
* `csharpfixformat.sort.usings.enabled`: Should usings be sorted or not. True by default.
* `csharpfixformat.sort.usings.systemFirst`: Put System.xxx namespaces first at usings list on sorting. True by default.
* `csharpfixformat.sort.usings.splitGroups`: Insert blank line between using blocks grouped by first part of namespace. False by default.
* `csharpfixformat.style.enabled`: Enable code reformat with style options. True by default.
* `csharpfixformat.style.newline.maxAmount`: Amount of new line (\\n) symbols allowed in row. 1 means no blank lines, 0 for disable. 2 by default.
* `csharpfixformat.style.indent.preprocessorIgnored`: Should preprocessor directives ignore indentation or use it. True by default.
* `csharpfixformat.style.indent.regionIgnored`: Should #region / #endregion directives ignore indentation or use it. False by default.
* `csharpfixformat.style.braces.onSameLine`: Should open braces be kept on expression line (K&R style) or on new line. True by default.
* `csharpfixformat.style.braces.allowInlines`: Allow expressions inside braces at one line. True by default.
* `csharpfixformat.style.spaces.beforeParenthesis`: Space before '(' - opening parenthesis. True by default.
* `csharpfixformat.style.spaces.afterParenthesis`: Space after ')' - closing parenthesis. True by default.
* `csharpfixformat.style.spaces.beforeIndexerBracket`: Override spaces.beforeBracket rule for indexer sequence 'this['. True by default.
* `csharpfixformat.style.spaces.beforeBracket`: Space before '[' - opening bracket. False by default.
* `csharpfixformat.style.spaces.afterBracket`: Space after ']' - closing bracket. True by default.
* `csharpfixformat.style.spaces.insideEmptyParenthis`: Space inside '()' - empty parenthis. False by default.
* `csharpfixformat.style.spaces.insideEmptyBraces`: Space inside '{}' - empty braces. True by default.
* `csharpfixformat.style.spaces.insideEmptyBrackets`: Space inside '[]' - empty brackets. False by default.


## Special flags
Formatting can be ignored for any code with wrapping to directives:
```
/* fixformat ignore:start */
var test    =        i().  willNotBeFormatted     []   ;
/* fixformat ignore:end */
```


## Known issues
### Multilined constrained generics not supported:
```
class<T>
    where T : class
{
}
```
*Suggestion* - put constraints on one line:
```
class<T> where T : class
{
}
```
---
### Multiline initialization for new instance as parameter for method will not be formatted correctly:
```
TestMethod (new TestClass {
    a = 10,
        b = 20
});
```
*Suggestion* - split variable declaration and method calling:
```
var t = new TestClass {
    a = 10,
    b = 20
};
TestMethod (t);
```
---
### Initialization with nested "{ }" can be formatted wrong:
*Expected:*
```
new System.Collections.Generic.Dictionary<string, string>() {
    { "", "" },
    { "", "" },
    { "", "" },
};
```
*Actual:*
```
new System.Collections.Generic.Dictionary<string, string>()	{
    { "", "" }, { "", "" }, { "", "" },
};
```
*Suggestion* - add comment for each item in initialization:
```
new System.Collections.Generic.Dictionary<string, string>() {
    // Item 1 description.
    { "", "" },
    // Item 2 description.
    { "", "" },
    // Item 3 description.
    { "", "" },
};
```
## Installation of release version
Use instructions from marketplace.


## Installation from sources
1. Install node.js.
2. Run "npm install" from project folder.
3. Run "npm run package" from project folder.
4. Install brand new packed *.vsix bundle through vscode plugins menu option "Install from VSIX".