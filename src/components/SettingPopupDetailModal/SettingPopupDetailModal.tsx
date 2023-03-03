import React, { useState } from 'react';
import { Button, DatePicker, Input, message, Modal, Popconfirm, Upload } from 'antd';
import * as S from './style';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TransformBox from '../TransformBox';
import moment from 'moment';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';

export type SubmitType = {
  location: string;
  startDate: Date;
  endDate: Date;
  url: string;
  image: string;
};

type Props = {
  data?: any;
};

export function SettingPopupDetailModal({ data }: Props) {
  const [startDate, setStartDate] = useState<moment.Moment>();
  const [endDate, setEndDate] = useState<moment.Moment>();
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      title="팝업 관리"
      centered
      width={800}
      footer={false}
      bodyStyle={{
        maxHeight: '90vh',
        overflow: 'auto',
      }}
    >
      <S.FormWrap>
        <S.Label>팝업 위치</S.Label>
        <Input value={data?.location} />
      </S.FormWrap>
      <S.FormWrap>
        <S.Label>기간</S.Label>
        <DatePicker.RangePicker
          defaultValue={[moment(data?.startDate), moment(data?.endDate)]}
          onChange={(value) => {
            setEndDate(moment(value?.[1]));
            setStartDate(moment(value?.[0]));
          }}
          style={{ marginLeft: '-17px' }}
        />
      </S.FormWrap>
      <S.FormWrap>
        <S.Label>url 주소</S.Label>
        <Input value={data?.url} />
      </S.FormWrap>
      <S.FormWrap>
        <S.Label>이미지</S.Label>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </S.FormWrap>

      <TransformBox justifyContent="center">
        <>
          <Button type="primary">{data ? '수정' : '등록'}</Button>
          {data && (
            <Popconfirm okText="삭제" title="정말로 삭제하시겠습니까?">
              <Button
                style={{
                  marginLeft: 30,
                }}
                type="primary"
                danger
              >
                삭제
              </Button>
            </Popconfirm>
          )}
        </>
      </TransformBox>
    </Modal>
  );
}
