import { useLazyQuery } from '@apollo/client';
import { Button, Input, notification, TimePicker } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import TransformBox from '../../components/TransformBox';
import { FindCompanyDataQuery } from '../../graphql/generated/graphql';
import { FIND_MANY_COMPANY_DATA } from '../../graphql/query/findCompanyData';
import * as S from './style';

export function Setting() {
  const btns = ['수수료 관리', '설정 관리'];
  const [nowAble, setNowAble] = useState('수수료 관리');
  const [settingData, setSettingData] = useState<FindCompanyDataQuery['findCompanyData']>();

  const [findCompanyData, { loading }] = useLazyQuery(FIND_MANY_COMPANY_DATA, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setSettingData({ ...data.findCompanyData });
    },
  });

  useEffect(() => {
    findCompanyData();
  }, []);

  const handleChange = (key: string, value: any) => {
    setSettingData((prev: any) => {
      let newData: any = { ...prev };
      newData[key] = value;
      return newData;
    });
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
              <Input
                value={settingData?.feeRatio}
                style={{ width: '170px', margin: '0 10px', textAlign: 'right' }}
                onChange={(e) => handleChange('feeRatio', e.target.value)}
              />
              <span>%</span>
            </S.ChargeWrap>
            <S.Hr />
            <S.ChargeWrap>
              <div>배당 소득세</div>
              <Input
                value={settingData?.incomeTaxRatio}
                style={{ width: '170px', margin: '0 10px', textAlign: 'right' }}
                onChange={(e) => handleChange('incomeTaxRatio', e.target.value)}
              />
              <span>%</span>
            </S.ChargeWrap>
            <S.ChargeWrap>
              <div>지방 소득세</div>
              <Input
                value={settingData?.localIncomeTaxRatio}
                style={{ width: '170px', margin: '0 10px', textAlign: 'right' }}
                onChange={(e) => handleChange('localIncomeTaxRatio', e.target.value)}
              />
              <span>%</span>
            </S.ChargeWrap>
            <Button type="primary" style={{ marginLeft: '100px' }}>
              저장
            </Button>
          </S.Charge>
        )}
        {/* {nowAble === '팝업 관리' && (
          <S.PopupWrap>
            <TransformBox justifyContent="flex-end">
              <Button type="primary" onClick={() => setVisible(!visible)}>
                팝업 등록
              </Button>
            </TransformBox>
            <SettingPopupDetailModal
              // visible={visible}
              // handleCancel={handleCancel}
              // refetch={() => {}}
              data={modalData}
            />
            <Table
              // columns={SettingColumns({ startDate, endDate, setStartDate, setEndDate })}
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
        )} */}
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
                  <TimePicker
                    onChange={(v) => handleChange('marketStartHour', v)}
                    value={moment(`2022-01-01 ${settingData?.marketStartHour}`)}
                    format={'HH:mm'}
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      marginLeft: '5px',
                    }}
                  />
                  <TimePicker
                    onChange={(v) => handleChange('publicOfferingEndHour', v)}
                    value={moment(`2022-01-01 ${settingData?.marketStartHour}`)}
                    format={'HH:mm'}
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      marginLeft: '5px',
                    }}
                  />
                  <TimePicker
                    onChange={(v) => handleChange('publicOfferingFinalHour', v)}
                    value={moment(`2022-01-01 ${settingData?.marketStartHour}`)}
                    format={'HH:mm'}
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      marginLeft: '5px',
                    }}
                  />
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
                  <TimePicker
                    onChange={(v) => handleChange('marketStartHour', v)}
                    value={moment(`2022-01-01 ${settingData?.marketStartHour}`)}
                    format={'HH:mm'}
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      marginLeft: '5px',
                    }}
                  />
                  <TimePicker
                    onChange={(v) => handleChange('marketEndHour', v)}
                    value={moment(`2022-01-01 ${settingData?.marketStartHour}`)}
                    format={'HH:mm'}
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      marginLeft: '5px',
                    }}
                  />
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
                  <TimePicker
                    onChange={(v) => handleChange('voteStartHour', v)}
                    value={moment(`2022-01-01 ${settingData?.marketStartHour}`)}
                    format={'HH:mm'}
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      marginLeft: '5px',
                    }}
                  />
                  <TimePicker
                    onChange={(v) => handleChange('voteEndHour', v)}
                    value={moment(`2022-01-01 ${settingData?.marketStartHour}`)}
                    format={'HH:mm'}
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      marginLeft: '5px',
                    }}
                  />
                  <TimePicker
                    onChange={(v) => handleChange('voteFinalHour', v)}
                    value={moment(`2022-01-01 ${settingData?.marketStartHour}`)}
                    format={'HH:mm'}
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      marginLeft: '5px',
                    }}
                  />
                </S.SettingsInputs>
              </S.SettingsRight>
            </S.SettingsWrap>
          </S.Settings>
        )}
      </S.Bottom>
    </div>
  );
}
