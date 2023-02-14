import { useEffect, useState } from 'react';
import { Divider, Button, DatePicker, Upload, Modal, Table, Input } from 'antd';
import * as S from './style';
import TransformBox from '../../components/TransformBox';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { ProjectAddInput } from '../../components/ProjectAddInput/ProjectAddInput';
import { investfileColumns } from '../../utils/columns';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function ProjectAdd() {
  const btns = ['1. 기본정보', '2. 공모정보'];
  const [nowAble, setNowAble] = useState('1. 기본정보');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [projectImageFileList, setProjectImageFileList] = useState<UploadFile[]>([]);
  const [investFileList, setInvestFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleProjectimageChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setProjectImageFileList(newFileList);

  const handleInvestChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setInvestFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleRow = (rec: any) => {};
  console.log(investFileList);

  useEffect(() => {}, [investFileList]);
  return (
    <div>
      <Divider>프로젝트 등록</Divider>
      <S.TopBtns>
        {btns.map((item, idx) => (
          <S.AddBtn
            onClick={() => setNowAble(item)}
            style={{ backgroundColor: `${nowAble === item ? '#5d28dd' : ''}` }}
            key={item}
          >
            {item}
          </S.AddBtn>
        ))}
      </S.TopBtns>

      <TransformBox
        justifyContent="space-between"
        width="540px"
        marginTop="20px"
        marginBottom="20px"
      >
        <h1>기본정보</h1>
        <Button type="primary">저장</Button>
      </TransformBox>
      <S.AddFormContainer>
        <ProjectAddInput title="프로젝트명" />
        <S.LocationWrap>
          <S.Flex>
            <S.AddTitle>
              <S.Red>*</S.Red>위치 :
            </S.AddTitle>
            <S.Flex>
              <S.AddInput placeholder="우편번호" style={{ width: '310px' }} />
              <Button style={{ marginLeft: '5px' }}>검색</Button>
            </S.Flex>
          </S.Flex>
          <S.Flex>
            <S.AddTitle />
            <S.AddInput placeholder="기본주소" />
          </S.Flex>
          <S.Flex>
            <S.AddTitle />
            <S.AddInput placeholder="상세주소" />
            <S.AddSmallInput placeholder="x 좌표" />
            <S.AddSmallInput placeholder="y 좌표" />
          </S.Flex>
        </S.LocationWrap>
        <ProjectAddInput title="용도지역" />
        <ProjectAddInput title="주용도" />
        <ProjectAddInput
          title="연면적"
          subTitle={
            <>
              (m<sup>2</sup>)
            </>
          }
        />
        <ProjectAddInput title="연면적(평)" />
        <ProjectAddInput title="건폐율(%)" />
        <ProjectAddInput title="용적률(%)" />
        <ProjectAddInput title="건폐율(%)" />
        <ProjectAddInput
          title="공시지사"
          subTitle={
            <>
              (원/m<sup>2</sup>)
            </>
          }
        />
        <ProjectAddInput title="준공일" datePicker={true} />
        <ProjectAddInput title="투자정보 url" red={false} />
        <S.AddTitle style={{ width: '310px' }}>
          <S.Red>*</S.Red>프로젝트 이미지 (최소 1장 필수, 최대 10장 까지) :
        </S.AddTitle>
        <S.AddFormWrap>
          <S.AddImageWrap>
            <>
              <Upload
                listType="picture-card"
                fileList={projectImageFileList}
                onPreview={handlePreview}
                onChange={handleProjectimageChange}
              >
                {projectImageFileList.length >= 10 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="프로젝트 이미지" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </>
          </S.AddImageWrap>
        </S.AddFormWrap>
        <S.AddTitle style={{ marginBottom: '5px' }}>투자관련문서</S.AddTitle>
        <Table
          pagination={false}
          columns={investfileColumns({ setInvestFileList, handleProjectimageChange })}
          dataSource={investFileList}
          onRow={(rec) => {
            return {
              onClick: () => handleRow(rec),
            };
          }}
          // loading={loading}
          rowKey={(rec) => rec.uid}
          scroll={{ x: 800 }}
          style={{
            marginTop: '30px',
          }}
        />
        <S.InvestWrap>
          <Upload showUploadList={false} fileList={investFileList} onChange={handleInvestChange}>
            {investFileList.length >= 10 ? null : <Button type="primary">파일 추가</Button>}
          </Upload>
        </S.InvestWrap>
      </S.AddFormContainer>
    </div>
  );
}
