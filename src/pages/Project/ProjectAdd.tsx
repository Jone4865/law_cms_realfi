import { useEffect, useState } from 'react';
import { Divider, notification } from 'antd';
import * as S from './style';
import { ProjectAddBasicInfo } from '../../components/ProjectAdd/ProjectAddBasicInfo/ProjectAddBasicInfo';
import { ProjectAddCollusionInfo } from '../../components/ProjectAdd/ProjectAddCollusionInfo/ProjectAddCollusionInfo';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT_BY_ADMIN } from '../../graphql/mutation';

export function ProjectAdd() {
  const btns = ['1. 기본정보', '2. 공모정보'];
  const [variables, setVariables] = useState<any>({});
  const [nowAble, setNowAble] = useState('1. 기본정보');

  const submitHandle = () => {
    console.log(variables.images);
    createProjectByAdmin({
      variables: {
        ...variables,
        images: variables.images.map((file: any) => ({ file: file.originFileObj })),
      },
    });
  };

  // 요청 분기점
  const [createProjectByAdmin, { loading }] = useMutation(CREATE_PROJECT_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {}, []);

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

      {nowAble === '1. 기본정보' ? (
        <ProjectAddBasicInfo variables={variables} handleChange={handleChange} />
      ) : (
        <ProjectAddCollusionInfo
          submitHandle={submitHandle}
          variables={variables}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}