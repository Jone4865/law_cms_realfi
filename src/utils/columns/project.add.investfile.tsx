import { Button, Input } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { ColumnsType } from 'antd/lib/table';
import Upload from 'antd/lib/upload';
import { DocInCreateProjectByAdminArgs } from '../../graphql/generated/graphql';

type Props = {
  handleDeleteFile: (idx: number, key: string) => void;
  handleTitleChange: (idx: number, key: string, value: string) => void;
  handleFileChange: (
    file: UploadFile<DocInCreateProjectByAdminArgs>,
    index: number,
    key: string,
  ) => void;
  isFix: boolean;
  docs?: boolean;
  disable?: boolean;
};

export const investfileColumns = ({
  handleDeleteFile,
  handleTitleChange,
  handleFileChange,
  isFix,
  disable,
  docs,
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
    render: (val, record, index) => {
      return (
        <Input
          disabled={disable || record?.file?.name || record?.fileName}
          value={val}
          onChange={(e) =>
            handleTitleChange(index, docs ? 'docs' : 'officialInfos', e.target.value)
          }
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
      ) : record?.name ? (
        <Upload
          showUploadList={false}
          onChange={({ file }) => handleFileChange(file, index, docs ? 'docs' : 'officialInfos')}
          beforeUpload={() => false}
        >
          <Button type="primary">파일 추가</Button>
        </Upload>
      ) : (
        '파일 제목을 입력해주세요.'
      );
    },
  },
  {
    key: 'delete',
    align: 'center',
    dataIndex: 'fileName',
    render: (val, record, index) => {
      return (
        (isFix ? val : record?.file?.name) &&
        !disable && (
          <Button
            onClick={() => handleDeleteFile(index, docs ? 'docs' : 'officialInfos')}
            type="primary"
          >
            삭제
          </Button>
        )
      );
    },
  },
];
