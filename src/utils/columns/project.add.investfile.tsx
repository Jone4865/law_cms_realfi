import { Button, Input } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { ColumnsType } from 'antd/lib/table';
import Upload from 'antd/lib/upload';

type Props = {
  handleInvestChange: (file: UploadFile<any>, index: number) => void | undefined;
  investDeleteClick: (idx: number) => () => void;
  handleTitleChange: (idx: number, key: string, value: string) => void;
  disable?: boolean;
};

export const investfileColumns = ({
  handleInvestChange,
  investDeleteClick,
  handleTitleChange,
  disable,
}: Props): ColumnsType<any> => [
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
    render: (val, _record, index) => {
      return (
        <Input
          disabled={disable}
          value={val}
          onChange={(e) => handleTitleChange(index, 'docs', e.target.value)}
          placeholder="입력해주세요."
        />
      );
    },
  },
  {
    title: '제출 된 파일',
    key: 'name',
    dataIndex: 'file',
    align: 'center',
    render: (val, record, index) => {
      return val ? (
        val?.name
      ) : record?.fileName ? (
        record?.fileName
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
        val &&
        !disable && (
          <Button onClick={investDeleteClick(index)} type="primary">
            삭제
          </Button>
        )
      );
    },
  },
];
