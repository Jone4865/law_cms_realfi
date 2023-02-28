import { useLazyQuery } from '@apollo/client';
import { Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import { FIND_MANY_DIVIDEND_ADMIN } from '../../graphql/query';

type Props = {
  visible: boolean;
  handleCancel: () => void;
  projectDividendId: number;
};

export function DividendListModal({ visible, handleCancel, projectDividendId }: Props) {
  const [searchText, setSearchText] = useState('');
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);

  const [findManyDividendByAdmin] = useLazyQuery(FIND_MANY_DIVIDEND_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {},
  });

  useEffect(() => {
    findManyDividendByAdmin({ variables: { projectDividendId, searchText, skip, take } });
  }, []);

  return (
    <Modal open={visible} onCancel={handleCancel} width={600} closable centered>
      <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '30px' }}>배당 상세</p>
    </Modal>
  );
}
