import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaClipboardCheck, FaRegClipboard } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function getStringFromChildren(children: any) {
  if(typeof children === 'string') {
    return children;
  } else if (children instanceof Array){
    return children.map(child => typeof child === 'string' ? child : getStringFromChildren(child.props.children)).join('');
  } else {
    if (children == undefined) {
      return '';
    }
    if (children.props.children !== undefined) {
      return getStringFromChildren(children.props.children);
    } else {
      return '';
    }
  }
}

function makeTimer(callback: () => void) {
  var myInterval = setInterval(function(){
    callback();
    clearInterval(myInterval);
},650);
}

function getLanguage(className: string) : string {
  return className?.match(/(?<=language-)(\w.*?)\b/) != null
  ? className.match(/(?<=language-)(\w.*?)\b/)[0]
  : null;

}

const CustomCodeBlock = (props) => {
  const [isCopied, setIsCopied] = useState(false);

  const { className, copy, children, showLineNumbers, wrapLongLines } = props;

  if(typeof children === 'string') {
    return (<code>{children}</code>);
  } else {

  const language = getLanguage(className) ?? getLanguage(children.props.className);

  const code = getStringFromChildren(children);

  return (<div>
  { copy ? 
    <div className="parentDiv">
    <SyntaxHighlighter 
      language={language} 
      style={materialOceanic}
      wrapLongLines={wrapLongLines}
      showLineNumbers={showLineNumbers}>
        {code}
    </SyntaxHighlighter>
    <CopyToClipboard
      onCopy={() => { 
        setIsCopied(true);
        makeTimer(() => setIsCopied(false));
      }}
      className="copyButton"
      text={code}>
      <button type="button" aria-label="Copy to Clipboard Button">
        {isCopied ? 
        <FaClipboardCheck color="#f2ff00" fontSize="1.25em" /> : 
        <FaRegClipboard color="white" fontSize="1.25em" />}
      </button>
    </CopyToClipboard>
    </div> 
    :
    <SyntaxHighlighter 
      language={language} 
      style={materialOceanic}
      wrapLongLines={wrapLongLines}
      showLineNumbers={showLineNumbers}>
        {code}
    </SyntaxHighlighter> 
  }
  </div>);  
  }
};

CustomCodeBlock.defaultProps = {
  showLineNumbers: false,
  wrapLongLines: false,
  copy: false,
}

export default CustomCodeBlock;
