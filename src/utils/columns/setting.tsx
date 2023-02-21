import { DatePicker, Image, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export type SettingType = {
  id: number;
  location: string;
  date: Date;
  url: string;
  image: string;
};

type Props = {
  setEndDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  setStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  startDate: moment.Moment;
  endDate: moment.Moment;
};

export const SettingColumns = ({
  endDate,
  setEndDate,
  setStartDate,
  startDate,
}: Props): ColumnsType<SettingType> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '위치',
    key: 'location',
    dataIndex: 'location',
    align: 'center',
  },
  {
    title: '기간',
    key: 'date',
    dataIndex: 'date',
    align: 'center',
    render: (val) => {
      return (
        <>
          <DatePicker.RangePicker
            defaultValue={[moment(startDate), moment(endDate)]}
            onChange={(value) => {
              setEndDate(moment(value?.[1]));
              setStartDate(moment(value?.[0]));
            }}
          />
        </>
      );
    },
  },
  {
    title: 'url 주소',
    key: 'url',
    dataIndex: 'url',
    align: 'center',
    render: (value) => {
      return <Input defaultValue={value} />;
    },
  },
  {
    title: '이미지',
    key: 'image',
    dataIndex: 'image',
    align: 'center',
    render: (value) => {
      return <Image src={value} />;
    },
  },
];
