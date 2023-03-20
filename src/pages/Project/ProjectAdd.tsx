import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Divider, notification } from 'antd';
import * as S from './style';
import {
  CREATE_PROJECT_BY_ADMIN,
  UPDATE_PROJECT_PUBLIC_OFFERING_INFO_BY_ADMIN,
} from '../../graphql/mutation';
import { FIND_PROJECT_BY_ADMIN } from '../../graphql/query';
import {
  DocInCreateProjectByAdminArgs,
  FindProjectByAdminQuery,
} from '../../graphql/generated/graphql';
import { ProjectStateModal } from '../../components/ProjectStateModal';
import { BasicInfo } from '../../components/ProjectAdd/BasicInfo/BasicInfo';
import { CollusionInfo } from '../../components/ProjectAdd/CollusionInfo/CollusionInfo';
import { CollusionHistory } from '../../components/ProjectAdd/CollusionHistory/CollusionHistory';
import { TransactioDetails } from '../../components/ProjectAdd/TransactioDetails/TransactioDetails';
import { DividendManagement } from '../../components/ProjectAdd/DividendManagement/DividendManagement';
import { SellVote } from '../../components/ProjectAdd/SellVote/SellVote';
import Loader from '../../components/Loader';

type Props = {
  isFix?: boolean;
  isAdd?: boolean;
};

export function ProjectAdd({ isFix, isAdd }: Props) {
  const params = useParams();
  const btns = ['기본정보', '공모정보'];
  const fixBtns = ['기본정보', '공모정보', '공모내역', '거래내역', '배당관리', '매각관리'];
  const btnAble = [true, true, true, true, true, true];
  const [nowProjectState, setNowProjectState] = useState<string[]>([]);
  const [variables, setVariables] = useState<any>({});
  const [nowAble, setNowAble] = useState(0);
  const [tabsName, setTabsName] = useState('');
  const [publicOfferingQuantity, setPublicOfferingQuantity] =
    useState<FindProjectByAdminQuery['findProjectByAdmin']['publicOfferingQuantity']>();

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

  const handleRefetch = () => {
    if (params.projectId) {
      findProjectByAdmin({
        variables: {
          id: +params.projectId,
        },
        fetchPolicy: 'no-cache',
      });
    }
  };

  const submitHandle = () => {
    if (isFix) {
      updateProjectPublicOfferingInfoByAdmin({ variables: variables });
    } else {
      createProjectByAdmin({
        variables: {
          ...variables,
          images: variables.images?.map((file: any) => ({ file: file.originFileObj })),
          latitude: variables.latitude.toString(),
          longitude: variables.longitude.toString(),
        },
      });
    }
  };

  const handleChange = (key: string, value: any) => {
    if (key === 'name') {
      setVariables((prev: any) => {
        let newVariables: any = { ...prev };
        newVariables['tabsName'] = value;
        return newVariables;
      });
    } else if (key === 'publicOfferingQuantity') {
      return setVariables((prev: any) => {
        prev[key] = +value;
        return { ...prev };
      });
    }

    setVariables((prev: any) => {
      let newVariables: any = { ...prev };
      newVariables[key] = value;
      return newVariables;
    });
  };

  const onClickHandle = (idx: number) => {
    btnAble[idx] && setNowAble(idx);
  };

  const [findProjectByAdmin] = useLazyQuery(FIND_PROJECT_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setPublicOfferingQuantity(data.findProjectByAdmin.publicOfferingQuantity);
      setVariables(data.findProjectByAdmin);
      setTabsName(data.findProjectByAdmin.name);
    },
  });

  const [createProjectByAdmin, { loading }] = useMutation(CREATE_PROJECT_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '프로젝트 생성을 완료했습니다.' });
      setVariables({});
      setNowAble(0);
    },
  });

  const [updateProjectPublicOfferingInfoByAdmin] = useMutation(
    UPDATE_PROJECT_PUBLIC_OFFERING_INFO_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (_data) => {
        notification.success({ message: '프로젝트 공모정보를 수정했습니다.' });
      },
    },
  );

  useEffect(() => {
    if (isFix && params.projectId) {
      findProjectByAdmin({
        variables: {
          id: +params.projectId,
        },
        fetchPolicy: 'no-cache',
      });
    }
    if (isAdd) {
      setVariables({});
    }
    setNowAble(0);
  }, [isAdd, isFix]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {isFix && (
        <ProjectStateModal
          setProjectState={setNowProjectState}
          variables={variables}
          nowProjectState={nowProjectState}
        />
      )}
      <Divider>{isFix ? '프로젝트 상세' : '프로젝트 등록'}</Divider>
      <S.TopBtns>
        {(isFix ? fixBtns : btns).map((item, idx) => (
          <S.AddBtn
            onClick={() => onClickHandle(idx)}
            style={{ backgroundColor: `${nowAble === idx ? '#5d28dd' : ''}` }}
            key={item}
          >
            {item}
          </S.AddBtn>
        ))}
      </S.TopBtns>

      {nowAble === 0 && (
        <BasicInfo
          projectId={params.projectId ? +params.projectId : undefined}
          variables={variables}
          handleChange={handleChange}
          isFix={isFix}
          investFileList={investFileList}
          setInvestFileList={setInvestFileList}
          officialInfosFileList={officialInfosFileList}
          setOfficialInfosFileList={setOfficialInfosFileList}
        />
      )}
      {nowAble === 1 && (
        <CollusionInfo
          isFix={isFix}
          submitHandle={submitHandle}
          variables={variables}
          handleChange={handleChange}
        />
      )}
      {nowAble === 2 && (
        <CollusionHistory projectId={params.projectId && +params.projectId} variables={variables} />
      )}
      {nowAble === 3 && <TransactioDetails projectId={params.projectId && +params.projectId} />}
      {nowAble === 4 && (
        <DividendManagement
          projectId={params.projectId ? +params.projectId : undefined}
          publicOfferingQuantity={publicOfferingQuantity}
          tabsName={tabsName}
        />
      )}
      {nowAble === 5 && (
        <SellVote
          projectStates={nowProjectState}
          projectId={params.projectId && +params.projectId}
          tabsName={tabsName}
          handleRefetch={handleRefetch}
        />
      )}
    </div>
  );
}
