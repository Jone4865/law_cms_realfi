import { Button, Input } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { ColumnsType } from 'antd/lib/table';
import Upload from 'antd/lib/upload';
import { DocInCreateProjectByAdminArgs } from '../../graphql/generated/graphql';

type Props = {
  handleInvestChange: (file: UploadFile<any>, index: number) => void | undefined;
  investDeleteClick: (idx: number) => () => void;
};

export const investfileColumns = ({
  handleInvestChange,
  investDeleteClick,
}: Props): ColumnsType<DocInCreateProjectByAdminArgs> => [
  {
    title: 'no',
    key: 'no',
    align: 'center',
    render: (_val, _record, index) => index + 1,
  },
  {
    title: '제목',
    key: 'title',
    dataIndex: 'name',
    align: 'center',
    render: (val) => {
      return <Input placeholder="입력해주세요." value={val} />;
    },
  },
  {
    title: '제출 된 파일',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
    render: (val, _record, index) => {
      return val ? (
        val
      ) : (
        <Upload
          showUploadList={false}
          onChange={({ file }) => handleInvestChange(file, index)}
          beforeUpload={() => false}
        >
          <Button type="primary">파일 추가</Button>
        </Upload>
      );
    },
  },
  {
    key: 'delete',
    align: 'center',
    dataIndex: 'name',
    render: (val, _record, index) => {
      return (
        val && (
          <Button onClick={investDeleteClick(index)} type="primary">
            삭제
          </Button>
        )
      );
    },
  },
];
