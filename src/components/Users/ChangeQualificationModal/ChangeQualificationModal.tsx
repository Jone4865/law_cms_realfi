import { Button, Checkbox, Input, Modal } from 'antd';
import { useState } from 'react';

type Props = {
  visible: boolean;
  reason: string;
  handleCancel: () => void;
  handleClick: (kind: string) => void;
  setReason: React.Dispatch<React.SetStateAction<string>>;
};

export function ChangeQualificationModal({
  visible,
  reason,
  handleCancel,
  handleClick,
  setReason,
}: Props) {
  const [check, setCheck] = useState<string>('');
  const options = [
    '해당 투자자 자격요건에 필요한 서류가 아닙니다.다시 한번 검토 후 제출해 주시기 바랍니다.',
    '서류 상 필수 내용이 부족합니다. 다시 한번 검토 후 제출해 주시기 바랍니다.',
    '제출 서류 간 내용이 불일치 합니다. 다시 한번 검토 후 제출해 주시기 바랍니다.',
    '수동기재',
  ];

  const onChangeHandel = (kind: string) => {
    setCheck(kind);
    if (kind !== '수동기재') {
      setReason(kind);
    } else {
      setReason('');
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={
        <Button
          onClick={() => handleClick('REJECTED')}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          반려
        </Button>
      }
      bodyStyle={{
        maxHeight: '90vh',
        overflow: 'auto',
      }}
      centered
      width={1000}
    >
      <div style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>
        반려사유 선택
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '200px',
        }}
      >
        {options.map((item) => (
          <Checkbox
            style={{ margin: 0 }}
            value={item}
            onChange={(e) => onChangeHandel(e.target.value)}
            checked={item === check ? true : false}
          >
            {item}
          </Checkbox>
        ))}
      </div>
      <div style={{ fontSize: '18px', margin: '20px 0 0', fontWeight: 'bold' }}>반려사유 기재</div>
      <Input
        disabled={check !== '수동기재' && true}
        value={check === '수동기재' ? reason : ''}
        onChange={(e) => setReason(e.target.value)}
        style={{
          height: '300px',
        }}
      />
    </Modal>
  );
}
