import { Button } from 'antd';
import * as S from '../style';
import { InputBasic } from '../InputBasic/InputBasic';
import { InputDate } from '../InputDate/InputDate';

type Props = {
  handleChange: (key: string, value: any) => void;
  variables: any;
  submitHandle: () => void;
};

export function CollusionInfo({ handleChange, variables, submitHandle }: Props) {
  return (
    <>
      <S.AddTitle style={{ marginTop: '15px' }}>공모정보</S.AddTitle>
      <InputBasic
        saveName="tansName"
        handleChange={handleChange}
        title="TABS 명칭"
        disable={true}
        value={variables['name']}
      />
      <InputBasic
        saveName="totalPublicOfferingAmount"
        value={+variables['totalPublicOfferingAmount']}
        handleChange={handleChange}
        title="공모총액(원)"
      />
      <InputBasic
        saveName="publicOfferingPrice"
        value={+variables['publicOfferingPrice']}
        handleChange={handleChange}
        title="공모가(원/TABS)"
      />
      <InputBasic
        saveName="publicOfferingQuantity"
        value={+variables['publicOfferingQuantity']}
        handleChange={handleChange}
        title="모집수량(TABS)"
      />
      <InputBasic
        saveName="issuer"
        value={variables['issuer']}
        handleChange={handleChange}
        title="발행"
      />
      <InputDate
        handleChange={handleChange}
        titles={['시작일', '종료일']}
        title="공모기간"
        saveNames={['publicOfferingStartedAt', 'publicOfferingEndedAt']}
        values={[variables['publicOfferingStartedAt'], variables['publicOfferingEndedAt']]}
      />
      <InputDate
        titles={['시작시간', '종료시간', '공모종료시간']}
        timePicker={true}
        disable={true}
        title="공모시간"
      />
      <InputDate
        titles={['배정공지일', '배정일', '입고일', '상장일']}
        title="TABS 예정일"
        handleChange={handleChange}
        saveNames={['', 'allocationDate', 'receivingDate', 'listedDate']}
        values={[
          variables[''],
          variables['allocationDate'],
          variables['receivingDate'],
          variables['listedDate'],
        ]}
      />
      <InputDate
        titles={['환불일']}
        title="환불일자"
        essential={false}
        handleChange={handleChange}
      />
      <Button onClick={() => submitHandle()} type="primary" style={{ marginLeft: '250px' }}>
        등록완료
      </Button>
    </>
  );
}
