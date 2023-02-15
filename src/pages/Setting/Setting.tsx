import { Button, Input, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { SettingPopupDetailModal } from '../../components/SettingPopupDetailModal';
import TransformBox from '../../components/TransformBox';
import { settingColumns } from '../../utils/columns';
import * as S from './style';

export function Setting() {
  const btns = ['수수료 관리', '팝업 관리', '설정 관리'];
  const [nowAble, setNowAble] = useState('수수료 관리');
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [modalData, setModalData] = useState();
  const [popupData, setPopupData] = useState([
    {
      id: 1,
      location: 'ㅇㅁㅈㅇㅁㅈㅇㅈㅁ',
      startDate: new Date(),
      endDate: new Date(),
      url: ';dadawdwa',
      image: 'dadwadawdaw',
    },
  ]);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const handleClickRow = (rec: any) => {
    setModalData(rec);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setModalData(undefined);
  };

  return (
    <div>
      <S.Title>전체설정</S.Title>
      <S.BtnsWrap>
        {btns.map((item, idx) =>
          item === nowAble ? (
            <S.AbleBtn key={item} onClick={() => setNowAble(item)}>
              {item}
            </S.AbleBtn>
          ) : (
            <S.Btn key={item} onClick={() => setNowAble(item)}>
              {item}
            </S.Btn>
          ),
        )}
      </S.BtnsWrap>
      <S.Bottom>
        {nowAble === '수수료 관리' && (
          <S.Charge>
            <S.ChargeWrap>
              <div>거래 수수료</div>
              <Input style={{ width: '170px', margin: '0 10px' }} />
              <span>%</span>
              <S.ChargeBtn>수정</S.ChargeBtn>
            </S.ChargeWrap>
            <S.Hr />
            <S.ChargeWrap>
              <div>배당 소득세</div>
              <Input style={{ width: '170px', margin: '0 10px' }} />
              <span>%</span>
              <S.ChargeBtn>수정</S.ChargeBtn>
            </S.ChargeWrap>
            <S.ChargeWrap>
              <div>지방 소득세</div>
              <Input style={{ width: '170px', margin: '0 10px' }} />
              <span>%</span>
              <S.ChargeBtn>수정</S.ChargeBtn>
            </S.ChargeWrap>
          </S.Charge>
        )}
        {nowAble === '팝업 관리' && (
          <S.PopupWrap>
            <TransformBox justifyContent="flex-end">
              <Button type="primary" onClick={() => setVisible(!visible)}>
                팝업 등록
              </Button>
            </TransformBox>
            <SettingPopupDetailModal
              visible={visible}
              handleCancel={handleCancel}
              refetch={() => {}}
              data={modalData}
            />
            <Table
              columns={settingColumns({ startDate, endDate, setStartDate, setEndDate })}
              dataSource={popupData}
              pagination={{
                position: ['bottomCenter'],
                showSizeChanger: true,
                onChange: handlePagination,
                total: totalCount,
                current: current,
              }}
              // loading={loading}
              style={{
                marginTop: 30,
              }}
              onRow={(rec: any) => {
                return {
                  onClick: () => handleClickRow(rec),
                };
              }}
              scroll={{ x: 800 }}
            />
          </S.PopupWrap>
        )}
        {nowAble === '설정 관리' && (
          <S.Settings>
            <TransformBox justifyContent="center" marginTop="15px">
              <Button type="primary">저장</Button>
            </TransformBox>
            <S.SettingsWrap>
              <S.SettingsTitle>공모 시간 설정</S.SettingsTitle>
              <S.SettingsRight>
                <S.SettingsDivTitle>
                  <div>시작시간 :</div>
                  <div>종료시간 :</div>
                  <div>공모 종료일 종료시간 :</div>
                </S.SettingsDivTitle>
                <S.SettingsInputs>
                  <Input style={{ width: '150px', margin: '3px 10px' }} />
                  <Input style={{ width: '150px', margin: '3px 10px' }} />
                  <Input style={{ width: '150px', margin: '3px 10px' }} />
                </S.SettingsInputs>
              </S.SettingsRight>
            </S.SettingsWrap>
            <S.SettingsWrap>
              <S.SettingsTitle>마켓 거래 시간 설정</S.SettingsTitle>
              <S.SettingsRight>
                <S.SettingsDivTitle>
                  <div>시작시간 :</div>
                  <div>종료시간 :</div>
                </S.SettingsDivTitle>
                <S.SettingsInputs>
                  <Input style={{ width: '150px', margin: '3px 10px' }} />
                  <Input style={{ width: '150px', margin: '3px 10px' }} />
                </S.SettingsInputs>
              </S.SettingsRight>
            </S.SettingsWrap>
            <S.SettingsWrap>
              <S.SettingsTitle>매각 투표 시간 설정</S.SettingsTitle>
              <S.SettingsRight>
                <S.SettingsDivTitle>
                  <div>시작시간 :</div>
                  <div>종료시간 :</div>
                  <div>투표 종료일 종료시간 :</div>
                </S.SettingsDivTitle>
                <S.SettingsInputs>
                  <Input style={{ width: '150px', margin: '3px 10px' }} />
                  <Input style={{ width: '150px', margin: '3px 10px' }} />
                  <Input style={{ width: '150px', margin: '3px 10px' }} />
                </S.SettingsInputs>
              </S.SettingsRight>
            </S.SettingsWrap>
          </S.Settings>
        )}
      </S.Bottom>
    </div>
  );
}
