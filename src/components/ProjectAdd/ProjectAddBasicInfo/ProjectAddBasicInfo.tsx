import { useEffect, useState } from 'react';
import { Button, Upload, Modal, Table, Input } from 'antd';
import * as S from '../style';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { ProjectAddBasicInput } from '../ProjectAddBasicInput/ProjectAddBasicInput';
import { investfileColumns, lesseeColumns, officialInfosColumns } from '../../../utils/columns';
import { DocInCreateProjectByAdminArgs } from '../../../graphql/generated/graphql';

type Props = {
  handleChange: (key: string, value: any) => void;
  variables: any;
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function ProjectAddBasicInfo({ handleChange, variables }: Props) {
  var regExp = /^[0-9]/g;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [projectImageFileList, setProjectImageFileList] = useState<any>([]);
  const [investFileList, setInvestFileList] = useState<DocInCreateProjectByAdminArgs[]>([
    {
      file: null,
      name: '',
    },
  ]);
  const [officialInfosFileList, setOfficialInfosFileList] = useState<
    DocInCreateProjectByAdminArgs[]
  >([
    {
      file: null,
      name: '',
    },
  ]);

  const [lesseeNum, setLesseeNum] = useState([
    {
      id: 1,
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleProjectimageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setProjectImageFileList(newFileList);
    handleChange('images', newFileList);
  };

  const handleInvestChange = (file: UploadFile<any>, index: number) => {
    setInvestFileList((prev) => {
      prev[index].file = file;
      prev[index].name = file.name;
      handleChange('docs', prev);
      return [...prev];
    });
  };

  const handleOfficialInfosChange = (file: UploadFile<any>, index: number) => {
    setOfficialInfosFileList((prev) => {
      prev[index].file = file;
      prev[index].name = file.name;
      handleChange('officialInfos', prev);
      return [...prev];
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleRow = (rec: any) => {};

  const investDeleteClick = (idx: number) => () => {
    setInvestFileList(investFileList.filter((_v, i) => i !== idx));
  };

  const officialInfosDeleteClick = (idx: number) => () => {
    setOfficialInfosFileList(officialInfosFileList.filter((_v, i) => i !== idx));
  };

  useEffect(() => {}, [investFileList, officialInfosFileList, variables]);

  return (
    <>
      <S.AddTitle style={{ marginTop: '25px' }}>
        기본 정보
        {/* <Button type="primary">저장</Button> */}
      </S.AddTitle>
      <S.AddFormContainer>
        <ProjectAddBasicInput
          handleChange={handleChange}
          title="프로젝트명"
          saveName="name"
          value={variables['name']}
        />
        <S.LocationWrap>
          <S.Flex>
            <S.AddTitle>
              <S.Red>*</S.Red>위치 :
            </S.AddTitle>
            <S.Flex>
              <Input
                onChange={(e) => {
                  regExp.test(e.target.value)
                    ? handleChange('zip', e.target.value.replace('-', ''))
                    : handleChange('zip', '');
                }}
                placeholder="우편번호"
                style={{ width: '310px' }}
                value={variables['zip']}
              />
              <Button style={{ marginLeft: '5px' }}>검색</Button>
            </S.Flex>
          </S.Flex>
          <S.Flex>
            <S.AddTitle />
            <Input
              style={{ width: '371px', margin: '5px 0' }}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="기본주소"
              value={variables['address']}
            />
          </S.Flex>
          <S.Flex>
            <S.AddTitle />
            <Input
              style={{ width: '371px' }}
              onChange={(e) => handleChange('addressDetail', e.target.value)}
              placeholder="상세주소"
              value={variables['addressDetail']}
            />
            <Input
              style={{ width: '100px', margin: '0 5px' }}
              onChange={(e) => {
                regExp.test(e.target.value)
                  ? handleChange('longitude', e.target.value.replace('-', ''))
                  : handleChange('longitude', '');
              }}
              placeholder="x 좌표"
              value={variables['longitude']}
            />
            <Input
              style={{ width: '100px' }}
              onChange={(e) => {
                regExp.test(e.target.value)
                  ? handleChange('latitude', e.target.value.replace('-', ''))
                  : handleChange('latitude', '');
              }}
              placeholder="y 좌표"
              value={variables['latitude']}
            />
          </S.Flex>
        </S.LocationWrap>
        <ProjectAddBasicInput
          title="용도지역"
          handleChange={handleChange}
          saveName="zoning"
          value={variables['zoning']}
        />
        <ProjectAddBasicInput
          title="주용도"
          handleChange={handleChange}
          saveName="mainPurpose"
          value={variables['mainPurpose']}
        />
        <ProjectAddBasicInput
          title="연면적"
          type="number"
          subTitle={
            <>
              (m<sup>2</sup>)
            </>
          }
          handleChange={handleChange}
          saveName="grossFloorAreaMeter"
          value={variables['grossFloorAreaMeter']}
        />
        <ProjectAddBasicInput
          title="연면적(평)"
          type="number"
          handleChange={handleChange}
          saveName="grossFloorAreaPyeong"
          value={variables['grossFloorAreaPyeong']}
        />
        <ProjectAddBasicInput
          title="건폐율(%)"
          type="number"
          handleChange={handleChange}
          saveName="buildingCoverageRatio"
          value={variables['buildingCoverageRatio']}
        />
        <ProjectAddBasicInput
          title="용적률(%)"
          type="number"
          handleChange={handleChange}
          saveName="floorAreaRatio"
          value={variables['floorAreaRatio']}
        />
        <ProjectAddBasicInput
          title="공시지가"
          type="number"
          subTitle={
            <>
              (원/m<sup>2</sup>)
            </>
          }
          handleChange={handleChange}
          saveName="officialLandPrice"
          value={variables['officialLandPrice']}
        />
        <ProjectAddBasicInput
          title="준공일"
          datePicker={true}
          handleChange={handleChange}
          saveName="completionDate"
          value={variables['completionDate']}
        />
        <ProjectAddBasicInput
          title="투자정보 url"
          essential={false}
          handleChange={handleChange}
          saveName="url"
          value={variables['url']}
        />
        <S.AddTitle style={{ width: '310px' }}>
          <S.Red>*</S.Red>프로젝트 이미지 (최소 1장 필수, 최대 10장 까지) :
        </S.AddTitle>
        <S.AddFormWrap>
          <S.AddImageWrap>
            <>
              <Upload
                listType="picture-card"
                fileList={variables.images}
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
          columns={investfileColumns({ handleInvestChange, investDeleteClick })}
          dataSource={investFileList}
          onRow={(rec) => {
            return {
              onClick: () => handleRow(rec),
            };
          }}
          // loading={loading}
          scroll={{ x: 800 }}
          style={{
            marginTop: '30px',
          }}
        />
        {investFileList.length < 10 && (
          <Button
            onClick={() => setInvestFileList([...investFileList, { file: null, name: '' }])}
            type="primary"
            style={{ width: '200px', margin: '20px auto' }}
          >
            투자관련문서 추가
          </Button>
        )}
        <S.AddTitle style={{ marginTop: '25px' }}>임차인 정보</S.AddTitle>
        <Table
          pagination={false}
          columns={lesseeColumns({})}
          dataSource={lesseeNum}
          onRow={(rec) => {
            return {
              onClick: () => handleRow(rec),
            };
          }}
          // loading={loading}
          rowKey={(rec) => rec.id}
          scroll={{ x: 800 }}
          style={{
            marginTop: '30px',
          }}
        />
        {/* <Button
          onClick={() => setLesseeNum([...lesseeNum, { id: lesseeNum.length + 1 }])}
          type="primary"
          style={{ width: '200px', margin: '20px auto' }}
        >
          임차인 추가
        </Button> */}
        <S.AddTitle style={{ marginTop: '25px' }}>공시</S.AddTitle>
        <Table
          pagination={false}
          columns={officialInfosColumns({
            handleOfficialInfosChange,
            officialInfosDeleteClick,
          })}
          dataSource={officialInfosFileList}
          onRow={(rec) => {
            return {
              onClick: () => handleRow(rec),
            };
          }}
          // loading={loading}
          scroll={{ x: 800 }}
          style={{
            marginTop: '30px',
          }}
        />
        {officialInfosFileList.length < 10 && (
          <Button
            onClick={() =>
              setOfficialInfosFileList([...officialInfosFileList, { file: null, name: '' }])
            }
            type="primary"
            style={{ width: '200px', margin: '20px auto' }}
          >
            공시파일 추가
          </Button>
        )}
      </S.AddFormContainer>
    </>
  );
}
