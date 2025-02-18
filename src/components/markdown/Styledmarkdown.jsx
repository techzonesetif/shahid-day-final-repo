/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
  import React, { useCallback, useMemo, useState } from 'react';
  import Style from './Markdown.module.css';
  import Markdown from 'react-markdown';
  import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
  import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
  
  const CodeBlock = ({ className, children }) => {
    const [copied, setCopied] = useState(false);
    const language = useMemo(
      () => /language-(\w+)/.exec(className || 'language-bash')?.[1] || 'bash',
      [className]
    );
  
    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 700);
    }, [children]);
  
    return (
      <div className={Style.codeWrapper}>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          PreTag="div"
          className={Style.codeBlock}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
        <button 
          onClick={handleCopy}
          className={Style.copyButton}
          aria-label={copied ? "Code copied" : "Copy code"}
        >
          {copied ? '✅' : '📋'}
          {/* <span style="color:rgb(92, 248, 60)">copied</span> */}
          {/* {copied ?  : 'copie'} */}
        </button>
      </div>
    );
  };
  
  const CustomParagraph = ({ children }) => {
    const processedChildren = useMemo(() => {
      return React.Children.map(children, child => {
        if (typeof child === 'string') {
          const sliderMatch = child.match(/slidermark{(.*?)}/i);
          if (sliderMatch) {
            const srcs = sliderMatch[1].split(',');
            return <Slidermark key={sliderMatch[0]} srcs={srcs} />;
          }
  
          const mcMatch = child.match(/MC{(.*?)}/i);
          if (mcMatch) {
            return <div className={Style.mcContainer}>{child.replace(mcMatch[0], '')}</div>;
          }
        }
        return child;
      });
    }, [children]);
  
    return <p dir="auto">{processedChildren}</p>;
  };
  
  const Slidermark = ({ srcs }) => {
    return (
      <div className={Style.viewer}>
        {srcs.map((e, i) => (
          <ImageWithFallback key={i} src={e} />
        ))}
      </div>
    );
  };
  
  const ImageWithFallback = ({ src }) => {
    const [error, setError] = useState(false);
    const bgColor = useMemo(
      () => `rgb(${Math.random()*150},${Math.random()*150},${Math.random()*150})`,
      []
    );
  
    if (error) {
      return <div className={Style.imageFallback} style={{ backgroundColor: bgColor }} />;
    }
  
    return (
      <img
        src={`https://lh3.googleusercontent.com/d/${src}`}
        onError={() => setError(true)}
        alt="Content preview"
        loading="lazy"
      />
    );
  };
  
  export default function StyledMarkdown({ children }) {
    const components = useMemo(() => ({
      code: CodeBlock,
      p: CustomParagraph,
    }), []);
  
    return (
      <div className={Style.Markdown} dir="auto">
        <Markdown components={components}>
          {children}
        </Markdown>
      </div>
    );
  }