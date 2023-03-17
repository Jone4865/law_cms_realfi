import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Button, notification, Popover, Table } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import {
  ApproveStatus,
  FindManyChangeInvestmentQualificationByAdminOutput,
  FindManyChangeInvestmentQualificationByAdminQuery,
  TreatChangeInvestmentQualificationByAdminMutation,
} from '../../graphql/generated/graphql';
import { FIND_MANY_CHANGE_INVESTMENT_QUALIFICATION_BY_ADMIN } from '../../graphql/query';
import { userChangeColumns, userChangeFileColumns } from '../../utils/columns';
import { ChangeQualificationModal } from '../../components/Users/ChangeQualificationModal/ChangeQualificationModal';
import * as S from './style';
import { TREAT_CHANGE_INVESTMENT_QUILIFICATION_BY_ADMIN } from '../../graphql/mutation';
import { useCookies } from 'react-cookie';

export function ChangeDetail() {
  const params = useParams();
  const [cookies] = useCookies(['accessToken']);
  const [modalVisible, setModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [startDate] = useState(moment());
  const [endDate] = useState(moment());
  const [detailData, setDetailData] =
    useState<
      FindManyChangeInvestmentQualificationByAdminOutput['changeInvestmentQualifications']
    >();
  const [investmentDocuments, setInvestmentDocuments] =
    useState<
      FindManyChangeInvestmentQualificationByAdminOutput['changeInvestmentQualifications'][0]['investmentDocuments']
    >();
  const [reason, setReason] = useState('');
  const [id, setId] = useState(0);
  const [approveStatus, setApproveStatus] = useState(ApproveStatus.Wait);

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
      <div>승인하시겠습니까?</div>
      <div
        style={{
          width: '120px',
          justifyContent: 'space-between',
          display: 'flex',
          marginTop: '5px',
        }}
      >
        <Button onClick={() => setPopoverVisible(false)}>취소</Button>
        <Button onClick={() => handleClick('APPROVED')} type="primary">
          확인
        </Button>
      </div>
    </div>
  );

  const handleClick = (kind: string) => {
    if (kind === 'APPROVED') {
      treatChangeInvestmentQualificationByAdmin({
        variables: {
          id,
          approveStatus: ApproveStatus.Approved,
        },
      });
      setPopoverVisible(false);
    } else {
      if (reason === '') {
        return notification.warning({ message: '이유를 입력해주세요.' });
      }
      treatChangeInvestmentQualificationByAdmin({
        variables: {
          id,
          approveStatus: ApproveStatus.Rejected,
          reason,
        },
      });
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const [findManyChangeInvestmentQualificationByAdmin] =
    useLazyQuery<FindManyChangeInvestmentQualificationByAdminQuery>(
      FIND_MANY_CHANGE_INVESTMENT_QUALIFICATION_BY_ADMIN,
      {
        onError: (error) => {
          notification.error({ message: error.message });
        },
        onCompleted: (data) => {
          setInvestmentDocuments(
            data.findManyChangeInvestmentQualificationByAdmin.changeInvestmentQualifications[0]
              .investmentDocuments,
          );
          setApproveStatus(
            data.findManyChangeInvestmentQualificationByAdmin.changeInvestmentQualifications[0]
              .approveStatus,
          );
          setId(
            data.findManyChangeInvestmentQualificationByAdmin.changeInvestmentQualifications[0].id,
          );
          setDetailData(
            data.findManyChangeInvestmentQualificationByAdmin.changeInvestmentQualifications,
          );
        },
      },
    );

  const [treatChangeInvestmentQualificationByAdmin] =
    useMutation<TreatChangeInvestmentQualificationByAdminMutation>(
      TREAT_CHANGE_INVESTMENT_QUILIFICATION_BY_ADMIN,
      {
        onError: (error) => {
          notification.error({ message: error.message });
        },
        onCompleted: (_data) => {
          notification.success({ message: '투자자격 신청을 처리하였습니다.' });
        },
      },
    );

  const handleClickDownload = async () => {
    axios(
      `${process.env.REACT_APP_SERVER_BASIC}/investment-document?name=0e69dbf9-4de7-4dd6-b843-a0dca4258d65.pdf`,
      {
        method: 'GET',
        withCredentials: true,
      },
    );
  };

  useEffect(() => {
    findManyChangeInvestmentQualificationByAdmin({
      variables: {
        take: 1,
        skip: 0,
        searchText: params.userName,
        gte: startDate.subtract(2, 'year').format('YYYY-MM-DD'),
        lt: endDate.add(1, 'd').format('YYYY-MM-DD'),
      },
      fetchPolicy: 'no-cache',
    });
  }, [startDate, endDate, modalVisible, popoverVisible]);

  return (
    <>
      {modalVisible && (
        <ChangeQualificationModal
          handleCancel={handleCancel}
          visible={modalVisible}
          handleClick={handleClick}
          setReason={setReason}
          reason={reason}
        />
      )}
      <S.Title>{params.userName} 회원 자격변경 상세정보</S.Title>
      <Button onClick={handleClickDownload}>테스트</Button>
      <S.Wrap>
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
          style={{ marginRight: '10px' }}
        >
          반려
        </Button>
        <Popover
          open={popoverVisible}
          content={PopupContent}
          title=""
          trigger="click"
          placement="bottom"
          color="white"
        >
          <Button onClick={() => setPopoverVisible(true)} type="primary">
            승인
          </Button>
        </Popover>
      </S.Wrap>
      <Table
        columns={userChangeColumns({ detail: true })}
        dataSource={detailData}
        pagination={false}
        // loading={loading}
        style={{
          marginTop: 30,
          marginBottom: 50,
        }}
        scroll={{ x: 800 }}
      />
      <S.Title>제출서류 (금융 전문가 유형)</S.Title>
      <Table
        columns={userChangeFileColumns()}
        dataSource={investmentDocuments}
        pagination={false}
        // loading={loading}
        style={{
          marginTop: 30,
          marginBottom: 50,
        }}
        scroll={{ x: 800 }}
      />
    </>
  );
}
