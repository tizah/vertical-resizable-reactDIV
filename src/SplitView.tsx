import React, {useState, MouseEvent, useEffect, createRef} from "react";
import LeftPanel from "./LeftPanel";
import './SplitView.css';

interface SplitViewProps {
  left: React.ReactElement;
  right: React.ReactElement;
}

export const SplitView: React.FunctionComponent<SplitViewProps> = ({
  left,
  right,
}) => {

    const [leftHeight, setLeftHeight] = useState<undefined | number>(undefined);
    const [separatorYPosition, setSeparatorYPosition] = useState<undefined | number>(undefined);
  const [dragging, setDragging] = useState(false);
  const splitPaneRef = createRef<HTMLDivElement>();

  const MIN_HEIGHT = 50;

  const onMouseDown = (e: MouseEvent) => {
    setSeparatorYPosition(e.clientY);
    setDragging(true);
  };

  const onMouseMove: any = (e: React.MouseEvent) => {
    if (dragging && leftHeight && separatorYPosition) {
      const newLeftHeight = leftHeight + e.clientY - separatorYPosition;
      setSeparatorYPosition(e.clientY);

      if (newLeftHeight < MIN_HEIGHT) {
        setLeftHeight(MIN_HEIGHT);
        return;
      }
      
      if (splitPaneRef.current) {
        const splitPaneHeight = splitPaneRef.current.clientHeight;

        if (newLeftHeight > splitPaneHeight - MIN_HEIGHT) {
          setLeftHeight(splitPaneHeight - MIN_HEIGHT);
          return;
        }
      }
      setLeftHeight(newLeftHeight);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
     document.removeEventListener('mousemove', onMouseMove);
     document.removeEventListener('mouseup', onMouseUp);
    };
  });

  return (
    <div ref={splitPaneRef} className="splitView">
     <LeftPanel leftWidth={leftHeight} setLeftWidth={setLeftHeight}>
        {left}
      </LeftPanel>
      <div className="divider-hitbox" onMouseDown={onMouseDown}>
        <div className="divider"/>
      </div>
      <div className="rightPane">{right}</div>
    </div>
  );
}