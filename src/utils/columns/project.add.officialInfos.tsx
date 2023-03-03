import { Button, Input } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { ColumnsType } from 'antd/lib/table';
import Upload from 'antd/lib/upload';
import { DocInCreateProjectByAdminArgs } from '../../graphql/generated/graphql';

type Props = {
  handleOfficialInfosChange: (file: UploadFile<any>, index: number) => void | undefined;
  officialInfosDeleteClick: (idx: number) => () => void;
  handleTitleChange: (idx: number, key: string, value: string) => void;
};

export const officialInfosColumns = ({
  handleOfficialInfosChange,
  officialInfosDeleteClick,
  handleTitleChange,
}: Props): ColumnsType<DocInCreateProjectByAdminArgs> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render: (_val, _record, index) => index + 1,
  },
  {
    title: '제목',
    key: 'name',
    align: 'center',
    render: (_val, _record, index) => {
      return (
        <Input
          onChange={(e) => handleTitleChange(index, 'officialInfos', e.target.value)}
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
    render: (val, _record, index) => {
      return val ? (
        val.name
      ) : (
        <Upload
          showUploadList={false}
          onChange={({ file }) => handleOfficialInfosChange(file, index)}
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
          <Button onClick={officialInfosDeleteClick(index)} type="primary">
            삭제
          </Button>
        )
      );
    },
  },
];
