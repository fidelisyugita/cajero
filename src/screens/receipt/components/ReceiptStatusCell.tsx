import React from 'react';

import StatusCard from '../../../components/StatusCard';
import {ReceiptProps} from '../Receipt.type';

function ReceiptStatusCell({data}: {data: ReceiptProps}): JSX.Element {
  return <StatusCard status={data.status} />;
}

export default ReceiptStatusCell;
