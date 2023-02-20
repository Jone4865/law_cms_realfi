import { useEffect, useState } from 'react';
import { Divider, notification } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_PROJECT_BY_ADMIN } from '../../graphql/mutation';
import { FIND_PROJECT } from '../../graphql/query/findProject';
import { useParams } from 'react-router-dom';
import * as S from './style';
import Loader from '../../components/Loader';
import { ProjectStateModal } from '../../components/ProjectStateModal';
import { BasicInfo } from '../../components/ProjectAdd/BasicInfo/BasicInfo';
import { CollusionInfo } from '../../components/ProjectAdd/CollusionInfo/CollusionInfo';
import { CollusionHistory } from '../../components/ProjectAdd/CollusionHistory/CollusionHistory';
import { TransactioDetails } from '../../components/ProjectAdd/TransactioDetails/TransactioDetails';
import { DividendManagement } from '../../components/ProjectAdd/DividendManagement/DividendManagement';

type Props = {
  isFix?: boolean;
  isAdd?: boolean;
};

export function ProjectAdd({ isFix, isAdd }: Props) {
  const params = useParams();
  const btns = ['1. 기본정보', '2. 공모정보'];
  const fixBtns = [
    '1. 기본정보',
    '2. 공모정보',
    '3. 공모내역',
    '4. 거래내역',
    '5. 배당관리',
    '6. 매각관리',
  ];
  const btnAble = [true, true, true, true, true, true];
  const [variables, setVariables] = useState<any>({});
  const [nowAble, setNowAble] = useState(0);

  const submitHandle = () => {
    createProjectByAdmin({
      variables: {
        ...variables,
        images: variables.images?.map((file: any) => ({ file: file.originFileObj })),
        latitude: variables.latitude.toString(),
        longitude: variables.longitude.toString(),
      },
    });
  };

  // 요청 분기점
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

  useEffect(() => {
    if (isFix && params.projectId) {
      findProject({
        variables: {
          id: +params.projectId,
        },
      });
    }
    if (isAdd) {
      setVariables({});
    }
  }, [isAdd, isFix]);

  const [findProject] = useLazyQuery(FIND_PROJECT, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setVariables(data.findProject);
    },
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {isFix && <ProjectStateModal state={'헤헤헹'} />}
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
        <BasicInfo variables={variables} handleChange={handleChange} isFix={isFix} />
      )}
      {nowAble === 1 && (
        <CollusionInfo
          submitHandle={submitHandle}
          variables={variables}
          handleChange={handleChange}
        />
      )}
      {nowAble === 2 && <CollusionHistory projectId={params.projectId && +params.projectId} />}
      {nowAble === 3 && <TransactioDetails projectId={params.projectId && +params.projectId} />}
      {nowAble === 4 && <DividendManagement projectId={params.projectId && +params.projectId} />}
    </div>
  );
}
