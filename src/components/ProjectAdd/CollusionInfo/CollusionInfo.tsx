import { Button, notification } from 'antd';
import * as S from '../style';
import { InputBasic } from '../InputBasic/InputBasic';
import { InputDate } from '../InputDate/InputDate';
import moment from 'moment';
import { useLazyQuery } from '@apollo/client';
import { FIND_MANY_COMPANY_DATA } from '../../../graphql/query/findCompanyData';
import { useEffect, useState } from 'react';
import { FindCompanyDataQuery } from '../../../graphql/generated/graphql';

type Props = {
  variables: any;
  handleChange: (key: string, value: any) => void;
  submitHandle: () => void;
  isFix?: boolean;
};

export function CollusionInfo({ isFix, variables, submitHandle, handleChange }: Props) {
  const [times, setTimes] = useState<FindCompanyDataQuery['findCompanyData']>();
  const [findCompanyData] = useLazyQuery(FIND_MANY_COMPANY_DATA, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTimes({ ...data.findCompanyData });
    },
  });

  useEffect(() => {
    findCompanyData();
  }, []);

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
        values={
          isFix
            ? [
                moment(variables['publicOfferingStartedAt']),
                moment(variables['publicOfferingEndedAt']),
              ]
            : []
        }
      />
      <InputDate
        titles={['시작시간', '종료시간', '공모종료일 종료시간']}
        timePicker={true}
        disable={true}
        title="공모시간"
        values={[
          moment(`2022-01-01 ${times?.publicOfferingStartHour}`),
          moment(`2022-01-01 ${times?.publicOfferingEndHour}`),
          moment(`2022-01-01 ${times?.publicOfferingFinalHour}`),
        ]}
      />
      <InputDate
        titles={['배정공지일', '배정일', '입고일', '상장일']}
        title="TABS 예정일"
        handleChange={handleChange}
        saveNames={['publicOfferingEndedAt', 'allocationDate', 'receivingDate', 'listedDate']}
        values={
          isFix
            ? [
                moment(variables['publicOfferingEndedAt']),
                moment(variables['allocationDate']),
                moment(variables['receivingDate']),
                moment(variables['listedDate']),
              ]
            : []
        }
      />
      <InputDate
        titles={['환불일']}
        title="환불일자"
        essential={false}
        handleChange={handleChange}
        disable={true}
        values={isFix ? [moment(variables['publicOfferingEndedAt']).add(3, 'days')] : []}
      />
      <Button onClick={() => submitHandle()} type="primary" style={{ marginLeft: '250px' }}>
        {isFix ? '수정완료' : '등록완료'}
      </Button>
    </>
  );
}
