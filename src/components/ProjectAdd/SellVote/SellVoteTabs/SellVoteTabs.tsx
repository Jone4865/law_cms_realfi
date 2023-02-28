import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, notification, Popover, Table } from 'antd';
import { UploadFile } from 'antd/es/upload';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  DocInCreateProjectByAdminArgs,
  FindCompanyDataQuery,
  FindManySellVoteByAdminOutput,
} from '../../../../graphql/generated/graphql';
import {
  CREATE_PROJECT_SELL_VOTE_BY_ADMIN,
  UPDATE_VOTE_KIND_BY_ADMIN,
} from '../../../../graphql/mutation';
import { FIND_MANY_COMPANY_DATA } from '../../../../graphql/query/findCompanyData';
import { investfileColumns, sellvoteColumns } from '../../../../utils/columns';
import { InputBasic } from '../../InputBasic/InputBasic';
import { InputDate } from '../../InputDate/InputDate';
import * as S from './style';

type Props = {
  projectId: number | undefined | '';
  tabsName: string;
  variables: any;
  totalSellVoteCount: number;
  projectState: string[];
};

export function SellVoteTabs({
  projectId = 1,
  tabsName,
  variables,
  totalSellVoteCount,
  projectState,
}: Props) {
  const [sellVote] = useState(true);
  const [newVariables, setNewVariables] = useState<any>();
  const [sellvoteData, setSellvoteData] = useState<FindManySellVoteByAdminOutput['sellVotes']>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [projectSellVoteId, setProjectSellVoteId] = useState(0);
  const [times, setTimes] = useState<FindCompanyDataQuery['findCompanyData']>();
  const [lastSellVote, setLastSellVote] = useState(false);

  const [investFileList, setInvestFileList] = useState<DocInCreateProjectByAdminArgs[]>([
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
        <Button>가결</Button>
        <Button type="primary">부결</Button>
      </div>
    </div>
  );

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleInvestChange = (file: UploadFile<any>, index: number) => {
    setInvestFileList((prev) => {
      prev[index].file = file;
      handleChange('docs', prev);
      return [...prev];
    });
  };

  const investDeleteClick = (idx: number) => () => {
    setInvestFileList(investFileList.filter((_v, i) => i !== idx));
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

  const handleRow = (rec: any) => {};

  const createHandleClick = () => {
    createProjectSellVoteByAdmin({
      variables: {
        ...newVariables,
        projectId,
        docs: investFileList,
      },
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

  const [createProjectSellVoteByAdmin] = useMutation(CREATE_PROJECT_SELL_VOTE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '매각투표를 생성하였습니다.' });
    },
  });

  const [updateVoteKindByAdmin] = useMutation(UPDATE_VOTE_KIND_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '매각투표를 생성하였습니다.' });
    },
  });

  // useEffect(() => {
  //   updateVoteKindByAdmin({
  //     variables: {
  //       projectId: +projectId,
  //       voteKind: VoteKind.Against,
  //     },
  //   });
  // }, []);

  useEffect(() => {
    findCompanyData();
    setNewVariables(variables);
    if (
      (variables?.no === totalSellVoteCount && projectState[2] === '매각투표 중') ||
      variables?.no === undefined
    ) {
      setLastSellVote(true);
      setInvestFileList([
        {
          file: null,
          name: '',
        },
      ]);
    } else {
      setInvestFileList(variables?.docs);
      setLastSellVote(false);
    }
  }, [variables]);

  useEffect(() => {}, [investFileList]);

  return (
    <S.Container>
      <S.Wrap>
        <S.Title style={{ border: 'none', justifyContent: 'flex-start', fontWeight: 'bold' }}>
          매각 요청 정보
        </S.Title>
        <S.Btns>
          {lastSellVote ? (
            projectState[2] === '매각투표 중' ? (
              <Popover
                content={PopupContent}
                title=""
                trigger="click"
                placement="bottom"
                color="white"
              >
                <Button type="primary">투표하기</Button>
              </Popover>
            ) : projectState[2] === '매각투표 예정' ? (
              <Button type="primary">수정하기</Button>
            ) : (
              <Button onClick={createHandleClick} type="primary">
                매각투표 생성
              </Button>
            )
          ) : (
            ''
          )}
        </S.Btns>
      </S.Wrap>
      <InputBasic
        handleChange={handleChange}
        title="TABS 명칭"
        value={tabsName}
        essential={false}
        disable={true}
      />
      <InputBasic
        handleChange={handleChange}
        saveName="requestSellAmount"
        title="매각요청금액(원)"
        value={lastSellVote ? +newVariables?.requestSellAmount : +variables?.requestSellAmount}
        essential={false}
        disable={lastSellVote ? false : true}
      />
      <InputDate
        title="매각투표"
        titles={['시작일', '종료일', '매각일']}
        essential={false}
        saveNames={['sellVoteStartedAt', 'sellVoteEndedAt', 'soldDate']}
        values={
          lastSellVote
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
        disable={lastSellVote ? false : true}
      />
      <InputDate
        title="투표시간"
        titles={['시작시간', '종료시간', '투표종료시간']}
        timePicker={true}
        essential={false}
        disable={true}
        values={[
          moment(`2022-01-01 ${times?.voteStartHour}`),
          moment(`2022-01-01 ${times?.voteEndHour}`),
          moment(`2022-01-01 ${times?.voteFinalHour}`),
        ]}
      />
      {lastSellVote && (
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
          handleInvestChange,
          investDeleteClick,
          handleTitleChange,
          sellVote,
          lastSellVote,
        })}
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
          width: '1300px',
        }}
      />
      {lastSellVote && investFileList?.length < 20 && (
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
      <S.Wrap>
        <S.Title style={{ border: 'none', justifyContent: 'flex-start', fontWeight: 'bold' }}>
          매각 투표 진행률
        </S.Title>
        <S.Btns>숫자</S.Btns>
      </S.Wrap>
      <S.Bar>
        <S.BarState style={{ width: '30%' }}>dd</S.BarState>
      </S.Bar>
      <S.Title style={{ border: 'none', justifyContent: 'flex-start', fontWeight: 'bold' }}>
        매각 투표 현황
      </S.Title>
      <Table
        columns={sellvoteColumns({})}
        dataSource={sellvoteData}
        // loading={loading}
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
          total: totalCount,
          current: current,
        }}
      />
    </S.Container>
  );
}
