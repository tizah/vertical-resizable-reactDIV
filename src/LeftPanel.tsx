import React, {useState, createRef} from 'react';

const LeftPanel: React.FunctionComponent<{
    leftWidth: number | undefined;
    setLeftWidth: (value: number) => void;
  }> = ({ children, leftWidth, setLeftWidth }) => {
  
    const leftRef = createRef<HTMLDivElement>();

    React.useEffect(() => {
        if (leftRef.current) {
          if (!leftWidth) {
            setLeftWidth(leftRef.current?.clientWidth);
            return;
          }
    
          leftRef.current.style.height = `${leftWidth}px`;
        }
      }, [leftRef, leftWidth, setLeftWidth]);

    return <div ref={leftRef}>{children}</div>;
  };

  export default LeftPanel;