import React, {ReactNode, memo} from 'react';

interface ConditionalRenderProps {
  condition: boolean;
  children: ReactNode;
}

function ConditionalRender({
  children,
  condition,
}: ConditionalRenderProps): JSX.Element {
  if (!condition) {
    return <>{null}</>;
  }

  return <>{children}</>;
}

export default memo(ConditionalRender);
