import { ColumnsType } from 'antd/lib/table';
import { Button } from 'antd';
import { FindManyChangeInvestmentQualificationByAdminOutput } from '../../graphql/generated/graphql';

type Props = {
  downloadHandle: (fileName: string) => void;
};

export const userChangeFileColumns = ({
  downloadHandle,
}: Props): ColumnsType<
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
    render(value) {
      return (
        <Button type="primary">
          <a href={`http://localhost:3000/investment-document?name=${value}`} target="_blank">
            뷰어로 보기
          </a>
        </Button>
      );
    },
  },
  {
    title: '다운로드',
    key: 'fileName',
    dataIndex: 'fileName',
    align: 'center',
    render(value) {
      return (
        <Button onClick={() => downloadHandle(value)} type="primary">
          다운
        </Button>
      );
    },
  },
];
