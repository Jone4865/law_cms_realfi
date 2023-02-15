import { Button } from 'antd';
import * as S from './../style';
import { ProjectAddBasicInput } from '../ProjectAddBasicInput/ProjectAddBasicInput';
import { ProjectAddDateInput } from '../ProjectAddDateInput/ProjectAddDateInput';

type Props = {
  handleChange: (key: string, value: any) => void;
  variables: any;
  submitHandle: () => void;
};

export function ProjectAddCollusionInfo({ handleChange, variables, submitHandle }: Props) {
  return (
    <>
      <S.AddTitle style={{ marginTop: '15px' }}>공모정보</S.AddTitle>
      <ProjectAddBasicInput
        saveName="tansName"
        handleChange={handleChange}
        title="TABS 명칭"
        disable={true}
        value={variables['name']}
      />
      <ProjectAddBasicInput
        saveName="totalPublicOfferingAmount"
        value={variables['totalPublicOfferingAmount']}
        handleChange={handleChange}
        title="공모총액(원)"
      />
      <ProjectAddBasicInput
        saveName="publicOfferingPrice"
        value={variables['publicOfferingPrice']}
        handleChange={handleChange}
        title="공모가(원/TABS)"
      />
      <ProjectAddBasicInput
        saveName="publicOfferingQuantity"
        value={variables['publicOfferingQuantity']}
        handleChange={handleChange}
        title="모집수량(TABS)"
      />
      <ProjectAddBasicInput
        saveName="issuer"
        value={variables['issuer']}
        handleChange={handleChange}
        title="발행"
      />
      <ProjectAddDateInput
        handleChange={handleChange}
        titles={['시작일', '종료일']}
        title="공모기간"
        saveNames={['publicOfferingStartedAt', 'publicOfferingEndedAt']}
        values={[variables['publicOfferingEndedAt'], variables['publicOfferingEndedAt']]}
      />
      <ProjectAddDateInput
        titles={['시작시간', '종료시간', '공모종료시간']}
        timePicker={true}
        disable={true}
        title="공모시간"
        // value={variables['publicOfferingEndedAt']}
      />
      <ProjectAddDateInput
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
      <ProjectAddDateInput
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
