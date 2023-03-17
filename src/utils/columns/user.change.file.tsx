import { ColumnsType } from 'antd/lib/table';
import { Button } from 'antd';
import { FindManyChangeInvestmentQualificationByAdminOutput } from '../../graphql/generated/graphql';

export const userChangeFileColumns = (): ColumnsType<
  FindManyChangeInvestmentQualificationByAdminOutput['changeInvestmentQualifications'][0]['investmentDocuments'][0]
> => [
  {
    title: 'no',
    key: 'no',
    dataIndex: 'no',
    align: 'center',
    render: (_val, _record, idx) => {
      return idx + 1;
    },
  },
  {
    title: '분류',
    key: 'investmentDocumentCategory',
    dataIndex: 'investmentDocumentCategory',
    align: 'center',
    render(value) {
      return value.name;
    },
  },
  {
    title: '파일 이름',
    key: 'fileName',
    dataIndex: 'fileName',
    align: 'center',
    render(value) {
      return value;
    },
  },
  {
    title: '뷰어',
    key: 'fileName',
    dataIndex: 'fileName',
    align: 'center',
    render(_value) {
      return <Button type="primary">뷰어로 보기</Button>;
    },
  },
  {
    title: '다운로드',
    key: 'fileName',
    dataIndex: 'fileName',
    align: 'center',
    render(value) {
      return <Button type="primary">다운</Button>;
    },
  },
];
