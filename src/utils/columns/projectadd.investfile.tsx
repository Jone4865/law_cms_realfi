import { Input } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { ColumnsType } from 'antd/lib/table';
import { UploadChangeParam } from 'antd/lib/upload';

export type InvestfileType = {
  id: number;
  title: string;
  file: string;
};

type Props = {
  setInvestFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  handleProjectimageChange: (info: UploadChangeParam<UploadFile<any>>) => void;
};

export const investfileColumns = ({
  setInvestFileList,
  handleProjectimageChange,
}: Props): ColumnsType<InvestfileType> => [
  {
    title: 'no',
    key: 'length',
    dataIndex: 'length',
    align: 'center',
    render: (val, record, index) => {
      return index + 1;
    },
  },
  {
    title: '제목',
    render: (val) => {
      return <Input placeholder="입력해주세요." />;
    },
    align: 'center',
  },
  {
    title: '제출 된 파일',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
];
