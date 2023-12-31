import { useEffect, useState } from 'react';
import { Button, Upload, Modal, Table, Input, notification } from 'antd';
import * as S from '../style';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { InputBasic } from '../InputBasic/InputBasic';
import { investfileColumns, lesseeColumns } from '../../../utils/columns';
import {
  DocInCreateProjectByAdminArgs,
  FileKind,
  FindManyProjectFileQuery,
} from '../../../graphql/generated/graphql';
import GetZipApi from '../../GetZipApi/GetZipApi';
import GetCoordinateApi from '../../GetCoordinateApi/GetCoordinateApi';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FIND_MANY_PROJECT_FILE } from '../../../graphql/query';
import {
  CREATE_PROJECT_FILE_BY_ADMIN,
  DELETE_PROJECT_FILE_BY_ADMIN,
  UPDATE_PROJECT_BASIC_INFO_BY_ADMIN,
} from '../../../graphql/mutation';
import Loader from '../../Loader';

type Props = {
  variables: any;
  projectId: number | undefined;
  investFileList: DocInCreateProjectByAdminArgs[];
  officialInfosFileList: DocInCreateProjectByAdminArgs[];
  setInvestFileList: React.Dispatch<React.SetStateAction<DocInCreateProjectByAdminArgs[]>>;
  setOfficialInfosFileList: React.Dispatch<React.SetStateAction<DocInCreateProjectByAdminArgs[]>>;
  handleChange: (key: string, value: any) => void;
  isFix?: boolean;
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function BasicInfo({
  variables,
  isFix,
  projectId,
  investFileList,
  officialInfosFileList,
  handleChange,
  setInvestFileList,
  setOfficialInfosFileList,
}: Props) {
  var regExp = /^[0-9]/g;
  const [visible, setVisible] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [projectImageFileList, setProjectImageFileList] = useState<UploadFile[]>([]);
  const [success, setSuccess] = useState(false);
  const [newInvestFileList, setNewInvestFileList] = useState<
    FindManyProjectFileQuery['findManyProjectFile']
  >([
    {
      fileKind: FileKind.Docs,
      fileName: '',
      id: 0,
      name: '',
    },
  ]);
  const [newOfficialInfosFileList, setNewOfficialInfosFileList] = useState<
    FindManyProjectFileQuery['findManyProjectFile']
  >([
    {
      fileKind: FileKind.OfficialInfo,
      fileName: '',
      id: 0,
      name: '',
    },
  ]);
  const [lesseeNum] = useState([
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

  const projectimageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setProjectImageFileList(newFileList);
    handleChange('images', newFileList);
  };

  const handleProjectimageChange = (e: any) => {
    const newImage: UploadFile = e?.file?.originFileObj;

    if (isFix) {
      if (projectImageFileList?.length < e.fileList?.length) {
        createProjectFileByAdmin({
          variables: {
            file: newImage,
            fileKind: FileKind.Image,
            projectId: projectId ? projectId : 0,
            name: '',
          },
          onCompleted: (_data) => {
            projectimageChange(e);
          },
        });
      } else if (projectImageFileList.length > e.fileList.length) {
        deleteProjectFileByAdmin({
          variables: {
            id: +e.file.uid,
          },
          onCompleted: (_data) => {
            projectimageChange(e);
          },
        });
      }
    } else {
      projectimageChange(e);
    }
    setSuccess(false);
  };

  const handleFileChange = (
    file: UploadFile<DocInCreateProjectByAdminArgs>,
    index: number,
    key: string,
  ) => {
    if (isFix) {
      const variables = key === 'docs' ? newInvestFileList[index] : newOfficialInfosFileList[index];
      createProjectFileByAdmin({
        variables: {
          ...variables,
          projectId: projectId ? projectId : 0,
          file,
        },
      });
      if (success) {
        if (key === 'docs') {
          setNewInvestFileList((prev: any) => {
            prev[index].file = file;
            handleChange('docs', prev);
            return [...prev];
          });
        } else {
          setNewOfficialInfosFileList((prev: any) => {
            prev[index].file = file;
            handleChange('officialInfos', prev);
            return [...prev];
          });
        }
        setSuccess(false);
      }
    } else {
      if (key === 'docs') {
        setInvestFileList((prev) => {
          prev[index].file = file;
          handleChange('docs', prev);
          return [...prev];
        });
      } else if (key === 'officialInfos') {
        setOfficialInfosFileList((prev) => {
          prev[index].file = file;
          handleChange('officialInfos', prev);
          return [...prev];
        });
      }
    }
  };

  const handleDeleteFile = (idx: number, key: string) => {
    if (isFix) {
      if (key === 'docs') {
        setNewInvestFileList(newInvestFileList.filter((_v: any, i: any) => i !== idx));
      } else if (key === 'officialInfos') {
        setNewOfficialInfosFileList(
          newOfficialInfosFileList.filter((_v: any, i: any) => i !== idx),
        );
      }
      const id = key === 'docs' ? newInvestFileList[idx]?.id : newOfficialInfosFileList[idx]?.id;
      deleteProjectFileByAdmin({ variables: { id } });
    } else {
      if (key === 'docs') {
        setInvestFileList(investFileList.filter((_v, i) => i !== idx));
      } else if (key === 'officialInfos') {
        setOfficialInfosFileList(officialInfosFileList.filter((_v, i) => i !== idx));
      }
    }
  };

  const setCoordinateHandle = (longitude: number, latitude: number) => {
    handleChange('longitude', longitude.toString());
    handleChange('latitude', latitude.toString());
  };

  const complteSerchZipHandle = (fullAdress: string, zip: string) => {
    handleChange('zip', zip);
    handleChange('address', fullAdress);
    GetCoordinateApi(fullAdress, setCoordinateHandle);
    setVisible(false);
  };

  const handleTitleChange = (idx: number, key: string, value: string) => {
    if (isFix) {
      if (key === 'docs') {
        setNewInvestFileList((prev: any) => {
          prev[idx].name = value;
          handleChange('docs', prev);
          return [...prev];
        });
      } else {
        setNewOfficialInfosFileList((prev: any) => {
          prev[idx].name = value;
          handleChange('docs', prev);
          return [...prev];
        });
      }
    } else {
      if (key === 'docs') {
        setInvestFileList((prev) => {
          prev[idx].name = value;
          handleChange('docs', prev);
          return [...prev];
        });
      } else {
        setOfficialInfosFileList((prev) => {
          prev[idx].name = value;
          handleChange('officialInfos', prev);
          return [...prev];
        });
      }
    }
  };

  const editBasicInfo = () => {
    updateProjectBasicInfoByAdmin({ variables: variables });
  };

  const [findManyProjectFile] = useLazyQuery(FIND_MANY_PROJECT_FILE, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      if (projectImageFileList?.length === 0) {
        data.findManyProjectFile
          .filter((item) => item.fileKind === 'IMAGE')
          .map((image) =>
            setProjectImageFileList((prevImageFileList) => [
              ...prevImageFileList,
              {
                uid: image.id.toString(),
                name: '',
                thumbUrl: `${process.env.REACT_APP_SERVER_BASIC}/project-file?fileKind=IMAGE&name=${image.fileName}`,
                url: `${process.env.REACT_APP_SERVER_BASIC}/project-file?fileKind=IMAGE&name=${image.fileName}`,
              },
            ]),
          );
      }
      handleChange('images', projectImageFileList);
      setNewInvestFileList(data.findManyProjectFile.filter((item) => item.fileKind === 'DOCS'));
      setNewOfficialInfosFileList(
        data.findManyProjectFile.filter((item) => item.fileKind === 'OFFICIAL_INFO'),
      );
    },
  });

  const [createProjectFileByAdmin, { loading }] = useMutation(CREATE_PROJECT_FILE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      setSuccess(true);
      findManyProjectFile({
        variables: { projectId: projectId ? projectId : 0 },
        fetchPolicy: 'no-cache',
      });
    },
  });

  const [deleteProjectFileByAdmin] = useMutation(DELETE_PROJECT_FILE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
  });

  const [updateProjectBasicInfoByAdmin] = useMutation(UPDATE_PROJECT_BASIC_INFO_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '프로젝트의 기본정보를 수정했습니다.' });
    },
  });

  useEffect(() => {
    findManyProjectFile({
      variables: { projectId: projectId ? projectId : 0 },
      fetchPolicy: 'no-cache',
    });
    setProjectImageFileList([]);
  }, [projectId, success, visible]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {visible && <GetZipApi complteSerchZipHandle={complteSerchZipHandle} />}
      <S.AddTitle style={{ marginTop: '25px' }}>기본 정보</S.AddTitle>
      <S.AddFormContainer>
        {isFix && (
          <Button
            onClick={() => editBasicInfo()}
            style={{ width: '150px', marginLeft: '37vw', marginBottom: '20px' }}
            type="primary"
          >
            수정
          </Button>
        )}
        <InputBasic
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
                value={variables['zip']}
                disabled
                placeholder="우편번호"
                style={{ width: '19.3vw', minWidth: '255px' }}
              />
              <Button onClick={() => setVisible(true)} style={{ marginLeft: '5px' }}>
                검색
              </Button>
            </S.Flex>
          </S.Flex>
          <S.Flex>
            <S.AddTitle />
            <Input
              value={variables['address']}
              style={{ width: '19.3vw', margin: '5px 0', minWidth: '255px' }}
              disabled
              placeholder="기본주소"
            />
          </S.Flex>
          <S.Flex>
            <S.AddTitle />
            <Input
              style={{ width: '19.3vw', minWidth: '255px' }}
              onChange={(e) => handleChange('addressDetail', e.target.value)}
              placeholder="상세주소"
              value={variables['addressDetail']}
            />
            <Input
              disabled
              style={{ width: '7.5vw', margin: '0 5px' }}
              onChange={(e) => {
                regExp.test(e.target.value)
                  ? handleChange('longitude', e.target.value.replace('-', ''))
                  : handleChange('longitude', '');
              }}
              placeholder="x 좌표"
              value={variables['longitude']}
            />
            <Input
              disabled
              style={{ width: '7.5vw' }}
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
        <InputBasic
          title="용도지역"
          handleChange={handleChange}
          saveName="zoning"
          value={variables['zoning']}
        />
        <InputBasic
          title="주용도"
          handleChange={handleChange}
          saveName="mainPurpose"
          value={variables['mainPurpose']}
        />
        <InputBasic
          title="연면적"
          subTitle={
            <>
              (m<sup>2</sup>)
            </>
          }
          handleChange={handleChange}
          saveName="grossFloorAreaMeter"
          value={+variables['grossFloorAreaMeter']}
        />
        <InputBasic
          title="연면적(평)"
          handleChange={handleChange}
          saveName="grossFloorAreaPyeong"
          value={+variables['grossFloorAreaPyeong']}
        />
        <InputBasic
          title="건폐율(%)"
          handleChange={handleChange}
          saveName="buildingCoverageRatio"
          value={+variables['buildingCoverageRatio']}
        />
        <InputBasic
          title="용적률(%)"
          handleChange={handleChange}
          saveName="floorAreaRatio"
          value={+variables['floorAreaRatio']}
        />
        <InputBasic
          title="공시지가"
          subTitle={
            <>
              (원/m<sup>2</sup>)
            </>
          }
          handleChange={handleChange}
          saveName="officialLandPrice"
          value={+variables['officialLandPrice']}
        />
        <InputBasic
          title="준공일"
          datePicker={true}
          handleChange={handleChange}
          saveName="completionDate"
          value={variables['completionDate']}
        />
        <InputBasic
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
                fileList={projectImageFileList}
                onPreview={handlePreview}
                onChange={handleProjectimageChange}
              >
                {projectImageFileList?.length >= 10 ? null : uploadButton}
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
          columns={investfileColumns({
            handleFileChange,
            handleTitleChange,
            handleDeleteFile,
            docs: true,
            isFix: isFix ? isFix : false,
          })}
          dataSource={isFix ? newInvestFileList : investFileList}
          scroll={{ x: 800 }}
          style={{
            marginTop: '30px',
            width: '1300px',
          }}
        />
        {investFileList?.length < 10 && (
          <div style={{ width: '80vw', display: 'flex' }}>
            <Button
              onClick={() =>
                isFix
                  ? setNewInvestFileList([
                      ...newInvestFileList,
                      {
                        fileKind: FileKind.Docs,
                        fileName: '',
                        id: 0,
                        name: '',
                      },
                    ])
                  : setInvestFileList([...investFileList, { file: null, name: '' }])
              }
              type="primary"
              style={{ width: '200px', margin: '20px auto' }}
            >
              투자관련문서 추가
            </Button>
          </div>
        )}
        <S.AddTitle style={{ marginTop: '25px' }}>임차인 정보</S.AddTitle>
        <Table
          pagination={false}
          columns={lesseeColumns({ handleChange, variables })}
          dataSource={lesseeNum}
          rowKey={(rec) => rec.id}
          scroll={{ x: 800 }}
          style={{
            marginTop: '30px',
            width: '1300px',
          }}
        />
        <S.AddTitle style={{ marginTop: '25px' }}>공시</S.AddTitle>
        <Table
          pagination={false}
          columns={investfileColumns({
            handleFileChange,
            handleTitleChange,
            handleDeleteFile,
            isFix: isFix ? isFix : false,
          })}
          dataSource={isFix ? newOfficialInfosFileList : officialInfosFileList}
          scroll={{ x: 800 }}
          style={{
            marginTop: '30px',
            width: '1300px',
          }}
        />
        {officialInfosFileList?.length < 10 && (
          <div style={{ width: '80vw', display: 'flex' }}>
            <Button
              onClick={() =>
                isFix
                  ? setNewOfficialInfosFileList([
                      ...newOfficialInfosFileList,
                      {
                        fileKind: FileKind.OfficialInfo,
                        fileName: '',
                        id: 0,
                        name: '',
                      },
                    ])
                  : setOfficialInfosFileList([...officialInfosFileList, { file: null, name: '' }])
              }
              type="primary"
              style={{ width: '200px', margin: '20px auto' }}
            >
              공시파일 추가
            </Button>
          </div>
        )}
      </S.AddFormContainer>
    </>
  );
}
