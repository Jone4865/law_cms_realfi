import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, notification, Popover, Table } from 'antd';
import { UploadFile } from 'antd/es/upload';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  DocInCreateProjectByAdminArgs,
  FindCompanyDataQuery,
  FindManySellVoteByAdminOutput,
  VoteKind,
} from '../../../../graphql/generated/graphql';
import {
  CREATE_PROJECT_SELL_VOTE_BY_ADMIN,
  CREATE_PROJECT_SELL_VOTE_FILE_BY_ADMIN,
  DELETE_PROJECT_SELL_VOTEFILE_BY_ADMIN,
  UPDATE_PROJECT_SELL_VOTE_BY_ADMIN,
  UPDATE_VOTE_KIND_BY_ADMIN,
} from '../../../../graphql/mutation';
import { FIND_MANY_COMPANY_DATA, FIND_MANY_SELL_VOTE_BY_ADMIN } from '../../../../graphql/query';
import { investfileColumns, sellvoteColumns } from '../../../../utils/columns';
import Loader from '../../../Loader';
import { InputBasic } from '../../InputBasic/InputBasic';
import { InputDate } from '../../InputDate/InputDate';
import * as S from './style';

type Props = {
  projectId: number | undefined | '';
  voteState: string | undefined;
  tabsName: string;
  variables: any;
  voteTotalCount: number;
  voteCurrent: number;
  handleRefetch: () => void;
};

export function SellVoteTabs({
  projectId,
  tabsName,
  variables,
  voteTotalCount,
  voteCurrent,
  voteState,
  handleRefetch,
}: Props) {
  const nowAmount = variables
    ? variables?.requestSellAmount - (variables?.requestSellAmount / 100) * variables?.undoRatio
    : 0;
  const requestSellAmount = variables ? +variables?.requestSellAmount : 0;

  const [newVariables, setNewVariables] = useState<any>(undefined);
  const [sellvoteData, setSellvoteData] = useState<FindManySellVoteByAdminOutput['sellVotes']>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [, setTotalCount] = useState(0);
  const [, setCurrent] = useState(1);
  const [projectSellVoteId, setProjectSellVoteId] = useState<number>(0);
  const [times, setTimes] = useState<FindCompanyDataQuery['findCompanyData']>();
  const [disable, setDisable] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const [investFileList, setInvestFileList] = useState<any[]>([
    {
      file: null,
      name: '',
    },
  ]);

  const PopupContent = (
    <div
      style={{
        fontSize: '15px',
        fontWeight: 'bold',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div>투표 결과 선택</div>
      <div
        style={{
          width: '120px',
          justifyContent: 'space-between',
          display: 'flex',
          marginTop: '5px',
        }}
      >
        <Button onClick={() => updateVoteKindClickHandle(VoteKind.Favour)}>가결</Button>
        <Button onClick={() => updateVoteKindClickHandle(VoteKind.Against)} type="primary">
          부결
        </Button>
      </div>
    </div>
  );

  const handleFileChange = (file: UploadFile<DocInCreateProjectByAdminArgs>, index: number) => {
    setInvestFileList((prev) => {
      prev[index].file = file;
      handleChange('docs', prev);
      return [...prev];
    });
    const variables = investFileList[index];
    if (!disable) {
      createProjectSellVoteFileByAdmin({ variables: { ...variables, projectSellVoteId } });
    }
  };

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const updateVoteKindClickHandle = (kind: VoteKind) => {
    updateVoteKindByAdmin({
      variables: {
        projectId: projectId ? projectId : 0,
        voteKind: kind,
      },
    });
  };

  const handleDeleteFile = (idx: number) => {
    if (!disable) {
      setInvestFileList(investFileList.filter((_v, i) => i !== idx));
      deleteProjectSellVoteFileByAdmin({
        variables: { id: investFileList[idx]?.id },
      });
    }
  };

  const handleTitleChange = (idx: number, key: string, value: string) => {
    setInvestFileList((prev) => {
      prev[idx].name = value;
      handleChange('docs', prev);
      return [...prev];
    });
  };

  const handleChange = (key: string, value: any) => {
    setNewVariables((prev: any) => {
      let newVariables: any = { ...prev };
      newVariables[key] = value;
      return newVariables;
    });
  };

  const createHandleClick = () => {
    createProjectSellVoteByAdmin({
      variables: {
        ...newVariables,
        projectId,
        docs: investFileList,
      },
    });
  };

  const updateVoteData = () => {
    updateProjectSellVoteByAdmin({
      variables: newVariables,
    });
  };

  const [findCompanyData] = useLazyQuery(FIND_MANY_COMPANY_DATA, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTimes({ ...data.findCompanyData });
    },
  });

  const [findManySellVoteByAdmin] = useLazyQuery(FIND_MANY_SELL_VOTE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTotalCount(data.findManySellVoteByAdmin.totalCount);
      setSellvoteData(data.findManySellVoteByAdmin.sellVotes);
    },
  });

  const [createProjectSellVoteByAdmin, { loading }] = useMutation(
    CREATE_PROJECT_SELL_VOTE_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (_data) => {
        notification.success({ message: '매각투표를 생성하였습니다.' });
        handleRefetch();
      },
    },
  );

  const [createProjectSellVoteFileByAdmin] = useMutation(CREATE_PROJECT_SELL_VOTE_FILE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      handleRefetch();
    },
  });

  const [deleteProjectSellVoteFileByAdmin] = useMutation(DELETE_PROJECT_SELL_VOTEFILE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      handleRefetch();
    },
  });

  const [updateProjectSellVoteByAdmin] = useMutation(UPDATE_PROJECT_SELL_VOTE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '투표정보를 저장하였습니다.' });
      handleRefetch();
    },
  });

  const [updateVoteKindByAdmin] = useMutation(UPDATE_VOTE_KIND_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      if (data.updateVoteKindByAdmin.id === 2) {
        notification.success({ message: '투표가 부결되었습니다.' });
      } else {
        notification.success({ message: '투표가 가결되었습니다.' });
      }
      setPopoverVisible(false);
      findManySellVoteByAdmin({
        variables: {
          projectSellVoteId: projectSellVoteId,
          skip,
          take,
        },
        fetchPolicy: 'no-cache',
      });
    },
  });

  useEffect(() => {
    if (variables?.id) {
      setProjectSellVoteId(variables?.id);
    }
    if (projectSellVoteId !== 0) {
      findManySellVoteByAdmin({
        variables: {
          projectSellVoteId: projectSellVoteId,
          skip,
          take,
        },
        fetchPolicy: 'no-cache',
      });
    }
    findCompanyData();
    setNewVariables([]);
    if (variables) {
      setNewVariables(variables);
      setInvestFileList(variables?.docs);
    } else {
      setInvestFileList([
        {
          file: null,
          name: '',
        },
      ]);
    }

    if (voteTotalCount < voteCurrent) {
      setDisable(false);
    } else {
      if (voteTotalCount === voteCurrent && voteState === '매각투표 예정') {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [variables, voteCurrent, projectSellVoteId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <S.Container>
      <S.Wrap>
        <S.Title style={{ border: 'none', justifyContent: 'flex-start', fontWeight: 'bold' }}>
          매각 요청 정보
        </S.Title>
        <S.Btns>
          {disable ? (
            voteState === '매각투표 중' &&
            voteTotalCount === voteCurrent && (
              <Popover
                open={popoverVisible}
                content={PopupContent}
                title=""
                trigger="click"
                placement="bottom"
                color="white"
              >
                <Button type="primary" onClick={() => setPopoverVisible(true)}>
                  투표하기
                </Button>
              </Popover>
            )
          ) : voteState === undefined ? (
            <Button onClick={createHandleClick} type="primary">
              매각투표 생성
            </Button>
          ) : (
            <Button onClick={updateVoteData} type="primary">
              수정하기
            </Button>
          )}
        </S.Btns>
      </S.Wrap>
      <InputBasic
        handleChange={handleChange}
        title="TABS 명칭"
        value={tabsName}
        essential={false}
        disable
      />
      <InputBasic
        handleChange={handleChange}
        saveName="requestSellAmount"
        title="매각요청금액(원)"
        value={newVariables ? +newVariables?.requestSellAmount : +variables?.requestSellAmount}
        essential={false}
        disable={disable}
      />
      <InputDate
        title="매각투표"
        titles={['시작일', '종료일', '매각일']}
        essential={false}
        saveNames={['sellVoteStartedAt', 'sellVoteEndedAt', 'soldDate']}
        disable={disable}
        values={
          newVariables
            ? [
                newVariables?.sellVoteStartedAt && moment(newVariables?.sellVoteStartedAt),
                newVariables?.sellVoteEndedAt && moment(newVariables?.sellVoteEndedAt),
                newVariables?.soldDate && moment(newVariables?.soldDate),
              ]
            : [
                moment(variables?.sellVoteStartedAt),
                moment(variables?.sellVoteEndedAt),
                moment(variables?.soldDate),
              ]
        }
        handleChange={handleChange}
      />
      <InputDate
        title="투표시간"
        titles={['시작시간', '종료시간', '투표종료시간']}
        timePicker={true}
        essential={false}
        disable
        values={[
          moment(`2022-01-01 ${times?.voteStartHour}`),
          moment(`2022-01-01 ${times?.voteEndHour}`),
          moment(`2022-01-01 ${times?.voteFinalHour}`),
        ]}
      />
      {variables?.voteKind === VoteKind.Favour && (
        <S.Wrap>
          <S.Title style={{ border: 'none', justifyContent: 'flex-start', fontWeight: 'bold' }}>
            투표 알림
          </S.Title>
          <S.Btns>
            <Button type="primary">알림톡 보내기</Button>
          </S.Btns>
        </S.Wrap>
      )}
      <S.Title style={{ border: 'none', justifyContent: 'flex-start', fontWeight: 'bold' }}>
        투자 관련 문서
      </S.Title>
      <Table
        pagination={false}
        columns={investfileColumns({
          handleDeleteFile,
          handleTitleChange,
          handleFileChange,
          disable: disable,
          isFix: variables ? true : false,
        })}
        dataSource={investFileList}
        scroll={{ x: 800 }}
        style={{
          marginTop: '30px',
          width: '1300px',
        }}
      />
      {!disable && (
        <div style={{ width: '1300px', display: 'flex' }}>
          <Button
            onClick={() => setInvestFileList([...investFileList, { file: null, name: '' }])}
            type="primary"
            style={{ width: '200px', margin: '20px auto' }}
          >
            투자관련문서 추가
          </Button>
        </div>
      )}
      {disable && (
        <>
          <S.Wrap>
            <S.Title style={{ border: 'none', justifyContent: 'flex-start', fontWeight: 'bold' }}>
              매각 투표 진행률
            </S.Title>
            <S.Btns style={{ fontWeight: 'bold' }}>
              {nowAmount?.toLocaleString() + ' / ' + requestSellAmount?.toLocaleString()}
            </S.Btns>
          </S.Wrap>
          <S.Bar>
            <S.BarState style={{ width: `${variables ? 100 - variables?.undoRatio : 0}%` }}>
              <span>{variables ? 100 - variables?.undoRatio : 0}%</span>
            </S.BarState>
          </S.Bar>
          <S.Title style={{ border: 'none', justifyContent: 'flex-start', fontWeight: 'bold' }}>
            매각 투표 현황
          </S.Title>
          <Table
            columns={sellvoteColumns({})}
            dataSource={sellvoteData}
            scroll={{ x: 800 }}
            style={{
              marginTop: '30px',
              width: '1300px',
            }}
            pagination={{
              position: ['bottomCenter'],
              showSizeChanger: true,
              onChange: handlePagination,
              onShowSizeChange: (_current, size) => setTake(size),
              total: voteTotalCount,
              current: voteCurrent,
            }}
          />
        </>
      )}
    </S.Container>
  );
}
