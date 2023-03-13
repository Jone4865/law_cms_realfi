import { ColumnsType } from 'antd/lib/table';
// import { Button } from 'antd';

export type ClassifiType = {
  name: string;
  content: string;
  max: string;
  id: number;
};

export const userClassifiColumns: ColumnsType<ClassifiType> = [
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
    title: '분류명',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '분류 내용',
    key: 'content',
    dataIndex: 'content',
    align: 'center',
  },
  {
    title: '한도',
    key: 'max',
    dataIndex: 'max',
    align: 'center',
  },
  // {
  //   title: '행동',
  //   key: 'do',
  //   dataIndex: 'do',
  //   align: 'center',
  //   render: (val: string, record) => {
  //     return <Button type="primary">삭제</Button>;
  //   },
  // },
];
