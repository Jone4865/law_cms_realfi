/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** 지갑 거래내역 조회 output - 계좌 */
export type AccountInFindManyWalletTransferByUserOutput = {
  /** 예금주 */
  accountHolder: Scalars['String'];
  /** 계좌번호 */
  accountNumber: Scalars['String'];
  /** 은행 */
  bank: BankModel;
  /** ID */
  id: Scalars['Int'];
  /** 주계좌 여부 */
  isMainAccount: Scalars['Boolean'];
};

/** 내 지갑 조회 - output - 계좌 */
export type AccountInFindWalletByUserOutput = {
  /** 계좌번호 */
  accountNumber: Scalars['String'];
  /** 은행 */
  bank: BankInFindWalletByUserOutput;
};

/** 지갑 거래 조회 output - 계좌 */
export type AccountInFindWalletTransferByUserOutput = {
  /** 예금주 */
  accountHolder: Scalars['String'];
  /** 계좌번호 */
  accountNumber: Scalars['String'];
  /** 은행 */
  bank: BankModel;
  /** ID */
  id: Scalars['Int'];
  /** 주계좌 여부 */
  isMainAccount: Scalars['Boolean'];
};

/** 투자자격변경요청 목록 조회 (관리자) output - 관리자 */
export type AdminInFindManyChangeInvestmentQualificationByAdminOutput = {
  /** 이름 */
  name: Scalars['String'];
};

/** FAQ 목록 조회 (관리자) - output - 작성한 관리자 */
export type AdminInFindManyFaqByAdminOutput = {
  /** 이름 */
  name: Scalars['String'];
};

/** 공지사항 목록 조회 (관리자) - output - 작성한 관리자 */
export type AdminInFindManyNoticeByAdminOutput = {
  /** 이름 */
  name: Scalars['String'];
};

/** 1:1 문의 목록 조회 (관리자) - output - 답변한 관리자 */
export type AdminInFindManyUserInquiryByAdminOutput = {
  /** 이름 */
  name: Scalars['String'];
};

/** 관리자 */
export type AdminModel = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 이메일 */
  email: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 구글 OTP Secret */
  otpSecret?: Maybe<Scalars['String']>;
  /** 권한명 */
  role: Role;
};

/** 승인 상태 */
export enum ApproveStatus {
  /** 승인 */
  Approved = 'APPROVED',
  /** 반려 */
  Rejected = 'REJECTED',
  /** 대기 */
  Wait = 'WAIT'
}

/** 내 지갑 조회 - output - 은행 */
export type BankInFindWalletByUserOutput = {
  /** ID */
  id: Scalars['Int'];
  /** 은행명 */
  name: Scalars['String'];
};

/** 은행 */
export type BankModel = {
  /** 은행 코드 */
  code: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 은행명 */
  name: Scalars['String'];
};

/** 매수 목록 */
export type BuyHistoryByOrderBook = {
  /** 호가 (원) */
  askPrice: Scalars['String'];
  /** 수량 */
  count: Scalars['Int'];
};

/** 투자자격변경요청 목록 조회 (관리자) output - 투자자격변경요청 */
export type ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput = {
  /** 관리자 */
  admin?: Maybe<AdminInFindManyChangeInvestmentQualificationByAdminOutput>;
  /** 요청 승인 상태 */
  approveStatus: ApproveStatus;
  /** 요청일 */
  createdAt: Scalars['Date'];
  /** 투자 자격 변경 요청 ID */
  id: Scalars['Int'];
  investmentDocuments: Array<InvestmentDocumentInFindManyChangeInvestmentQualificationByAdminOutput>;
  /** 희망 투자자격 */
  investmentQualification: InvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput;
  /** 희망 투자유형 */
  investmentType: InvestmentTypeInFindManyChangeInvestmentQualificationByAdminOutput;
  /** 기존 투자자격 */
  originInvestmentQualification: InvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput;
  /** (반려일 경우,) 사유 */
  reason?: Maybe<Scalars['String']>;
  /** 처리일 */
  treatedAt?: Maybe<Scalars['Date']>;
  /** 요청한 회원 */
  user: UserInFindManyChangeInvestmentQualificationByAdminOutput;
};

/** 투자 자격 변경 요청 */
export type ChangeInvestmentQualificationModel = {
  /** 요청 승인 상태 */
  approveStatus: ApproveStatus;
  /** 요청일 */
  createdAt: Scalars['Date'];
  /** 투자 자격 변경 요청 ID */
  id: Scalars['Int'];
  /** (반려일 경우,) 사유 */
  reason?: Maybe<Scalars['String']>;
  /** 처리일 */
  treatedAt?: Maybe<Scalars['Date']>;
};

/** 차트 데이터 (RS) */
export type ChartDataModel = {
  /** 종가 */
  close: Scalars['Float'];
  /** 고가 */
  high: Scalars['Float'];
  /** 저가 */
  low: Scalars['Float'];
  /** 시가 */
  open: Scalars['Float'];
  /** 시간 */
  time: Scalars['Int'];
};

/** 전체 설정 */
export type CompanyDataModel = {
  /** 수수료율 (%) */
  feeRatio: Scalars['String'];
  /** 소득세율 (%) */
  incomeTaxRatio: Scalars['String'];
  /** 지방소득세율 (%) */
  localIncomeTaxRatio: Scalars['String'];
  /** 마켓 종료 시간 (ex. 17:00) */
  marketEndHour: Scalars['String'];
  /** 마켓 시작 시간 (ex. 09:00) */
  marketStartHour: Scalars['String'];
  /** 공모 종료 시간 (ex. 17:00) */
  publicOfferingEndHour: Scalars['String'];
  /** 공모 종료일 시간 (ex. 15:00) */
  publicOfferingFinalHour: Scalars['String'];
  /** 공모 시작 시간 (ex. 09:00) */
  publicOfferingStartHour: Scalars['String'];
  /** 매각 투표 종료 시간 (ex. 17:00) */
  voteEndHour: Scalars['String'];
  /** 매각 투표 종료일 시간 (ex. 15:00) */
  voteFinalHour: Scalars['String'];
  /** 매각 투표 시작 시간 (ex. 09:00) */
  voteStartHour: Scalars['String'];
};

/** 일일 거래정보 목록 조회 - output - 일일 거래정보 */
export type DailyTransactionInfoInFindManyDailyTransactionInfoOutput = {
  /** 종가 (원) */
  closePrice: Scalars['String'];
  /** 고가 (원) */
  dayHighPrice: Scalars['String'];
  /** 저가 (원) */
  dayLowPrice: Scalars['String'];
  /** 전일 대비 등락가 (원) */
  fluctuation: Scalars['String'];
  /** 전일 대비 등락률 (%) */
  fluctuationRatio: Scalars['String'];
  /** 시가 (원) */
  openPrice: Scalars['String'];
  /** 전일 기준가 */
  standardPrice: Scalars['String'];
  /** 총 거래량 (TABS) */
  totalVolume: Scalars['Int'];
};

/** 일일 거래 정보 */
export type DailyTransactionInfoModel = {
  /** 종가 (원) */
  closePrice: Scalars['String'];
  /** 고가 (원) */
  dayHighPrice: Scalars['String'];
  /** 저가 (원) */
  dayLowPrice: Scalars['String'];
  /** 전일 대비 등락가 (원) */
  fluctuation: Scalars['String'];
  /** 전일 대비 등락률 (%) */
  fluctuationRatio: Scalars['String'];
  /** 하한가 (원) */
  lowerLimitPrice: Scalars['String'];
  /** 시가 (원) */
  openPrice: Scalars['String'];
  /** 전일 기준가 */
  standardPrice: Scalars['String'];
  /** 총 거래 대금(원) */
  totalTransactionAmount: Scalars['String'];
  /** 총 거래량 (TABS) */
  totalVolume: Scalars['Int'];
  /** 상한가 (원) */
  upperLimitPrice: Scalars['String'];
};

/** 배당자 목록 조회 (관리자) output - 배당자 */
export type DividendInFindManyDividendByAdminOutput = {
  /** 최종 배당금 (원) */
  calcDividend?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 전화번호 뒷자리 */
  phone: Scalars['String'];
  /** 보유 TABS 수 (TABS) */
  tabsCount: Scalars['Int'];
  /** 세금 (원) */
  tax?: Maybe<Scalars['String']>;
};

/** 지갑 거래내역 조회 output - 프로젝트 배당 */
export type DividendInFindManyWalletTransferByUserOutput = {
  /** 최종 배당금 (원) */
  calcDividend?: Maybe<Scalars['String']>;
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 보유 TABS 수 (TABS) */
  tabsCount: Scalars['Int'];
  /** 세금 (원) */
  tax?: Maybe<Scalars['String']>;
};

/** 투자관련문서 */
export type DocInCreateProjectByAdminArgs = {
  /** 투자관련문서 */
  file: Scalars['Upload'];
  /** 제목 */
  name: Scalars['String'];
};

/** 투자관련문서 */
export type DocInCreateProjectSellVoteArgs = {
  /** 투자관련문서 */
  file: Scalars['Upload'];
  /** 제목 */
  name: Scalars['String'];
};

/** FAQ 유형 */
export type FaqCategoryModel = {
  /** ID */
  id: Scalars['Int'];
  /** 유형명 */
  name: Scalars['String'];
};

/** FAQ 목록 조회 (관리자) - output - FAQ */
export type FaqInFindManyFaqByAdminOutput = {
  /** 작성한 관리자 */
  admin: AdminInFindManyFaqByAdminOutput;
  /** 답변 */
  answer: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** FAQ 유형 */
  faqCategory: FaqCategoryModel;
  /** ID */
  id: Scalars['Int'];
  /** 질문 */
  question: Scalars['String'];
};

/** FAQ 목록 조회 - output - FAQ */
export type FaqInFindManyFaqOutput = {
  /** 답변 */
  answer: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** FAQ 유형 */
  faqCategory: FaqCategoryModel;
  /** ID */
  id: Scalars['Int'];
  /** 질문 */
  question: Scalars['String'];
};

/** 파일 종류 */
export enum FileKind {
  /** 투자관련문서 */
  Docs = 'DOCS',
  /** 이미지 */
  Image = 'IMAGE',
  /** 공시 */
  OfficialInfo = 'OFFICIAL_INFO'
}

/** 실시간 거래정보 목록 조회 - output */
export type FindDailyTransactionInfoOutput = {
  /** 고가 (원) */
  dayHighPrice: Scalars['String'];
  /** 저가 (원) */
  dayLowPrice: Scalars['String'];
  /** 하한가 (원) */
  lowerLimitPrice: Scalars['String'];
  /** 시가 (원) */
  openPrice: Scalars['String'];
  /** 전일 기준가 */
  standardPrice: Scalars['String'];
  /** 총 거래 대금(원) */
  totalTransactionAmount: Scalars['String'];
  /** 총 거래량 (TABS) */
  totalVolume: Scalars['Int'];
  /** 상한가 (원) */
  upperLimitPrice: Scalars['String'];
};

export type FindDeleteConditionByUserOutput = {
  /** 배당금 조건 */
  dividendCondition: Scalars['Boolean'];
  /** 공모 조건 */
  publicOfferingCondition: Scalars['Boolean'];
  /** TABS 지갑 조건 */
  tabsWalletCondition: Scalars['Boolean'];
  /** 미체결 조건 */
  unsignedCondition: Scalars['Boolean'];
  /** 예치금 지갑 조건 */
  walletCondition: Scalars['Boolean'];
};

/** 투자 자격 조회 (회원) output */
export type FindInvestmentQualificationByUserOutput = {
  /** 투자 자격 변경 신청 정보 */
  changeInvestmentQualification?: Maybe<ChangeInvestmentQualificationModel>;
  /** 투자 유형 목록 */
  investmentQualification: InvestmentQualificationInFindInvestmentQualificationByUserOutput;
};

/** 투자 유형 조회 (회원) output */
export type FindInvestmentTypeByUserOutput = {
  /** 유형 설명 */
  description: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 필요한 서류 목록 */
  investmentDocumentCategories: Array<InvestmentDocumentCategoryModel>;
  /** 유형명 (ex. 근로 소득 유형) */
  name: Scalars['String'];
};

/** 투자자격변경요청 목록 조회 (관리자) output */
export type FindManyChangeInvestmentQualificationByAdminOutput = {
  changeInvestmentQualifications: Array<ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

export type FindManyChartDataOutput = {
  /** 차트 데이터 */
  datas: Array<ChartDataModel>;
  /** 프로젝트 ID */
  projectId: Scalars['Int'];
};

/** 일일 거래정보 목록 조회 - output */
export type FindManyDailyTransactionInfoOutput = {
  /** 일일 거래정보 목록 */
  dailyTransactionInfos: Array<DailyTransactionInfoInFindManyDailyTransactionInfoOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 배당자 목록 조회 (관리자) output */
export type FindManyDividendByAdminOutput = {
  /** 배당자 목록 */
  dividends: Array<DividendInFindManyDividendByAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** FAQ 목록 조회 (관리자) - output */
export type FindManyFaqByAdminOutput = {
  /** FAQ 목록 */
  faqs: Array<FaqInFindManyFaqByAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** FAQ 목록 조회 - output */
export type FindManyFaqOutput = {
  /** FAQ 목록 */
  faqs: Array<FaqInFindManyFaqOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

export type FindManyInvestmentQualificationByUserOutput = {
  /** 투자 자격 목록 */
  investmentQualifications: Array<InvestmentQualificationInFindManyInvestmentQualificationByUserOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 마켓 거래중 프로젝트 목록 조회 - output */
export type FindManyMarketListedProjectOutput = {
  projects: Array<ProjectInFindManyMarketListedProjectOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 프로젝트별 마켓 거래내역 조회 output */
export type FindManyMarketTransferByProjectOutput = {
  /** 프로젝트별 마켓 거래내역 */
  marketTransfers: Array<MarketTransferInFindManyMarketTransferByProjectOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 마켓 거래내역 조회 - output */
export type FindManyMarketTransferByUserOutput = {
  /** 마켓 거래내역 */
  marketTransfers: Array<MarketTransferInFindManyMarketTransferByUserOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 공지사항 목록 조회 (관리자) - output */
export type FindManyNoticeByAdminOutput = {
  /** 공지사항 목록 */
  notices: Array<NoticeInFindManyNoticeByAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 공지사항 목록 조회 - output */
export type FindManyNoticeOutput = {
  /** 공지사항 목록 */
  notices: Array<NoticeInFindManyNoticeOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 약관 목록 조회 - output */
export type FindManyPolicyOutput = {
  /** 약관 목록 */
  policies: Array<PolicyInFindManyPolicyOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 공모 상태별 프로젝트 목록 조회 (회원) - output */
export type FindManyProjectByPublicOfferingStatusOutput = {
  projects: Array<ProjectInFindManyProjectByPublicOfferingStatusOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 프로젝트 배당 목록 조회 (관리자) output */
export type FindManyProjectDividendByAdminOutput = {
  /** 배당 주기 */
  dividendPeriod?: Maybe<Scalars['String']>;
  /** 프로젝트 배당 */
  projectDividends: Array<ProjectDividendInFindManyProjectDividendByAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 프로젝트 배당 목록 조회 - output */
export type FindManyProjectDividendOutput = {
  /** 배당 주기 */
  dividendPeriod?: Maybe<Scalars['String']>;
  /** 프로젝트 배당 */
  projectDividends: Array<ProjectDividendInFindManyProjectDividendOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

export type FindManyProjectOutput = {
  projects: Array<ProjectInFindManyProjectOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 프로젝트 매각 투표 목록 조회 (관리자) output */
export type FindManyProjectSellVoteByAdminOutput = {
  projectSellVotes: Array<ProjectSellVoteInFindManyProjectSellVoteByAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 매각투표 목록 조회 (회원) - output */
export type FindManyProjectSellVoteByUserOutput = {
  /** 매각 투표 목록 */
  projectSellVotes: Array<ProjectSellVoteByFindManyProjectSellVoteByUserOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 공모 내역 조회 (관리자) - output */
export type FindManyPublicOfferingByAdminOutput = {
  /** 공모 내역 */
  publicOfferings: Array<PublicOfferingInFindManyPublicOfferingByAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 공모 내역 조회 (회원) - output */
export type FindManyPublicOfferingByUserOutput = {
  /** 공모 내역 */
  publicOfferings: Array<PublicOfferingInFindManyPublicOfferingByUserOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 투표 완료 프로젝트 목록 조회 (회원) output */
export type FindManySellVoteFavourProjectOutput = {
  projects: Array<ProjectInFindManySellVoteFavourProjectOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 거래내역 조회 (관리자) output */
export type FindManySignedOrderByAdminOutput = {
  /** 체결 */
  signedOrders: Array<SignedOrderInFindManySignedOrderByAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 매각 완료 프로젝트 목록 조회 output */
export type FindManySoldProjectOutput = {
  projects: Array<ProjectInFindManySoldProjectOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 내 건물 목록 조회 (회원) - output */
export type FindManyTabsWalletByUserOutput = {
  /** 건물 목록 */
  tabsWallets: Array<TabsWalletInFindManyTabsWalletByUserOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
  /** 총 평가 금액 */
  totalCurrentAmount: Scalars['String'];
  /** 총 손익 금액 */
  totalGainLossAmount: Scalars['String'];
  /** 총 손익률 */
  totalGainLossRatio: Scalars['String'];
};

/** 내 건물 거래내역 조회 (회원) - output */
export type FindManyTabsWalletTransferByUserOutput = {
  /** 거래내역 */
  tabsWalletTransfers: Array<TabsWalletTransferInFindManyTabsWalletTransferByUserOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 미체결 주문 내역 조회 (회원) output */
export type FindManyUnsignedOrderByUserOutput = {
  /** 주문  */
  orders: Array<OrderInFindManyUnsignedOrderByUserOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 회원 목록 조회 (관리자) - output */
export type FindManyUserByAdminOutput = {
  /** 총 개수 */
  totalCount: Scalars['Int'];
  users: Array<UserInFindManyUserByAdminOutput>;
};

/** 1:1 문의 목록 조회 (관리자) - output */
export type FindManyUserInquiryByAdminOutput = {
  /** 총 개수 */
  totalCount: Scalars['Int'];
  /** 1:1 문의 목록 */
  userInquiries: Array<UserInquiryInFindManyUserInquiryByAdminOutput>;
};

/** 1:1 문의 목록 조회 (회원) - output */
export type FindManyUserInquiryByUserOutput = {
  /** 총 개수 */
  totalCount: Scalars['Int'];
  /** 1:1 문의 목록 */
  userInquiries: Array<UserInquiryInFindManyUserInquiryByUserOutput>;
};

/** 지갑 거래내역 조회 output */
export type FindManyWalletTransferByUserOutput = {
  /** 총 개수 */
  totalCount: Scalars['Int'];
  /** 거래내역 */
  walletTransfers: Array<WalletTransferInFindManyWalletTransferByUserOutput>;
};

/** 마켓 거래 상세 조회 - output */
export type FindMarketTransferByUserOutput = {
  /** 금액 (원) */
  amount: Scalars['String'];
  /** 이체 후 잔액 (원) */
  balance: Scalars['String'];
  /** 최종 금액 (= 금액 (+ | -) 수수료) */
  calcAmount: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 수수료 (원) */
  fee: Scalars['String'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 수량 */
  quantity: Scalars['Int'];
  /** 체결가 */
  signedPrice: Scalars['String'];
  /** 이체 종류 */
  transferKind: TransferKind;
};

/** 내 정보 조회 (회원) */
export type FindProfileFromUserOutput = {
  /** 주소 */
  address?: Maybe<Scalars['String']>;
  /** 상세주소 */
  addressDetail?: Maybe<Scalars['String']>;
  /** 생년월일 */
  birth: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 이메일 */
  email?: Maybe<Scalars['String']>;
  /** 투자자격 */
  investmentQualification: InvestmentQualificationModel;
  /** 마케팅 수신 동의 여부 */
  isAllowedMarketing: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 휴대폰 */
  phone: Scalars['String'];
  /** 권한명 */
  role: Role;
  /** 지갑 */
  wallet?: Maybe<WalletInFindProfileFromUserOutput>;
  /** 우편번호 */
  zip?: Maybe<Scalars['String']>;
};

/** 프로젝트 조회 */
export type FindProjectOutput = {
  /** 주소 */
  address: Scalars['String'];
  /** 상세주소 */
  addressDetail: Scalars['String'];
  /** 배정일 */
  allocationDate: Scalars['Date'];
  /** 건폐율 (%) */
  buildingCoverageRatio: Scalars['String'];
  /** 준공일 */
  completionDate: Scalars['Date'];
  /** 생성일 */
  createdAt?: Maybe<Scalars['Date']>;
  /** 현재가 */
  currentPrice?: Maybe<Scalars['String']>;
  /** 현재 공모 금액 (원) */
  currentPublicOfferingAmount: Scalars['String'];
  /** 현재 공모 수량 (TABS) */
  currentPublicOfferingQuantity: Scalars['Int'];
  /** 일일 거래 정보 */
  dailyTransactionInfos: Array<DailyTransactionInfoModel>;
  /** 공모상태: 공모예정 일 경우 d-day */
  dDay?: Maybe<Scalars['Int']>;
  /** 배당 주기 */
  dividendPeriod?: Maybe<Scalars['String']>;
  /** 용적률 (%) */
  floorAreaRatio: Scalars['String'];
  /** 등락가 */
  fluctuation?: Maybe<Scalars['String']>;
  /** 등락률 */
  fluctuationRatio?: Maybe<Scalars['String']>;
  /** 연면적 (m^2) */
  grossFloorAreaMeter: Scalars['String'];
  /** 연면적 (평) */
  grossFloorAreaPyeong: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 매각 여부 */
  isSold: Scalars['Boolean'];
  /** 발행 */
  issuer: Scalars['String'];
  /** 위도 */
  latitude: Scalars['String'];
  /** 임차 계약 종료일 */
  leaseEndedAt?: Maybe<Scalars['Date']>;
  /** 임차 계약 시작일 */
  leaseStartedAt?: Maybe<Scalars['Date']>;
  /** 임차인 */
  lessee?: Maybe<Scalars['String']>;
  /** 상장일 */
  listedDate: Scalars['Date'];
  /** 경도 */
  longitude: Scalars['String'];
  /** 주용도 */
  mainPurpose: Scalars['String'];
  /** 마켓 거래 상태 */
  marketStatus: MarketStatus;
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 공시지가 (원/m^2) */
  officialLandPrice: Scalars['String'];
  /** 프로젝트 파일 */
  projectFiles: Array<ProjectFileModel>;
  /** 프로젝트 ID */
  projectId?: Maybe<Scalars['Int']>;
  /** 공모 종료일 */
  publicOfferingEndedAt: Scalars['Date'];
  /** 공모가 (원/TABS) */
  publicOfferingPrice: Scalars['String'];
  /** 모집수량 (TABS) */
  publicOfferingQuantity: Scalars['Int'];
  /** 공모 시작일 */
  publicOfferingStartedAt: Scalars['Date'];
  /** 공모 상태 */
  publicOfferingStatus: PublicOfferingStatus;
  /** 수량 */
  quantity?: Maybe<Scalars['Int']>;
  /** 입고일 */
  receivingDate: Scalars['Date'];
  /** 체결 ID */
  signId?: Maybe<Scalars['Int']>;
  /** TABS 명칭 */
  tabsName: Scalars['String'];
  /** 일일 거래정보 거래대금 총합 (원) */
  totalDailyTransactionAmount: Scalars['String'];
  /** 일일 거래정보 거래량 총합 (TABS) */
  totalDailyVolume: Scalars['Int'];
  /** 공모총액 (원) */
  totalPublicOfferingAmount: Scalars['String'];
  /** 투자 정보 url */
  url?: Maybe<Scalars['String']>;
  /** 매각 투표 상태 */
  voteStatus: VoteStatus;
  /** 우편번호 */
  zip: Scalars['String'];
  /** 용도지역 */
  zoning: Scalars['String'];
};

/** 매각투표 상세 조회 (회원) - output */
export type FindProjectSellVoteByUserOutput = {
  /** 반대 수 (명) */
  againstCount?: Maybe<Scalars['Int']>;
  /** 찬성 수 (명) */
  favourCount?: Maybe<Scalars['Int']>;
  /** ID */
  id: Scalars['Int'];
  /** 투표 여부 */
  isSellVote: Scalars['Boolean'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 회차 */
  no: Scalars['Int'];
  /** 매각 요청 금액 */
  requestSellAmount: Scalars['String'];
  /** 투표 종료일 */
  sellVoteEndedAt: Scalars['Date'];
  /** 투표 시작일 */
  sellVoteStartedAt: Scalars['Date'];
  /** 매각일 (홈페이지에 보여주기 용도) */
  soldDate: Scalars['Date'];
  /** 미참여 수 (명) */
  undoCount?: Maybe<Scalars['Int']>;
  /** 해당 회차 투표 결과 */
  voteKind?: Maybe<VoteKind>;
  /** 매각 투표 상태 */
  voteStatus: VoteStatus;
};

/** 공모 상세 조회 (관리자) output */
export type FindPublicOfferingByAdminOutput = {
  /** 관리자명 */
  adminName?: Maybe<Scalars['String']>;
  /** 공모 금액 (원) */
  amount: Scalars['String'];
  /** 환불 금액 (원) */
  cancelAmount?: Maybe<Scalars['String']>;
  /** 환불 일자 */
  canceledAt?: Maybe<Scalars['Date']>;
  /** 환불 수량 (TABS) */
  cancelQuantity?: Maybe<Scalars['Int']>;
  /** 일자 */
  createdAt: Scalars['Date'];
  /** 공모 수량 (TABS) */
  quantity: Scalars['Int'];
  /** 환불 상태 */
  status: Scalars['String'];
  /** 회원 */
  user: UserInFindPublicOfferingByAdminOutput;
};

/** 공모 정보 조회 - output */
export type FindPublicOfferingInfoOutput = {
  /** 주소 */
  address: Scalars['String'];
  /** 상세주소 */
  addressDetail: Scalars['String'];
  /** 배정일 */
  allocationDate: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 공모율 (%) */
  offeringRatio: Scalars['String'];
  /** 공모 종료일 */
  publicOfferingEndedAt: Scalars['Date'];
  /** 공모가 (원/TABS) */
  publicOfferingPrice: Scalars['String'];
  /** 공모 시작일 */
  publicOfferingStartedAt: Scalars['Date'];
  /** 공모 상태 */
  publicOfferingStatus: PublicOfferingStatus;
  /** 입고일 */
  receivingDate: Scalars['Date'];
  /** 환불일 */
  refundDate: Scalars['Date'];
  /** 썸네일 */
  thumbnail?: Maybe<Scalars['String']>;
  /** 공모총액 (원) */
  totalPublicOfferingAmount: Scalars['String'];
};

/** 공모 환불 정보 조회 (관리자) - output */
export type FindPublicOfferingRefundInfoByAdminOutput = {
  /** 관리자명 */
  adminName: Scalars['String'];
  /** 환불 금액 (원) */
  refundAmount: Scalars['String'];
  /** 환불 일자 */
  refundDate: Scalars['Date'];
  /** 환불 TABS 수 (TABS) */
  refundQuantity: Scalars['Int'];
};

/** 공모 결과 조회 (회원) - output */
export type FindPublicOfferingResultByUserOutput = {
  /** 환불 수량 (TABS) */
  cancelQuantity?: Maybe<Scalars['Int']>;
  /** 이름 */
  name: Scalars['String'];
  /** 프로젝트 */
  project: ProjectInFindPublicOfferingResultByUserOutput;
  /** 공모 수량 (TABS) */
  quantity: Scalars['Int'];
};

/** 매각 정보 조회 - output */
export type FindSellInfoOutput = {
  /** 주소 */
  address: Scalars['String'];
  /** 상세주소 */
  addressDetail: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 매각 여부 */
  isSold: Scalars['Boolean'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 1TABS 당 수익 금액 (원) */
  profitPerTabs: Scalars['String'];
  /** 공모 종료일 */
  publicOfferingEndedAt: Scalars['Date'];
  /** 공모 시작일 */
  publicOfferingStartedAt: Scalars['Date'];
  /** 매각 금액 (원) */
  sellAmount: Scalars['String'];
  /** 매각일 */
  soldDate: Scalars['Date'];
  /** 수익률 (%) */
  totalProfitRatio: Scalars['String'];
  /** 공모총액 (원) */
  totalPublicOfferingAmount: Scalars['String'];
};

/** 내 건물 상세 조회 (회원) - output */
export type FindTabsWalletByUserOutput = {
  /** 매수평균가 (원) */
  averagePurchasePrice: Scalars['String'];
  /** 총 평가 금액 (원) */
  currentAmount: Scalars['String'];
  /** 현재가 (원) */
  currentPrice: Scalars['String'];
  /** 총 손익 금액 (원) */
  gainLossAmount: Scalars['String'];
  /** 총 손익률 (%) */
  gainLossRatio: Scalars['String'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 보유 TABS 개수 (TABS) */
  tabsCount: Scalars['Int'];
  /** 총 구매대금 (원) // 총 TABS 구매에 쓰인 금액 */
  totalCost: Scalars['String'];
};

/** 1:1 문의 상세 조회 (회원) - output */
export type FindUserInquiryByUserOutput = {
  /** 문의 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 답변일 */
  repliedAt?: Maybe<Scalars['Date']>;
  /** 답변 내용 */
  reply?: Maybe<Scalars['String']>;
  /** 제목 */
  title: Scalars['String'];
  /** 1:1 문의 유형 */
  userInquiryCategory: UserInquiryCategoryModel;
};

/** 내 지갑 조회 - output */
export type FindWalletByUserOutput = {
  /** 예치금 잔액 */
  balance: Scalars['String'];
  /** 매수 증거금 */
  buyDeposit: Scalars['String'];
  /** 총 잔여금 = 예치금 잔액 - 전체 증거금 */
  calcBalance: Scalars['String'];
  /** 공모 증거금 */
  publicOfferingDeposit: Scalars['String'];
  /** 전체 증거금 */
  totalDeposit: Scalars['String'];
  /** 회원 */
  user: UserInFindWalletByUserOutput;
};

/** 지갑 거래 조회 (회원) output */
export type FindWalletTransferByUserOutput = {
  /** 계좌 */
  account?: Maybe<AccountInFindWalletTransferByUserOutput>;
  /** 이체 후 잔액 (원) */
  balance: Scalars['String'];
  /** 최종 금액 (= 금액 (+ | -) 수수료) */
  calcAmount: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 수수료 (원) */
  fee: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 거래명 */
  name: Scalars['String'];
  /** 이체 종류 */
  transferKind: TransferKind;
};

/** 프로젝트 이미지 */
export type ImageInCreateProjectByAdminArgs = {
  /** 프로젝트 이미지 */
  file: Scalars['Upload'];
};

/** 투자자격변경요청 목록 조회 (관리자) output - 투자유형관련서류 카테고리 */
export type InvestmentDocumentCategoryInFindManyChangeInvestmentQualificationByAdminOutput = {
  /** 서류명 (ex. 근로소득 원천징수 영수증) */
  name: Scalars['String'];
};

/** 투자 유형 서류 카테고리 */
export type InvestmentDocumentCategoryModel = {
  /** 설명 (ex. 본인 서명이 포함된 직전 과세 연도 기준) */
  description: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 필수 여부 */
  isRequired: Scalars['Boolean'];
  /** 서류명 (ex. 근로소득 원천징수 영수증) */
  name: Scalars['String'];
};

/** 투자자격변경요청 목록 조회 (관리자) output - 투자유형관련서류 */
export type InvestmentDocumentInFindManyChangeInvestmentQualificationByAdminOutput = {
  /** 파일명 */
  fileName: Scalars['String'];
  /** 투자유형관련서류카테고리 */
  investmentDocumentCategory: InvestmentDocumentCategoryInFindManyChangeInvestmentQualificationByAdminOutput;
};

/** 투자 자격 조회 (회원) output - 투자 자격 */
export type InvestmentQualificationInFindInvestmentQualificationByUserOutput = {
  /** 자격 설명 */
  description: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 투자 유형 목록 */
  investmentTypes: Array<InvestmentTypeModel>;
  /** 자격명 (ex. 일반 투자자) */
  name: Scalars['String'];
  /** 투자 가능 금액 (원) */
  possibleInvestmentAmount: Scalars['String'];
};

/** 투자자격변경요청 목록 조회 (관리자) output - 투자자격 */
export type InvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput = {
  /** 자격명 (ex. 일반 투자자) */
  name: Scalars['String'];
  /** 투자 가능 금액 (원) */
  possibleInvestmentAmount: Scalars['String'];
};

export type InvestmentQualificationInFindManyInvestmentQualificationByUserOutput = {
  /** 자격 설명 */
  description: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 현재 내 투자 자격 여부 */
  isCurrent: Scalars['Boolean'];
  /** 자격명 (ex. 일반 투자자) */
  name: Scalars['String'];
  /** 투자 가능 금액 (원) */
  possibleInvestmentAmount: Scalars['String'];
};

/** 투자 자격 */
export type InvestmentQualificationModel = {
  /** 자격 설명 */
  description: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 자격명 (ex. 일반 투자자) */
  name: Scalars['String'];
  /** 투자 가능 금액 (원) */
  possibleInvestmentAmount: Scalars['String'];
};

/** 투자자격변경요청 목록 조회 (관리자) output - 투자유형 */
export type InvestmentTypeInFindManyChangeInvestmentQualificationByAdminOutput = {
  /** 유형명 (ex. 근로 소득 유형) */
  name: Scalars['String'];
};

/** 투자 유형 */
export type InvestmentTypeModel = {
  /** 유형 설명 */
  description: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 유형명 (ex. 근로 소득 유형) */
  name: Scalars['String'];
};

/** 로그인 종류 */
export enum LoginKind {
  /** 이메일 */
  Email = 'EMAIL',
  /** 카카오 */
  Kakao = 'KAKAO'
}

/** 마켓 거래 정렬 */
export enum MarketSorter {
  /** 증감 */
  Change = 'CHANGE',
  /** 등락 */
  Fluctuation = 'FLUCTUATION',
  /** 거래액 */
  TransactionAmount = 'TRANSACTION_AMOUNT',
  /** 거래량 */
  Volume = 'VOLUME'
}

/** 마켓 거래 상태 */
export enum MarketStatus {
  /** 상장 (= 마켓 거래중) */
  Listed = 'LISTED',
  /** 상장대기 */
  ListedWait = 'LISTED_WAIT',
  /** 미상장 */
  Unlisted = 'UNLISTED'
}

/** 프로젝트별 마켓 거래내역 조회 output - 거래내역 */
export type MarketTransferInFindManyMarketTransferByProjectOutput = {
  /** 금액 (원) */
  amount: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 수량 */
  quantity: Scalars['Int'];
  /** 이체 종류 */
  transferKind: MarketTransferKindFilter;
};

/** 마켓 거래내역 조회 - output - 거래내역 */
export type MarketTransferInFindManyMarketTransferByUserOutput = {
  /** 금액 (원) */
  amount: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 수량 */
  quantity: Scalars['Int'];
  /** 이체 종류 */
  transferKind: MarketTransferKindFilter;
};

/** 지갑 이체 종류 필터 */
export enum MarketTransferKindFilter {
  /** 매수 */
  Buy = 'BUY',
  /** 매도 */
  Sell = 'SELL'
}

export type Mutation = {
  /** 매수 (회원) */
  buyTabsByUser: Scalars['Boolean'];
  /** 주문 취소 (회원) */
  cancelOrderByUser: Scalars['Boolean'];
  /** 공모 취소하기 (회원) */
  cancelPublicOfferingByUser: Scalars['Boolean'];
  /** [일일 거래 정보] 프로젝트별 일일 거래정보 생성 */
  createDailyTransactionInfo: Scalars['Boolean'];
  /** 기준일로부터 배당자 목록 생성 cron */
  createDividendCron: Scalars['Boolean'];
  /** FAQ 생성 (관리자) */
  createFaqByAdmin: Scalars['Boolean'];
  /** 공지사항 생성 (관리자) */
  createNoticeByAdmin: Scalars['Boolean'];
  /** 프로젝트 생성 (관리자) */
  createProjectByAdmin: ProjectModel;
  /** 프로젝트 배당 등록 (관리자) */
  createProjectDividendByAdmin: Scalars['Boolean'];
  /** 매각투표 회차정보 생성 (관리자) */
  createProjectSellVoteByAdmin: Scalars['Boolean'];
  /** 공모하기 (회원) */
  createPublicOfferingByUser: PublicOfferingModel;
  /** 투표 선택 (회원) */
  createSellVoteByUser: Scalars['Boolean'];
  /** 1:1 문의 등록 (회원) */
  createUserInquiryByUser: Scalars['Boolean'];
  /** 지갑 생성 (회원) */
  createWalletByUser: Scalars['Boolean'];
  /** 회원 탈퇴 (회원) */
  deleteUser: Scalars['Boolean'];
  /** 비밀번호 찾기 (회원) */
  findPasswordByUser: Scalars['Boolean'];
  /** 2차 비밀번호 찾기 (회원) */
  findSubPasswordByUser: Scalars['Boolean'];
  /** 배당금 지급 (관리자) */
  payDividendByAdmin: Scalars['Boolean'];
  /** Token 재발급 (관리자) */
  refreshFromAdmin: TokenOutput;
  /** Token 재발급 (회원) */
  refreshFromUser: TokenOutput;
  /** 공모 환불 (관리자) */
  refundPublicOfferingByAdmin: Scalars['Boolean'];
  /** 1:1 문의 답변 (관리자) */
  replyUserInquiryByAdmin: Scalars['Boolean'];
  /** 투자 자격 변경 요청 (회원) */
  requestChangeInvestmentQualificationByUser: Scalars['Boolean'];
  /** 매도 (회원) */
  sellTabsByUser: Scalars['Boolean'];
  /** 로그아웃 (회원) */
  signOutFromUser: Scalars['Boolean'];
  /** 가입 (관리자) */
  signUpFromAdmin: AdminModel;
  /** 가입 (회원) */
  signUpFromUser: UserModel;
  /** [입고일] 입고일 날짜 도달시 공모한 회원들에게 TABS 전달 */
  transferTabsToUserByReceivingDate: Scalars['Boolean'];
  /** 투자 자격 변경 처리 (관리자) */
  treatChangeInvestmentQualificationByAdmin: Scalars['Boolean'];
  /** 주소 변경 (회원) */
  updateAddressByUser: Scalars['Boolean'];
  /** 마케팅 수신 동의 여부 수정 (회원) */
  updateAllowedMarketingByUser: Scalars['Boolean'];
  /** 프로젝트 배당 주기 수정 (관리자) */
  updateDividendPeriodByAdmin: Scalars['Boolean'];
  /** FAQ 수정 (관리자) */
  updateFaqByAdmin: Scalars['Boolean'];
  /** 투자 정보 등록 (회원) */
  updateInvestmentInfoByUser: Scalars['Boolean'];
  /** [해당 회차 투표 결과] 부결 일 경우 마켓 거래 상태 - "마켓 거래중"으로 변경 */
  updateMarketStatusIfVoteKind: Array<ProjectModel>;
  /** 공지사항 수정 (관리자) */
  updateNoticeByAdmin: Scalars['Boolean'];
  /** 비밀번호 변경 (회원) */
  updatePasswordByUser: Scalars['Boolean'];
  /** 휴대폰 변경 (회원) */
  updatePhoneByUser: Scalars['Boolean'];
  /** 프로젝트 배당 수정 (관리자) */
  updateProjectDividendByAdmin: Scalars['Boolean'];
  /** 2차 비밀번호 변경 (회원) */
  updateSubPasswordByUser: Scalars['Boolean'];
  /** 투표 결과 선택 (관리자) */
  updateVoteKindByAdmin: ProjectSellVoteModel;
  /** 공지사항 파일 업로드 (관리자) */
  uploadNoticeFileByAdmin: Scalars['String'];
  /** [마켓 거래 상태] "상장대기" => "마켓 거래중"으로 변경 */
  verifyMarketStatusIsUnlisted: Array<ProjectModel>;
  /** [공모 상태] "공모 중" => "공모실패"로 변경 */
  verifyPublicOfferingStatusIsOffering: Array<ProjectModel>;
  /** [공모 상태] "공모 중" => "공모 성공" 상태 변경 */
  verifyPublicOfferingStatusIsOfferingToBeSuccess: Array<ProjectModel>;
  /** [공모 상태] "공모예정" => "공모 중"으로 변경 */
  verifyPublicOfferingStatusIsWait: Array<ProjectModel>;
  /** [매각 투표 상태] "매각투표 예정" => "매각투표 중"으로 변경 */
  verifyVoteStatusIsSellVoteWait: Array<ProjectModel>;
  /** [매각 투표 상태] "매각투표 중" => "매각투표 완료"로 변경 */
  verifyVoteStatusIsSellVoting: Array<ProjectModel>;
};


export type MutationBuyTabsByUserArgs = {
  askPrice: Scalars['String'];
  projectId: Scalars['Int'];
  quantity: Scalars['Int'];
  subPasswordInput: Scalars['String'];
};


export type MutationCancelOrderByUserArgs = {
  id: Scalars['Int'];
};


export type MutationCancelPublicOfferingByUserArgs = {
  id: Scalars['Int'];
};


export type MutationCreateDividendCronArgs = {
  closingDate: Scalars['Date'];
};


export type MutationCreateFaqByAdminArgs = {
  answer: Scalars['String'];
  faqCategoryId: Scalars['Int'];
  question: Scalars['String'];
};


export type MutationCreateNoticeByAdminArgs = {
  content: Scalars['String'];
  noticeKind: NoticeKind;
  title: Scalars['String'];
};


export type MutationCreateProjectByAdminArgs = {
  address: Scalars['String'];
  addressDetail: Scalars['String'];
  allocationDate: Scalars['Date'];
  buildingCoverageRatio: Scalars['String'];
  completionDate: Scalars['Date'];
  docs: Array<DocInCreateProjectByAdminArgs>;
  floorAreaRatio: Scalars['String'];
  grossFloorAreaMeter: Scalars['String'];
  grossFloorAreaPyeong: Scalars['String'];
  images: Array<ImageInCreateProjectByAdminArgs>;
  issuer: Scalars['String'];
  latitude: Scalars['String'];
  leaseEndedAt?: InputMaybe<Scalars['Date']>;
  leaseStartedAt?: InputMaybe<Scalars['Date']>;
  lessee?: InputMaybe<Scalars['String']>;
  listedDate: Scalars['Date'];
  longitude: Scalars['String'];
  mainPurpose: Scalars['String'];
  name: Scalars['String'];
  officialInfos: Array<OfficialInfoInCreateProjectByAdminArgs>;
  officialLandPrice: Scalars['String'];
  publicOfferingEndedAt: Scalars['Date'];
  publicOfferingPrice: Scalars['String'];
  publicOfferingQuantity: Scalars['Int'];
  publicOfferingStartedAt: Scalars['Date'];
  receivingDate: Scalars['Date'];
  tabsName: Scalars['String'];
  totalPublicOfferingAmount: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
  zip: Scalars['String'];
  zoning: Scalars['String'];
};


export type MutationCreateProjectDividendByAdminArgs = {
  closingDate: Scalars['Date'];
  name: Scalars['String'];
  operatingProfit?: InputMaybe<Scalars['String']>;
  projectId: Scalars['Int'];
};


export type MutationCreateProjectSellVoteByAdminArgs = {
  docs: Array<DocInCreateProjectSellVoteArgs>;
  projectId: Scalars['Int'];
  requestSellAmount: Scalars['String'];
  sellVoteEndedAt: Scalars['Date'];
  sellVoteStartedAt: Scalars['Date'];
  soldDate: Scalars['Date'];
};


export type MutationCreatePublicOfferingByUserArgs = {
  projectId: Scalars['Int'];
  quantity: Scalars['Int'];
};


export type MutationCreateSellVoteByUserArgs = {
  id: Scalars['Int'];
  subPasswordInput: Scalars['String'];
  voteKind: VoteKind;
};


export type MutationCreateUserInquiryByUserArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
  userInquiryCategoryId: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  subPasswordInput: Scalars['String'];
};


export type MutationFindPasswordByUserArgs = {
  impUid: Scalars['String'];
  password: Scalars['String'];
};


export type MutationFindSubPasswordByUserArgs = {
  impUid: Scalars['String'];
  subPassword: Scalars['String'];
};


export type MutationPayDividendByAdminArgs = {
  id: Scalars['Int'];
};


export type MutationRefundPublicOfferingByAdminArgs = {
  projectId: Scalars['Int'];
};


export type MutationReplyUserInquiryByAdminArgs = {
  id: Scalars['Int'];
  reply: Scalars['String'];
};


export type MutationRequestChangeInvestmentQualificationByUserArgs = {
  investmentDocuments: Array<RequestChangeInvestmentQualificationByUserInput>;
  investmentQualificationId: Scalars['Int'];
  investmentTypeId: Scalars['Int'];
};


export type MutationSellTabsByUserArgs = {
  askPrice: Scalars['String'];
  projectId: Scalars['Int'];
  quantity: Scalars['Int'];
  subPasswordInput: Scalars['String'];
};


export type MutationSignUpFromAdminArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpFromUserArgs = {
  email: Scalars['String'];
  impUid: Scalars['String'];
  isAllowedMarketing: Scalars['Boolean'];
  loginKind: LoginKind;
  name: Scalars['String'];
  password: Scalars['String'];
  subPassword: Scalars['String'];
};


export type MutationTreatChangeInvestmentQualificationByAdminArgs = {
  approveStatus: ApproveStatus;
  id: Scalars['Int'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateAddressByUserArgs = {
  address: Scalars['String'];
  addressDetail: Scalars['String'];
  zip: Scalars['String'];
};


export type MutationUpdateDividendPeriodByAdminArgs = {
  dividendPeriod: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUpdateFaqByAdminArgs = {
  answer: Scalars['String'];
  faqCategoryId: Scalars['Int'];
  id: Scalars['Int'];
  question: Scalars['String'];
};


export type MutationUpdateInvestmentInfoByUserArgs = {
  address: Scalars['String'];
  addressDetail: Scalars['String'];
  registerationNumber: Scalars['String'];
  subPasswordInput: Scalars['String'];
  zip: Scalars['String'];
};


export type MutationUpdateNoticeByAdminArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
  noticeKind: NoticeKind;
  title: Scalars['String'];
};


export type MutationUpdatePasswordByUserArgs = {
  newPassword: Scalars['String'];
  originPassword: Scalars['String'];
};


export type MutationUpdatePhoneByUserArgs = {
  impUid: Scalars['String'];
};


export type MutationUpdateProjectDividendByAdminArgs = {
  closingDate: Scalars['Date'];
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  operatingProfit?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateSubPasswordByUserArgs = {
  newSubPassword: Scalars['String'];
  originSubPassword: Scalars['String'];
};


export type MutationUpdateVoteKindByAdminArgs = {
  projectId: Scalars['Int'];
  voteKind: VoteKind;
};


export type MutationUploadNoticeFileByAdminArgs = {
  file: Scalars['Upload'];
};

/** 공지사항 목록 조회 (관리자) - output - 공지사항 */
export type NoticeInFindManyNoticeByAdminOutput = {
  /** 작성한 관리자 */
  admin: AdminInFindManyNoticeByAdminOutput;
  /** 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 공지사항 카테고리 */
  noticeKind: NoticeKind;
  /** 제목 */
  title: Scalars['String'];
};

/** 공지사항 목록 조회 - output - 공지사항 */
export type NoticeInFindManyNoticeOutput = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 공지사항 카테고리 */
  noticeKind: NoticeKind;
  /** 제목 */
  title: Scalars['String'];
};

/** 공지사항 카테고리 */
export enum NoticeKind {
  /** 공지/혜택 */
  Benefit = 'BENEFIT',
  /** 공지/이벤트 */
  Event = 'EVENT',
  /** 공지/안내 */
  Info = 'INFO',
  /** 공모 */
  PublicOffering = 'PUBLIC_OFFERING',
  /** 매각투표 */
  SellVote = 'SELL_VOTE',
  /** 거래 */
  Transaction = 'TRANSACTION'
}

/** 공지사항 */
export type NoticeModel = {
  /** 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 공지사항 카테고리 */
  noticeKind: NoticeKind;
  /** 제목 */
  title: Scalars['String'];
};

/** 공시 */
export type OfficialInfoInCreateProjectByAdminArgs = {
  /** 공시 */
  file: Scalars['Upload'];
  /** 제목 */
  name: Scalars['String'];
};

/** 십호가 */
export type OrderBookModel = {
  /** 매수 목록 */
  buyHistory: Array<BuyHistoryByOrderBook>;
  /** 매수 총 수량 */
  buyTotalCount: Scalars['Int'];
  /** 매도 목록 */
  sellHistory: Array<SellHistoryByOrderBook>;
  /** 매도 총 수량 */
  sellTotalCount: Scalars['Int'];
};

/** 미체결 주문 내역 조회 (회원) output - 주문 내역 */
export type OrderInFindManyUnsignedOrderByUserOutput = {
  /** 호가 (원) */
  askPrice: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 매물명 */
  name: Scalars['String'];
  /** 주문 종류 */
  orderKind: OrderKind;
  /** 프로젝트 ID */
  projectId: Scalars['Int'];
  /** 수량 (TABS) */
  quantity: Scalars['Int'];
  /** 체결된 개수 */
  signedQuantity: Scalars['Int'];
};

/** 주문 종류 */
export enum OrderKind {
  /** 매수 */
  Buy = 'BUY',
  /** 매도 */
  Sell = 'SELL'
}

/** 약관 유형 */
export type PolicyCategoryModel = {
  /** ID */
  id: Scalars['Int'];
  /** 유형명 */
  name: Scalars['String'];
};

/** 약관 목록 조회 - output - 약관 */
export type PolicyInFindManyPolicyOutput = {
  /** ID */
  id: Scalars['Int'];
  /** 필수 여부 */
  isRequired: Scalars['Boolean'];
  /** 제목 */
  title: Scalars['String'];
};

/** 약관 */
export type PolicyModel = {
  /** 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 필수 여부 */
  isRequired: Scalars['Boolean'];
  /** 제목 */
  title: Scalars['String'];
};

/** 프로젝트 배당 목록 조회 (관리자) output - 프로젝트 배당 */
export type ProjectDividendInFindManyProjectDividendByAdminOutput = {
  /** 기준일 (= 마감일) */
  closingDate: Scalars['Date'];
  /** 배당지급일 */
  dividendAt?: Maybe<Scalars['Date']>;
  /** 배당자 수 (명) */
  dividendCount?: Maybe<Scalars['Int']>;
  /** TABS 당 배당금 (원) */
  dividendPerTabs?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['Int'];
  /** 배당명 */
  name: Scalars['String'];
  /** 운영이익금 (원) = 총 배당금 */
  operatingProfit?: Maybe<Scalars['String']>;
};

/** 프로젝트 배당 목록 조회 - output - 프로젝트 배당 */
export type ProjectDividendInFindManyProjectDividendOutput = {
  /** 기준일 (= 마감일) */
  closingDate: Scalars['Date'];
  /** 배당지급일 */
  dividendAt?: Maybe<Scalars['Date']>;
  /** TABS 당 배당금 (원) */
  dividendPerTabs?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['Int'];
  /** 배당명 */
  name: Scalars['String'];
};

/** 프로젝트 파일 */
export type ProjectFileModel = {
  /** 파일 종류 */
  fileKind: FileKind;
  /** 파일명 */
  fileName: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 자료명 */
  name?: Maybe<Scalars['String']>;
};

/** 마켓 거래중 프로젝트 목록 조회 - output - 프로젝트 */
export type ProjectInFindManyMarketListedProjectOutput = {
  /** 증감가 (원) */
  change: Scalars['String'];
  /** 증감률 (%) */
  changeRatio: Scalars['String'];
  /** 현재가 (원) */
  currentPrice: Scalars['String'];
  /** 등락가 (원) */
  fluctuation: Scalars['String'];
  /** 등락률 (%) */
  fluctuationRatio: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 썸네일 */
  thumbnail?: Maybe<Scalars['String']>;
  /** 거래액 (원) */
  totalTransactionAmount: Scalars['String'];
  /** 거래량 (TABS) */
  totalVolume: Scalars['Int'];
};

/** 공모 상태별 프로젝트 목록 조회 (회원) - output - 프로젝트 */
export type ProjectInFindManyProjectByPublicOfferingStatusOutput = {
  /** ID */
  id: Scalars['Int'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 공모 종료일 */
  publicOfferingEndedAt: Scalars['Date'];
  /** 공모가 (원/TABS) */
  publicOfferingPrice: Scalars['String'];
  /** 공모 시작일 */
  publicOfferingStartedAt: Scalars['Date'];
  /** 공모 상태 */
  publicOfferingStatus: PublicOfferingStatus;
  /** 입고일 */
  receivingDate: Scalars['Date'];
  /** 환불일 */
  refundDate: Scalars['Date'];
  /** 썸네일 */
  thumbnail?: Maybe<Scalars['String']>;
  /** 공모총액 (원) */
  totalPublicOfferingAmount: Scalars['String'];
};

export type ProjectInFindManyProjectOutput = {
  /** 주소 */
  address: Scalars['String'];
  /** 상세주소 */
  addressDetail: Scalars['String'];
  /** 배정일 */
  allocationDate: Scalars['Date'];
  /** 건폐율 (%) */
  buildingCoverageRatio: Scalars['String'];
  /** 준공일 */
  completionDate: Scalars['Date'];
  /** 생성일 */
  createdAt?: Maybe<Scalars['Date']>;
  /** 현재가 */
  currentPrice?: Maybe<Scalars['String']>;
  /** 현재 공모 금액 (원) */
  currentPublicOfferingAmount: Scalars['String'];
  /** 현재 공모 수량 (TABS) */
  currentPublicOfferingQuantity: Scalars['Int'];
  /** 일일 거래 정보 */
  dailyTransactionInfos: Array<DailyTransactionInfoModel>;
  /** 공모상태: 공모예정 일 경우 d-day */
  dDay?: Maybe<Scalars['Int']>;
  /** 배당 주기 */
  dividendPeriod?: Maybe<Scalars['String']>;
  /** 용적률 (%) */
  floorAreaRatio: Scalars['String'];
  /** 등락가 */
  fluctuation?: Maybe<Scalars['String']>;
  /** 등락률 */
  fluctuationRatio?: Maybe<Scalars['String']>;
  /** 연면적 (m^2) */
  grossFloorAreaMeter: Scalars['String'];
  /** 연면적 (평) */
  grossFloorAreaPyeong: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 매각 여부 */
  isSold: Scalars['Boolean'];
  /** 발행 */
  issuer: Scalars['String'];
  /** 위도 */
  latitude: Scalars['String'];
  /** 임차 계약 종료일 */
  leaseEndedAt?: Maybe<Scalars['Date']>;
  /** 임차 계약 시작일 */
  leaseStartedAt?: Maybe<Scalars['Date']>;
  /** 임차인 */
  lessee?: Maybe<Scalars['String']>;
  /** 상장일 */
  listedDate: Scalars['Date'];
  /** 경도 */
  longitude: Scalars['String'];
  /** 주용도 */
  mainPurpose: Scalars['String'];
  /** 마켓 거래 상태 */
  marketStatus: MarketStatus;
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 공시지가 (원/m^2) */
  officialLandPrice: Scalars['String'];
  /** 프로젝트 파일 */
  projectFiles: Array<ProjectFileModel>;
  /** 프로젝트 ID */
  projectId?: Maybe<Scalars['Int']>;
  /** 공모 종료일 */
  publicOfferingEndedAt: Scalars['Date'];
  /** 공모가 (원/TABS) */
  publicOfferingPrice: Scalars['String'];
  /** 모집수량 (TABS) */
  publicOfferingQuantity: Scalars['Int'];
  /** 공모 시작일 */
  publicOfferingStartedAt: Scalars['Date'];
  /** 공모 상태 */
  publicOfferingStatus: PublicOfferingStatus;
  /** 수량 */
  quantity?: Maybe<Scalars['Int']>;
  /** 입고일 */
  receivingDate: Scalars['Date'];
  /** 체결 ID */
  signId?: Maybe<Scalars['Int']>;
  /** TABS 명칭 */
  tabsName: Scalars['String'];
  /** 일일 거래정보 거래대금 총합 (원) */
  totalDailyTransactionAmount: Scalars['String'];
  /** 일일 거래정보 거래량 총합 (TABS) */
  totalDailyVolume: Scalars['Int'];
  /** 공모총액 (원) */
  totalPublicOfferingAmount: Scalars['String'];
  /** 투자 정보 url */
  url?: Maybe<Scalars['String']>;
  /** 매각 투표 상태 */
  voteStatus: VoteStatus;
  /** 우편번호 */
  zip: Scalars['String'];
  /** 용도지역 */
  zoning: Scalars['String'];
};

/** 투표 완료 프로젝트 목록 조회 (회원) output - 프로젝트 */
export type ProjectInFindManySellVoteFavourProjectOutput = {
  /** 마지막 거래가 (원) */
  currentPrice: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 투표 종료일 */
  sellVoteEndedAt: Scalars['Date'];
  /** 썸네일 */
  thumbnail?: Maybe<Scalars['String']>;
};

/** 매각 완료 프로젝트 목록 조회 output - 프로젝트 */
export type ProjectInFindManySoldProjectOutput = {
  /** 1TABS 당 금액 (원) */
  amountPerTabs: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 썸네일 */
  thumbnail?: Maybe<Scalars['String']>;
  /** 수익률 (%) */
  totalProfitRatio: Scalars['String'];
};

/** 공모 결과 조회 (회원) - output - 프로젝트 */
export type ProjectInFindPublicOfferingResultByUserOutput = {
  /** 상장일 */
  listedDate: Scalars['Date'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 입고일 */
  receivingDate: Scalars['Date'];
};

/** 프로젝트 */
export type ProjectModel = {
  /** 주소 */
  address: Scalars['String'];
  /** 상세주소 */
  addressDetail: Scalars['String'];
  /** 배정일 */
  allocationDate: Scalars['Date'];
  /** 건폐율 (%) */
  buildingCoverageRatio: Scalars['String'];
  /** 준공일 */
  completionDate: Scalars['Date'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 현재 공모 금액 (원) */
  currentPublicOfferingAmount: Scalars['String'];
  /** 현재 공모 수량 (TABS) */
  currentPublicOfferingQuantity: Scalars['Int'];
  /** 배당 주기 */
  dividendPeriod?: Maybe<Scalars['String']>;
  /** 용적률 (%) */
  floorAreaRatio: Scalars['String'];
  /** 연면적 (m^2) */
  grossFloorAreaMeter: Scalars['String'];
  /** 연면적 (평) */
  grossFloorAreaPyeong: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 매각 여부 */
  isSold: Scalars['Boolean'];
  /** 발행 */
  issuer: Scalars['String'];
  /** 위도 */
  latitude: Scalars['String'];
  /** 임차 계약 종료일 */
  leaseEndedAt?: Maybe<Scalars['Date']>;
  /** 임차 계약 시작일 */
  leaseStartedAt?: Maybe<Scalars['Date']>;
  /** 임차인 */
  lessee?: Maybe<Scalars['String']>;
  /** 상장일 */
  listedDate: Scalars['Date'];
  /** 경도 */
  longitude: Scalars['String'];
  /** 주용도 */
  mainPurpose: Scalars['String'];
  /** 마켓 거래 상태 */
  marketStatus: MarketStatus;
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 공시지가 (원/m^2) */
  officialLandPrice: Scalars['String'];
  /** 공모 종료일 */
  publicOfferingEndedAt: Scalars['Date'];
  /** 공모가 (원/TABS) */
  publicOfferingPrice: Scalars['String'];
  /** 모집수량 (TABS) */
  publicOfferingQuantity: Scalars['Int'];
  /** 공모 시작일 */
  publicOfferingStartedAt: Scalars['Date'];
  /** 공모 상태 */
  publicOfferingStatus: PublicOfferingStatus;
  /** 입고일 */
  receivingDate: Scalars['Date'];
  /** TABS 명칭 */
  tabsName: Scalars['String'];
  /** 일일 거래정보 거래대금 총합 (원) */
  totalDailyTransactionAmount: Scalars['String'];
  /** 일일 거래정보 거래량 총합 (TABS) */
  totalDailyVolume: Scalars['Int'];
  /** 공모총액 (원) */
  totalPublicOfferingAmount: Scalars['String'];
  /** 투자 정보 url */
  url?: Maybe<Scalars['String']>;
  /** 매각 투표 상태 */
  voteStatus: VoteStatus;
  /** 우편번호 */
  zip: Scalars['String'];
  /** 용도지역 */
  zoning: Scalars['String'];
};

/** 매각투표 - 매각투표 목록 조회 (회원) - output */
export type ProjectSellVoteByFindManyProjectSellVoteByUserOutput = {
  /** 반대 수 (명) */
  againstCount?: Maybe<Scalars['Int']>;
  /** 찬성 수 (명) */
  favourCount?: Maybe<Scalars['Int']>;
  /** ID */
  id: Scalars['Int'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 회차 */
  no: Scalars['Int'];
  /** 매각 요청 금액 */
  requestSellAmount: Scalars['String'];
  /** 투표한 총 회원 수 */
  sellVoteCount: Scalars['Int'];
  /** 투표 종료일 */
  sellVoteEndedAt: Scalars['Date'];
  /** 투표 시작일 */
  sellVoteStartedAt: Scalars['Date'];
  /** 매각일 (홈페이지에 보여주기 용도) */
  soldDate: Scalars['Date'];
  /** 투표해야할 총 회원 수 */
  tabsWalletAmount: Scalars['Int'];
  /** 미참여 수 (명) */
  undoCount?: Maybe<Scalars['Int']>;
  /** 해당 회차 투표 결과 */
  voteKind?: Maybe<VoteKind>;
  /** 매각 투표 상태 */
  voteStatus: VoteStatus;
};

/** 프로젝트 매각 투표 회차 정보 파일 */
export type ProjectSellVoteFileModel = {
  /** 파일 종류 */
  fileKind: FileKind;
  /** 파일명 */
  fileName: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 자료명 */
  name?: Maybe<Scalars['String']>;
};

/** 프로젝트 매각 투표 목록 조회 (관리자) output - 프로젝트 */
export type ProjectSellVoteInFindManyProjectSellVoteByAdminOutput = {
  /** 반대 수 (명) */
  againstCount?: Maybe<Scalars['Int']>;
  /** 반대 % */
  againstRatio?: Maybe<Scalars['String']>;
  /** 투자관련문서 목록 */
  docs: Array<ProjectSellVoteFileModel>;
  /** 찬성 수 (명) */
  favourCount?: Maybe<Scalars['Int']>;
  /** 찬성 % */
  favourRatio?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['Int'];
  /** 회차 */
  no: Scalars['Int'];
  /** 매각 요청 금액 */
  requestSellAmount: Scalars['String'];
  /** 투표 종료일 */
  sellVoteEndedAt: Scalars['Date'];
  /** 투표 시작일 */
  sellVoteStartedAt: Scalars['Date'];
  /** 매각일 (홈페이지에 보여주기 용도) */
  soldDate: Scalars['Date'];
  /** 미참여 수 (명) */
  undoCount?: Maybe<Scalars['Int']>;
  /** 미참여 % */
  undoRatio?: Maybe<Scalars['String']>;
  /** 해당 회차 투표 결과 */
  voteKind?: Maybe<VoteKind>;
};

/** 프로젝트 매각 투표 회차 정보 */
export type ProjectSellVoteModel = {
  /** 반대 수 (명) */
  againstCount?: Maybe<Scalars['Int']>;
  /** 찬성 수 (명) */
  favourCount?: Maybe<Scalars['Int']>;
  /** ID */
  id: Scalars['Int'];
  /** 회차 */
  no: Scalars['Int'];
  /** 매각 요청 금액 */
  requestSellAmount: Scalars['String'];
  /** 투표 종료일 */
  sellVoteEndedAt: Scalars['Date'];
  /** 투표 시작일 */
  sellVoteStartedAt: Scalars['Date'];
  /** 매각일 (홈페이지에 보여주기 용도) */
  soldDate: Scalars['Date'];
  /** 미참여 수 (명) */
  undoCount?: Maybe<Scalars['Int']>;
  /** 해당 회차 투표 결과 */
  voteKind?: Maybe<VoteKind>;
};

/** 공모 내역 조회 (관리자) - output - 공모 */
export type PublicOfferingInFindManyPublicOfferingByAdminOutput = {
  /** 공모 금액 */
  amount: Scalars['String'];
  /** 환불 일자 */
  canceledAt?: Maybe<Scalars['Date']>;
  /** 일자 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 공모 취소 여부 (회원) */
  isCanceled: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 연락처 */
  phone: Scalars['String'];
  /** 공모 수량 (TABS) */
  quantity: Scalars['Int'];
  /** 공모 상태 */
  status: Scalars['String'];
};

/** 공모 내역 조회 (회원) - output - 공모 */
export type PublicOfferingInFindManyPublicOfferingByUserOutput = {
  /** 공모 금액 */
  amount: Scalars['String'];
  /** 환불 금액 */
  cancelAmount?: Maybe<Scalars['String']>;
  /** 환불 일자 */
  canceledAt?: Maybe<Scalars['Date']>;
  /** 환불 수량 (TABS) */
  cancelQuantity?: Maybe<Scalars['Int']>;
  /** 일자 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 공모 취소 여부 (회원) */
  isCanceled: Scalars['Boolean'];
  /** 마켓 거래 상태 */
  marketStatus: MarketStatus;
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 공모 수량 (TABS) */
  quantity: Scalars['Int'];
};

/** 공모 */
export type PublicOfferingModel = {
  /** 환불 일자 */
  canceledAt?: Maybe<Scalars['Date']>;
  /** 환불 수량 (TABS) */
  cancelQuantity?: Maybe<Scalars['Int']>;
  /** 일자 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 공모 취소 여부 (회원) */
  isCanceled: Scalars['Boolean'];
  /** 공모 수량 (TABS) */
  quantity: Scalars['Int'];
};

/** 공모 상태 */
export enum PublicOfferingStatus {
  /** 공모 실패 */
  Failure = 'FAILURE',
  /** 공모 중 */
  Offering = 'OFFERING',
  /** 공모 성공 */
  Success = 'SUCCESS',
  /** 공모 예정 */
  Wait = 'WAIT'
}

/** 공모 상태 필터 */
export enum PublicOfferingStatusFilter {
  /** 전체 */
  All = 'ALL',
  /** 공모 종료 */
  End = 'END',
  /** 공모 중 */
  Offering = 'OFFERING',
  /** 공모 예정 */
  Wait = 'WAIT'
}

export type Query = {
  /** 전체 설정 조회 */
  findCompanyData: CompanyDataModel;
  /** 실시간 거래정보 조회 */
  findDailyTransactionInfo: FindDailyTransactionInfoOutput;
  /** 탈퇴 조건 조회 (회원) */
  findDeleteConditionByUser: FindDeleteConditionByUserOutput;
  /** 이메일 찾기 (회원) */
  findEmailByUser: Scalars['String'];
  /** 투자 자격 조회 (회원) */
  findInvestmentQualificationByUser: FindInvestmentQualificationByUserOutput;
  /** 투자 유형 조회 (회원) */
  findInvestmentTypeByUser: FindInvestmentTypeByUserOutput;
  /** 가장 최근에 체결된 주문 조회 */
  findLatelySignedOrder: SignedOrderModel;
  /** 투자 자격 변경 요청 목록 조회 (관리자) */
  findManyChangeInvestmentQualificationByAdmin: FindManyChangeInvestmentQualificationByAdminOutput;
  /** 차트 데이터 목록 조회 */
  findManyChartData: Array<FindManyChartDataOutput>;
  /** 일일 거래정보 목록 조회 */
  findManyDailyTransactionInfo: FindManyDailyTransactionInfoOutput;
  /** 배당자 목록 조회 (관리자) */
  findManyDividendByAdmin: FindManyDividendByAdminOutput;
  /** FAQ 목록 조회 (회원) */
  findManyFaq: FindManyFaqOutput;
  /** FAQ 목록 조회 (관리자) */
  findManyFaqByAdmin: FindManyFaqByAdminOutput;
  /** FAQ 유형 목록 조회 */
  findManyFaqCategory: Array<FaqCategoryModel>;
  /** 투자 자격 목록 조회 (회원) */
  findManyInvestmentQualificationByUser: FindManyInvestmentQualificationByUserOutput;
  /** 마켓 거래중 프로젝트 목록 조회 (회원) */
  findManyMarketListedProject: FindManyMarketListedProjectOutput;
  /** 프로젝트 별 마켓 거래내역 조회 (회원) */
  findManyMarketTransferByProject: FindManyMarketTransferByProjectOutput;
  /** 마켓 거래내역 조회 (회원) */
  findManyMarketTransferByUser: FindManyMarketTransferByUserOutput;
  /** 공지사항 목록 조회 */
  findManyNotice: FindManyNoticeOutput;
  /** 공지사항 목록 조회 (관리자) */
  findManyNoticeByAdmin: FindManyNoticeByAdminOutput;
  /** 약관 목록 조회 */
  findManyPolicy: FindManyPolicyOutput;
  /** 약관 카테고리 목록 조회 */
  findManyPolicyCategory: Array<PolicyCategoryModel>;
  /** 프로젝트 목록 조회 */
  findManyProject: FindManyProjectOutput;
  /** 공모 상태별 프로젝트 목록 조회 */
  findManyProjectByPublicOfferingStatus: FindManyProjectByPublicOfferingStatusOutput;
  /** 프로젝트 배당 목록 조회 */
  findManyProjectDividend: FindManyProjectDividendOutput;
  /** 프로젝트 배당 목록 조회 (관리자) */
  findManyProjectDividendByAdmin: FindManyProjectDividendByAdminOutput;
  /** 프로젝트 파일 목록 조회 */
  findManyProjectFile: Array<ProjectFileModel>;
  /** 프로젝트 매각 투표 목록 조회 (관리자) */
  findManyProjectSellVoteByAdmin: FindManyProjectSellVoteByAdminOutput;
  /** 매각투표 목록 조회 (회원) */
  findManyProjectSellVoteByUser: FindManyProjectSellVoteByUserOutput;
  /** 공모 내역 조회 (관리자) */
  findManyPublicOfferingByAdmin: FindManyPublicOfferingByAdminOutput;
  /** 내 공모내역 조회 (회원) */
  findManyPublicOfferingByUser: FindManyPublicOfferingByUserOutput;
  /** 투표 종료 프로젝트 목록 조회 (회원) */
  findManySellVoteFavourProject: FindManySellVoteFavourProjectOutput;
  /**
   * 체결된 주문 목록 조회
   * @deprecated 개발중
   */
  findManySignedOrder: Array<SignedOrderModel>;
  /** 거래 내역 조회 (관리자) */
  findManySignedOrderByAdmin: FindManySignedOrderByAdminOutput;
  /** 매각 완료 프로젝트 목록 조회 (회원) */
  findManySoldProject: FindManySoldProjectOutput;
  /** 내 건물 목록 조회 (회원) */
  findManyTabsWalletByUser: FindManyTabsWalletByUserOutput;
  /** 내 건물 거래 내역 조회 (회원) */
  findManyTabsWalletTransferByUser: FindManyTabsWalletTransferByUserOutput;
  /** 미체결 주문 내역 조회 (회원) */
  findManyUnsignedOrderByUser: FindManyUnsignedOrderByUserOutput;
  /** 회원 목록 조회 (관리자) */
  findManyUserByAdmin: FindManyUserByAdminOutput;
  /** 1:1 문의 목록 조회 (관리자) */
  findManyUserInquiryByAdmin: FindManyUserInquiryByAdminOutput;
  /** 1:1 문의 목록 조회 (회원) */
  findManyUserInquiryByUser: FindManyUserInquiryByUserOutput;
  /** 1:1 문의 유형 목록 조회 */
  findManyUserInquiryCategory: Array<UserInquiryCategoryModel>;
  /** 지갑 거래내역 조회 (회원) */
  findManyWalletTransferByUser: FindManyWalletTransferByUserOutput;
  /** 마켓 거래 상세 조회 (회원) */
  findMarketTransferByUser: FindMarketTransferByUserOutput;
  /** 공지사항 상세 조회 */
  findNotice: NoticeModel;
  /** 십호가 조회 */
  findOrderBook: OrderBookModel;
  /** 약관 상세 조회 */
  findPolicy: PolicyModel;
  /** 매수 가능 금액 조회 (회원) */
  findPossibleBuyAmountByUser: Scalars['String'];
  /** 매도 가능 TABS 조회 (회원) */
  findPossibleSellTabsByUser: Scalars['Int'];
  /** 내 프로필 조회 (관리자) */
  findProfileFromAdmin: AdminModel;
  /** 내 프로필 조회 (회원) */
  findProfileFromUser: FindProfileFromUserOutput;
  /** 프로젝트 조회 */
  findProject: FindProjectOutput;
  /** 프로젝트 파일 조회 */
  findProjectFile: ProjectFileModel;
  /** 매각투표 상세 조회 (회원) */
  findProjectSellVoteByUser: FindProjectSellVoteByUserOutput;
  /** 공모 상세 조회 (관리자) */
  findPublicOfferingByAdmin: FindPublicOfferingByAdminOutput;
  /** 공모 정보 조회 */
  findPublicOfferingInfo: FindPublicOfferingInfoOutput;
  /** 공모 환불 정보 조회 (관리자) */
  findPublicOfferingRefundInfoByAdmin: FindPublicOfferingRefundInfoByAdminOutput;
  /** 공모 결과 조회 (회원) */
  findPublicOfferingResultByUser: FindPublicOfferingResultByUserOutput;
  /** 매각 정보 조회 */
  findSellInfo: FindSellInfoOutput;
  /** 내 건물 상세 조회 (회원) */
  findTabsWalletByUser: FindTabsWalletByUserOutput;
  /** 1:1 문의 상세 조회 (회원) */
  findUserInquiryByUser: FindUserInquiryByUserOutput;
  /** 내 지갑 조회 */
  findWalletByUser: FindWalletByUserOutput;
  /** 지갑 거래 조회 (회원) */
  findWalletTransferByUser: FindWalletTransferByUserOutput;
  /** 이메일 중복 검사 */
  isExistEmail: Scalars['Boolean'];
  /** 회원 존재 여부 확인 (회원) */
  isSignedUpByUser: Scalars['Boolean'];
  /** 로그인 (관리자) */
  signInFromAdmin: TokenOutput;
  /** 로그인 (회원) */
  signInFromUser: TokenOutput;
  /** 관리자 (관리자) */
  validateAdmin?: Maybe<Scalars['String']>;
  /** 2차 비밀번호 검사 (회원) */
  validateSubPasswordByUser: Scalars['Boolean'];
};


export type QueryFindDailyTransactionInfoArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindEmailByUserArgs = {
  impUid: Scalars['String'];
};


export type QueryFindInvestmentQualificationByUserArgs = {
  id: Scalars['Int'];
};


export type QueryFindInvestmentTypeByUserArgs = {
  id: Scalars['Int'];
};


export type QueryFindLatelySignedOrderArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindManyChangeInvestmentQualificationByAdminArgs = {
  gte: Scalars['Date'];
  lt: Scalars['Date'];
  searchText: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyChartDataArgs = {
  projectIds: Array<Scalars['Int']>;
};


export type QueryFindManyDailyTransactionInfoArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyDividendByAdminArgs = {
  projectDividendId: Scalars['Int'];
  searchText: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyFaqArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  faqCategoryId: Scalars['Int'];
  searchText: Scalars['String'];
  take: Scalars['Int'];
};


export type QueryFindManyFaqByAdminArgs = {
  faqCategoryId?: InputMaybe<Scalars['Int']>;
  searchText: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyMarketListedProjectArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  marketSorter: MarketSorter;
  take: Scalars['Int'];
};


export type QueryFindManyMarketTransferByProjectArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyMarketTransferByUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  gte: Scalars['Date'];
  lt: Scalars['Date'];
  take: Scalars['Int'];
  transferKind?: InputMaybe<MarketTransferKindFilter>;
};


export type QueryFindManyNoticeArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyNoticeByAdminArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyPolicyArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  policyCategoryId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyProjectArgs = {
  marketStatus?: InputMaybe<MarketStatus>;
  publicOfferingStatus?: InputMaybe<PublicOfferingStatus>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyProjectByPublicOfferingStatusArgs = {
  cursorDate?: InputMaybe<Scalars['Date']>;
  cursorId?: InputMaybe<Scalars['Int']>;
  publicOfferingStatusFilter?: InputMaybe<PublicOfferingStatusFilter>;
  take: Scalars['Int'];
};


export type QueryFindManyProjectDividendArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyProjectDividendByAdminArgs = {
  projectId: Scalars['Int'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyProjectFileArgs = {
  fileKind?: InputMaybe<FileKind>;
  projectId: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryFindManyProjectSellVoteByAdminArgs = {
  id: Scalars['Int'];
};


export type QueryFindManyProjectSellVoteByUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyPublicOfferingByAdminArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyPublicOfferingByUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManySellVoteFavourProjectArgs = {
  cursorDate?: InputMaybe<Scalars['Date']>;
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManySignedOrderArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindManySignedOrderByAdminArgs = {
  projectId: Scalars['Int'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManySoldProjectArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyTabsWalletByUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyTabsWalletTransferByUserArgs = {
  projectId: Scalars['Int'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyUnsignedOrderByUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyUserByAdminArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyUserInquiryByAdminArgs = {
  searchText: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  userInquiryCategoryId?: InputMaybe<Scalars['Int']>;
};


export type QueryFindManyUserInquiryByUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyWalletTransferByUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  gte: Scalars['Date'];
  lt: Scalars['Date'];
  take: Scalars['Int'];
  transferKind?: InputMaybe<TransferKindFilter>;
};


export type QueryFindMarketTransferByUserArgs = {
  id: Scalars['Int'];
};


export type QueryFindNoticeArgs = {
  id: Scalars['Int'];
};


export type QueryFindOrderBookArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindPolicyArgs = {
  id: Scalars['Int'];
};


export type QueryFindPossibleSellTabsByUserArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindProjectArgs = {
  id: Scalars['Int'];
};


export type QueryFindProjectFileArgs = {
  id: Scalars['Int'];
};


export type QueryFindProjectSellVoteByUserArgs = {
  id: Scalars['Int'];
};


export type QueryFindPublicOfferingByAdminArgs = {
  id: Scalars['Int'];
};


export type QueryFindPublicOfferingInfoArgs = {
  id: Scalars['Int'];
};


export type QueryFindPublicOfferingRefundInfoByAdminArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindPublicOfferingResultByUserArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindSellInfoArgs = {
  id: Scalars['Int'];
};


export type QueryFindTabsWalletByUserArgs = {
  projectId: Scalars['Int'];
};


export type QueryFindUserInquiryByUserArgs = {
  id: Scalars['Int'];
};


export type QueryFindWalletTransferByUserArgs = {
  id: Scalars['Int'];
};


export type QueryIsExistEmailArgs = {
  email: Scalars['String'];
};


export type QueryIsSignedUpByUserArgs = {
  impUid: Scalars['String'];
};


export type QuerySignInFromAdminArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QuerySignInFromUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryValidateAdminArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryValidateSubPasswordByUserArgs = {
  subPasswordInput: Scalars['String'];
};

/** 투자자격관련문서 목록 */
export type RequestChangeInvestmentQualificationByUserInput = {
  /** 투자자격관련문서 */
  file: Scalars['Upload'];
  /** 투자자격관련문서 카테고리 ID */
  investmentDocumentCategoryId: Scalars['Int'];
};

/** 권한명 */
export enum Role {
  /** 관리자 */
  Admin = 'ADMIN',
  /** 회원 */
  User = 'USER'
}

/** 매도 목록 */
export type SellHistoryByOrderBook = {
  /** 호가 (원) */
  askPrice: Scalars['String'];
  /** 수량 */
  count: Scalars['Int'];
};

/** 거래내역 조회 (관리자) output - 체결 */
export type SignedOrderInFindManySignedOrderByAdminOutput = {
  /** 호가 (원) */
  askPrice: Scalars['String'];
  /** 매수자 */
  buyer: Scalars['String'];
  /** 체결일 */
  createdAt: Scalars['Date'];
  /** 전일 대비 등락가 (원) */
  fluctuation: Scalars['String'];
  /** 전일 대비 등락률 (%) */
  fluctuationRatio: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 수량 (TABS) */
  quantity: Scalars['Int'];
  /** 매도자 */
  seller: Scalars['String'];
};

/** 체결된 주문 (RS) */
export type SignedOrderModel = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 현재가 */
  currentPrice: Scalars['String'];
  /** 등락가 */
  fluctuation: Scalars['String'];
  /** 등락률 */
  fluctuationRatio: Scalars['String'];
  /** 프로젝트 ID */
  projectId: Scalars['Int'];
  /** 수량 */
  quantity: Scalars['Int'];
  /** 체결 ID */
  signId: Scalars['Int'];
};

export type Subscription = {
  subscribeChartData: ChartDataModel;
  subscribeDailyTransactionInfo: DailyTransactionInfoModel;
  subscribeManyProject: Array<ProjectModel>;
  subscribeNewUserFromUser: UserModel;
  subscribeOrderBook: OrderBookModel;
  subscribeSignedOrder: SignedOrderModel;
};


export type SubscriptionSubscribeChartDataArgs = {
  projectIds: Array<Scalars['Int']>;
};


export type SubscriptionSubscribeDailyTransactionInfoArgs = {
  projectIds: Array<Scalars['Int']>;
};


export type SubscriptionSubscribeOrderBookArgs = {
  projectIds: Array<Scalars['Int']>;
};


export type SubscriptionSubscribeSignedOrderArgs = {
  projectIds: Array<Scalars['Int']>;
};

/** 내 건물 목록 조회 (회원) - output - 건물 */
export type TabsWalletInFindManyTabsWalletByUserOutput = {
  /** 현재가 (원) */
  currentAmount: Scalars['String'];
  /** 손익 금액 (원) */
  gainLossAmount: Scalars['String'];
  /** 손익률 (%) */
  gainLossRatio: Scalars['String'];
  /** 프로젝트명 */
  name: Scalars['String'];
  /** 프로젝트 ID */
  projectId: Scalars['Int'];
  /** 보유 TABS 개수 (TABS) */
  tabsCount: Scalars['Int'];
  /** 썸네일 */
  thumbnail?: Maybe<Scalars['String']>;
};

/** 내 건물 목록 조회 (회원) - output - 거래내역 */
export type TabsWalletTransferInFindManyTabsWalletTransferByUserOutput = {
  /** 호가 (원) */
  askPrice: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 수량 (TABS) */
  quantity: Scalars['Int'];
  /** 이체 종류 */
  transferKind: TransferKind;
};

/** 인증 토큰 output */
export type TokenOutput = {
  /** Access Token */
  accessToken: Scalars['String'];
  /** Refresh Token */
  refreshToken: Scalars['String'];
};

/** 지갑 이체 종류 */
export enum TransferKind {
  /** 매수 */
  Buy = 'BUY',
  /** 입금 */
  Deposit = 'DEPOSIT',
  /** 배당 */
  Dividend = 'DIVIDEND',
  /** 공모 */
  PublicOffering = 'PUBLIC_OFFERING',
  /** 매도 */
  Sell = 'SELL',
  /** 출금 */
  Withdrawal = 'WITHDRAWAL'
}

/** 지갑 이체 종류 필터 */
export enum TransferKindFilter {
  /** 입금 */
  Deposit = 'DEPOSIT',
  /** 출금 */
  Withdrawal = 'WITHDRAWAL'
}

/** 투자자격변경요청 목록 조회 (관리자) output - 회원 */
export type UserInFindManyChangeInvestmentQualificationByAdminOutput = {
  /** 이름 */
  name: Scalars['String'];
  /** 휴대폰 */
  phone: Scalars['String'];
};

/** 회원 목록 조회 (관리자) - output - 회원 */
export type UserInFindManyUserByAdminOutput = {
  /** 생년월일 */
  birth: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 이메일 */
  email?: Maybe<Scalars['String']>;
  /** 계좌 존재 여부 */
  isExistAccount: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 휴대폰 */
  phone: Scalars['String'];
  /** 한도 */
  possibleInvestmentAmount: Scalars['String'];
};

/** 1:1 문의 목록 조회 (관리자) - output - 작성한 회원 */
export type UserInFindManyUserInquiryByAdminOutput = {
  /** 이름 */
  name: Scalars['String'];
  /** 휴대폰 */
  phone: Scalars['String'];
};

/** 공모 상세 조회 (관리자) output */
export type UserInFindPublicOfferingByAdminOutput = {
  /** 이름 */
  name: Scalars['String'];
  /** 휴대폰 */
  phone: Scalars['String'];
};

/** 내 지갑 조회 - output - 회원 */
export type UserInFindWalletByUserOutput = {
  /** 계좌 */
  account?: Maybe<AccountInFindWalletByUserOutput>;
  /** 이름 */
  name: Scalars['String'];
};

/** 1:1 문의 유형 */
export type UserInquiryCategoryModel = {
  /** ID */
  id: Scalars['Int'];
  /** 유형명 */
  name: Scalars['String'];
};

/** 1:1 문의 목록 조회 (관리자) - output - 1:1 문의 */
export type UserInquiryInFindManyUserInquiryByAdminOutput = {
  /** 답변한 관리자 */
  admin?: Maybe<AdminInFindManyUserInquiryByAdminOutput>;
  /** 문의 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 답변일 */
  repliedAt?: Maybe<Scalars['Date']>;
  /** 답변 내용 */
  reply?: Maybe<Scalars['String']>;
  /** 제목 */
  title: Scalars['String'];
  /** 작성한 회원 */
  user: UserInFindManyUserInquiryByAdminOutput;
  /** 1:1 문의 유형 */
  userInquiryCategory: UserInquiryCategoryModel;
};

/** 1:1 문의 목록 조회 (회원) - output - 1:1 문의 */
export type UserInquiryInFindManyUserInquiryByUserOutput = {
  /** 문의 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 답변일 */
  repliedAt?: Maybe<Scalars['Date']>;
  /** 답변 내용 */
  reply?: Maybe<Scalars['String']>;
  /** 제목 */
  title: Scalars['String'];
  /** 1:1 문의 유형 */
  userInquiryCategory: UserInquiryCategoryModel;
};

/** 회원 */
export type UserModel = {
  /** 주소 */
  address?: Maybe<Scalars['String']>;
  /** 상세주소 */
  addressDetail?: Maybe<Scalars['String']>;
  /** 생년월일 */
  birth: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 이메일 */
  email?: Maybe<Scalars['String']>;
  /** 마케팅 수신 동의 여부 */
  isAllowedMarketing: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 휴대폰 */
  phone: Scalars['String'];
  /** 권한명 */
  role: Role;
  /** 우편번호 */
  zip?: Maybe<Scalars['String']>;
};

/** 투표 종류 */
export enum VoteKind {
  /** 반대 */
  Against = 'AGAINST',
  /** 찬성 */
  Favour = 'FAVOUR'
}

/** 매각 투표 상태 */
export enum VoteStatus {
  /** 계획 없음 */
  None = 'NONE',
  /** 매각투표 완료 */
  SellVoteComplete = 'SELL_VOTE_COMPLETE',
  /** 매각투표 예정 */
  SellVoteWait = 'SELL_VOTE_WAIT',
  /** 매각투표 중 */
  SellVoting = 'SELL_VOTING'
}

/** 내 정보 조회 (회원) - 지갑 */
export type WalletInFindProfileFromUserOutput = {
  /** 예치금 잔액 */
  balance: Scalars['String'];
};

/** 지갑 거래내역 조회 output - 거래내역 */
export type WalletTransferInFindManyWalletTransferByUserOutput = {
  /** 계좌 */
  account?: Maybe<AccountInFindManyWalletTransferByUserOutput>;
  /** 이체 후 잔액 (원) */
  balance: Scalars['String'];
  /** 최종 금액 (= 금액 (+ | -) 수수료) */
  calcAmount: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 배당 */
  dividend?: Maybe<DividendInFindManyWalletTransferByUserOutput>;
  /** 수수료 (원) */
  fee: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 거래명 */
  name: Scalars['String'];
  /** 이체 종류 */
  transferKind: TransferKind;
};

export type CreateFaqByAdminMutationVariables = Exact<{
  question: Scalars['String'];
  answer: Scalars['String'];
  faqCategoryId: Scalars['Int'];
}>;


export type CreateFaqByAdminMutation = { createFaqByAdmin: boolean };

export type CreateNoticeByAdminMutationVariables = Exact<{
  title: Scalars['String'];
  noticeKind: NoticeKind;
  content: Scalars['String'];
}>;


export type CreateNoticeByAdminMutation = { createNoticeByAdmin: boolean };

export type CreateProjectByAdminMutationVariables = Exact<{
  name: Scalars['String'];
  zip: Scalars['String'];
  address: Scalars['String'];
  addressDetail: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  zoning: Scalars['String'];
  mainPurpose: Scalars['String'];
  grossFloorAreaMeter: Scalars['String'];
  grossFloorAreaPyeong: Scalars['String'];
  buildingCoverageRatio: Scalars['String'];
  floorAreaRatio: Scalars['String'];
  officialLandPrice: Scalars['String'];
  completionDate: Scalars['Date'];
  lessee?: InputMaybe<Scalars['String']>;
  leaseStartedAt?: InputMaybe<Scalars['Date']>;
  leaseEndedAt?: InputMaybe<Scalars['Date']>;
  url?: InputMaybe<Scalars['String']>;
  tabsName: Scalars['String'];
  totalPublicOfferingAmount: Scalars['String'];
  publicOfferingPrice: Scalars['String'];
  publicOfferingQuantity: Scalars['Int'];
  issuer: Scalars['String'];
  publicOfferingStartedAt: Scalars['Date'];
  publicOfferingEndedAt: Scalars['Date'];
  allocationDate: Scalars['Date'];
  receivingDate: Scalars['Date'];
  listedDate: Scalars['Date'];
  images: Array<ImageInCreateProjectByAdminArgs> | ImageInCreateProjectByAdminArgs;
  docs: Array<DocInCreateProjectByAdminArgs> | DocInCreateProjectByAdminArgs;
  officialInfos: Array<OfficialInfoInCreateProjectByAdminArgs> | OfficialInfoInCreateProjectByAdminArgs;
}>;


export type CreateProjectByAdminMutation = { createProjectByAdmin: { id: number, name: string, publicOfferingStatus: PublicOfferingStatus, marketStatus: MarketStatus, voteStatus: VoteStatus, isSold: boolean, zip: string, address: string, addressDetail: string, latitude: string, longitude: string, zoning: string, mainPurpose: string, grossFloorAreaMeter: string, grossFloorAreaPyeong: string, buildingCoverageRatio: string, floorAreaRatio: string, officialLandPrice: string, completionDate: any, lessee?: string | null, leaseStartedAt?: any | null, leaseEndedAt?: any | null, url?: string | null, tabsName: string, totalPublicOfferingAmount: string, publicOfferingPrice: string, publicOfferingQuantity: number, issuer: string, publicOfferingStartedAt: any, publicOfferingEndedAt: any, allocationDate: any, receivingDate: any, listedDate: any, currentPublicOfferingAmount: string, currentPublicOfferingQuantity: number, createdAt: any } };

export type RefreshFromAdminMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshFromAdminMutation = { refreshFromAdmin: { accessToken: string, refreshToken: string } };

export type ReplyUserInquiryByAdminMutationVariables = Exact<{
  id: Scalars['Int'];
  reply: Scalars['String'];
}>;


export type ReplyUserInquiryByAdminMutation = { replyUserInquiryByAdmin: boolean };

export type SignUpFromAdminMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignUpFromAdminMutation = { signUpFromAdmin: { email: string, name: string, createdAt: any, role: Role } };

export type TreatChangeInvestmentQualificationByAdminMutationVariables = Exact<{
  id: Scalars['Int'];
  approveStatus: ApproveStatus;
  reason?: InputMaybe<Scalars['String']>;
}>;


export type TreatChangeInvestmentQualificationByAdminMutation = { treatChangeInvestmentQualificationByAdmin: boolean };

export type UpdateFaqByAdminMutationVariables = Exact<{
  id: Scalars['Int'];
  question: Scalars['String'];
  answer: Scalars['String'];
  faqCategoryId: Scalars['Int'];
}>;


export type UpdateFaqByAdminMutation = { updateFaqByAdmin: boolean };

export type UpdateNoticeByAdminMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  noticeKind: NoticeKind;
  content: Scalars['String'];
}>;


export type UpdateNoticeByAdminMutation = { updateNoticeByAdmin: boolean };

export type UpdateVoteKindByAdminMutationVariables = Exact<{
  projectId: Scalars['Int'];
  voteKind: VoteKind;
}>;


export type UpdateVoteKindByAdminMutation = { updateVoteKindByAdmin: { id: number } };

export type UploadNoticeFileByAdminMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadNoticeFileByAdminMutation = { uploadNoticeFileByAdmin: string };

export type FindManyChangeInvestmentQualificationByAdminQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  searchText: Scalars['String'];
  gte: Scalars['Date'];
  lt: Scalars['Date'];
}>;


export type FindManyChangeInvestmentQualificationByAdminQuery = { findManyChangeInvestmentQualificationByAdmin: { totalCount: number, changeInvestmentQualifications: Array<{ id: number, approveStatus: ApproveStatus, reason?: string | null, createdAt: any, treatedAt?: any | null, originInvestmentQualification: { name: string, possibleInvestmentAmount: string }, investmentQualification: { name: string, possibleInvestmentAmount: string }, investmentType: { name: string }, user: { name: string, phone: string }, admin?: { name: string } | null, investmentDocuments: Array<{ fileName: string, investmentDocumentCategory: { name: string } }> }> } };

export type FindManyFaqByAdminQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  searchText: Scalars['String'];
  faqCategoryId: Scalars['Int'];
}>;


export type FindManyFaqByAdminQuery = { findManyFaqByAdmin: { totalCount: number, faqs: Array<{ id: number, question: string, answer: string, createdAt: any, faqCategory: { id: number, name: string }, admin: { name: string } }> } };

export type FindManyFaqCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyFaqCategoryQuery = { findManyFaqCategory: Array<{ id: number, name: string }> };

export type FindManyNoticeByAdminQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type FindManyNoticeByAdminQuery = { findManyNoticeByAdmin: { totalCount: number, notices: Array<{ id: number, noticeKind: NoticeKind, title: string, content: string, createdAt: any, admin: { name: string } }> } };

export type FindManyPolicyQueryVariables = Exact<{
  take: Scalars['Int'];
  cursorId?: InputMaybe<Scalars['Int']>;
  policyCategoryId?: InputMaybe<Scalars['Int']>;
}>;


export type FindManyPolicyQuery = { findManyPolicy: { totalCount: number, policies: Array<{ id: number, title: string, isRequired: boolean }> } };

export type FindManyProjectQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  publicOfferingStatus?: InputMaybe<PublicOfferingStatus>;
  marketStatus?: InputMaybe<MarketStatus>;
}>;


export type FindManyProjectQuery = { findManyProject: { totalCount: number, projects: Array<{ id: number, name: string, publicOfferingStatus: PublicOfferingStatus, marketStatus: MarketStatus, voteStatus: VoteStatus, totalPublicOfferingAmount: string, publicOfferingPrice: string, publicOfferingQuantity: number, publicOfferingStartedAt: any, publicOfferingEndedAt: any, currentPrice?: string | null, fluctuation?: string | null, fluctuationRatio?: string | null, dDay?: number | null, url?: string | null, projectFiles: Array<{ id: number, fileKind: FileKind, name?: string | null, fileName: string }>, dailyTransactionInfos: Array<{ standardPrice: string, totalTransactionAmount: string, totalVolume: number, fluctuation: string, fluctuationRatio: string }> }> } };

export type FindManyProjectDividendByAdminQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  projectId: Scalars['Int'];
}>;


export type FindManyProjectDividendByAdminQuery = { findManyProjectDividendByAdmin: { totalCount: number, projectDividends: Array<{ id: number, name: string, closingDate: any, operatingProfit?: string | null, dividendPerTabs?: string | null, dividendCount?: number | null, dividendAt?: any | null }> } };

export type FindManyPublicOfferingByAdminQueryVariables = Exact<{
  take: Scalars['Int'];
  cursorId?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
}>;


export type FindManyPublicOfferingByAdminQuery = { findManyPublicOfferingByAdmin: { totalCount: number, publicOfferings: Array<{ id: number, quantity: number, isCanceled: boolean, createdAt: any, canceledAt?: any | null, name: string, phone: string, status: string, amount: string }> } };

export type FindManyUserByAdminQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type FindManyUserByAdminQuery = { findManyUserByAdmin: { totalCount: number, users: Array<{ email?: string | null, name: string, phone: string, createdAt: any, possibleInvestmentAmount: string, isExistAccount: boolean, birth: string }> } };

export type FindManyUserInquiryByAdminQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  searchText: Scalars['String'];
  userInquiryCategoryId: Scalars['Int'];
}>;


export type FindManyUserInquiryByAdminQuery = { findManyUserInquiryByAdmin: { totalCount: number, userInquiries: Array<{ id: number, title: string, content: string, reply?: string | null, repliedAt?: any | null, createdAt: any, userInquiryCategory: { id: number, name: string }, admin?: { name: string } | null, user: { name: string, phone: string } }> } };

export type FindManyUserInquiryCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyUserInquiryCategoryQuery = { findManyUserInquiryCategory: Array<{ id: number, name: string }> };

export type FindProfileFromAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileFromAdminQuery = { findProfileFromAdmin: { email: string, name: string, createdAt: any, role: Role } };

export type FindProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindProjectQuery = { findProject: { id: number, name: string, publicOfferingStatus: PublicOfferingStatus, marketStatus: MarketStatus, voteStatus: VoteStatus, isSold: boolean, zip: string, address: string, addressDetail: string, latitude: string, longitude: string, zoning: string, mainPurpose: string, grossFloorAreaMeter: string, grossFloorAreaPyeong: string, buildingCoverageRatio: string, floorAreaRatio: string, officialLandPrice: string, completionDate: any, lessee?: string | null, leaseStartedAt?: any | null, leaseEndedAt?: any | null, url?: string | null, tabsName: string, totalPublicOfferingAmount: string, publicOfferingPrice: string, publicOfferingQuantity: number, issuer: string, publicOfferingStartedAt: any, publicOfferingEndedAt: any, allocationDate: any, receivingDate: any, listedDate: any, currentPublicOfferingAmount: string, currentPublicOfferingQuantity: number, totalDailyVolume: number, totalDailyTransactionAmount: string, dividendPeriod?: string | null, createdAt?: any | null, signId?: number | null, projectId?: number | null, currentPrice?: string | null, fluctuation?: string | null, fluctuationRatio?: string | null, quantity?: number | null, dDay?: number | null, projectFiles: Array<{ id: number, fileKind: FileKind, name?: string | null, fileName: string }> } };

export type FindProjectFileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindProjectFileQuery = { findProjectFile: { id: number, fileKind: FileKind, name?: string | null, fileName: string } };

export type SignInFromAdminQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  code: Scalars['String'];
}>;


export type SignInFromAdminQuery = { signInFromAdmin: { accessToken: string, refreshToken: string } };

export type ValidateAdminQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ValidateAdminQuery = { validateAdmin?: string | null };


export const CreateFaqByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createFaqByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"question"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"faqCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFaqByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"question"},"value":{"kind":"Variable","name":{"kind":"Name","value":"question"}}},{"kind":"Argument","name":{"kind":"Name","value":"answer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answer"}}},{"kind":"Argument","name":{"kind":"Name","value":"faqCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"faqCategoryId"}}}]}]}}]} as unknown as DocumentNode<CreateFaqByAdminMutation, CreateFaqByAdminMutationVariables>;
export const CreateNoticeByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNoticeByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noticeKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NoticeKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNoticeByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"noticeKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noticeKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<CreateNoticeByAdminMutation, CreateNoticeByAdminMutationVariables>;
export const CreateProjectByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProjectByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressDetail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoning"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mainPurpose"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"grossFloorAreaMeter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"grossFloorAreaPyeong"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildingCoverageRatio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"floorAreaRatio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officialLandPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"completionDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessee"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaseStartedAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaseEndedAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tabsName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalPublicOfferingAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingQuantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issuer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingStartedAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingEndedAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allocationDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receivingDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listedDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"images"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImageInCreateProjectByAdminArgs"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"docs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocInCreateProjectByAdminArgs"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officialInfos"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialInfoInCreateProjectByAdminArgs"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProjectByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"zip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zip"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"addressDetail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressDetail"}}},{"kind":"Argument","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"zoning"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoning"}}},{"kind":"Argument","name":{"kind":"Name","value":"mainPurpose"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mainPurpose"}}},{"kind":"Argument","name":{"kind":"Name","value":"grossFloorAreaMeter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"grossFloorAreaMeter"}}},{"kind":"Argument","name":{"kind":"Name","value":"grossFloorAreaPyeong"},"value":{"kind":"Variable","name":{"kind":"Name","value":"grossFloorAreaPyeong"}}},{"kind":"Argument","name":{"kind":"Name","value":"buildingCoverageRatio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildingCoverageRatio"}}},{"kind":"Argument","name":{"kind":"Name","value":"floorAreaRatio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"floorAreaRatio"}}},{"kind":"Argument","name":{"kind":"Name","value":"officialLandPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officialLandPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"completionDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"completionDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"lessee"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessee"}}},{"kind":"Argument","name":{"kind":"Name","value":"leaseStartedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaseStartedAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"leaseEndedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaseEndedAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}},{"kind":"Argument","name":{"kind":"Name","value":"tabsName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tabsName"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalPublicOfferingAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalPublicOfferingAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicOfferingPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicOfferingQuantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingQuantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"issuer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issuer"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicOfferingStartedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingStartedAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicOfferingEndedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingEndedAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"allocationDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allocationDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"receivingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receivingDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"listedDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listedDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"images"},"value":{"kind":"Variable","name":{"kind":"Name","value":"images"}}},{"kind":"Argument","name":{"kind":"Name","value":"docs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"docs"}}},{"kind":"Argument","name":{"kind":"Name","value":"officialInfos"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officialInfos"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingStatus"}},{"kind":"Field","name":{"kind":"Name","value":"marketStatus"}},{"kind":"Field","name":{"kind":"Name","value":"voteStatus"}},{"kind":"Field","name":{"kind":"Name","value":"isSold"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"zoning"}},{"kind":"Field","name":{"kind":"Name","value":"mainPurpose"}},{"kind":"Field","name":{"kind":"Name","value":"grossFloorAreaMeter"}},{"kind":"Field","name":{"kind":"Name","value":"grossFloorAreaPyeong"}},{"kind":"Field","name":{"kind":"Name","value":"buildingCoverageRatio"}},{"kind":"Field","name":{"kind":"Name","value":"floorAreaRatio"}},{"kind":"Field","name":{"kind":"Name","value":"officialLandPrice"}},{"kind":"Field","name":{"kind":"Name","value":"completionDate"}},{"kind":"Field","name":{"kind":"Name","value":"lessee"}},{"kind":"Field","name":{"kind":"Name","value":"leaseStartedAt"}},{"kind":"Field","name":{"kind":"Name","value":"leaseEndedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"tabsName"}},{"kind":"Field","name":{"kind":"Name","value":"totalPublicOfferingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"issuer"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingStartedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingEndedAt"}},{"kind":"Field","name":{"kind":"Name","value":"allocationDate"}},{"kind":"Field","name":{"kind":"Name","value":"receivingDate"}},{"kind":"Field","name":{"kind":"Name","value":"listedDate"}},{"kind":"Field","name":{"kind":"Name","value":"currentPublicOfferingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currentPublicOfferingQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateProjectByAdminMutation, CreateProjectByAdminMutationVariables>;
export const RefreshFromAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshFromAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshFromAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshFromAdminMutation, RefreshFromAdminMutationVariables>;
export const ReplyUserInquiryByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"replyUserInquiryByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reply"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replyUserInquiryByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"reply"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reply"}}}]}]}}]} as unknown as DocumentNode<ReplyUserInquiryByAdminMutation, ReplyUserInquiryByAdminMutationVariables>;
export const SignUpFromAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUpFromAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpFromAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<SignUpFromAdminMutation, SignUpFromAdminMutationVariables>;
export const TreatChangeInvestmentQualificationByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"treatChangeInvestmentQualificationByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"approveStatus"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApproveStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"treatChangeInvestmentQualificationByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"approveStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"approveStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}}]}]}}]} as unknown as DocumentNode<TreatChangeInvestmentQualificationByAdminMutation, TreatChangeInvestmentQualificationByAdminMutationVariables>;
export const UpdateFaqByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateFaqByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"question"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"faqCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFaqByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"question"},"value":{"kind":"Variable","name":{"kind":"Name","value":"question"}}},{"kind":"Argument","name":{"kind":"Name","value":"answer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answer"}}},{"kind":"Argument","name":{"kind":"Name","value":"faqCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"faqCategoryId"}}}]}]}}]} as unknown as DocumentNode<UpdateFaqByAdminMutation, UpdateFaqByAdminMutationVariables>;
export const UpdateNoticeByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateNoticeByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noticeKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NoticeKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNoticeByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"noticeKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noticeKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<UpdateNoticeByAdminMutation, UpdateNoticeByAdminMutationVariables>;
export const UpdateVoteKindByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateVoteKindByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"voteKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoteKind"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVoteKindByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"voteKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"voteKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateVoteKindByAdminMutation, UpdateVoteKindByAdminMutationVariables>;
export const UploadNoticeFileByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadNoticeFileByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadNoticeFileByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}]}]}}]} as unknown as DocumentNode<UploadNoticeFileByAdminMutation, UploadNoticeFileByAdminMutationVariables>;
export const FindManyChangeInvestmentQualificationByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyChangeInvestmentQualificationByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gte"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyChangeInvestmentQualificationByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}},{"kind":"Argument","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gte"}}},{"kind":"Argument","name":{"kind":"Name","value":"lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"changeInvestmentQualifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"approveStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"treatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"originInvestmentQualification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"possibleInvestmentAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"investmentQualification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"possibleInvestmentAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"investmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"investmentDocuments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"investmentDocumentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindManyChangeInvestmentQualificationByAdminQuery, FindManyChangeInvestmentQualificationByAdminQueryVariables>;
export const FindManyFaqByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyFaqByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"faqCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyFaqByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}},{"kind":"Argument","name":{"kind":"Name","value":"faqCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"faqCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"faqs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"faqCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindManyFaqByAdminQuery, FindManyFaqByAdminQueryVariables>;
export const FindManyFaqCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyFaqCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyFaqCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindManyFaqCategoryQuery, FindManyFaqCategoryQueryVariables>;
export const FindManyNoticeByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyNoticeByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyNoticeByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"notices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"noticeKind"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindManyNoticeByAdminQuery, FindManyNoticeByAdminQueryVariables>;
export const FindManyPolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyPolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"policyCategoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyPolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"policyCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"policyCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyPolicyQuery, FindManyPolicyQueryVariables>;
export const FindManyProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicOfferingStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"marketStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MarketStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicOfferingStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicOfferingStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"marketStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"marketStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingStatus"}},{"kind":"Field","name":{"kind":"Name","value":"marketStatus"}},{"kind":"Field","name":{"kind":"Name","value":"voteStatus"}},{"kind":"Field","name":{"kind":"Name","value":"totalPublicOfferingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingStartedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingEndedAt"}},{"kind":"Field","name":{"kind":"Name","value":"projectFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKind"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dailyTransactionInfos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactionAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalVolume"}},{"kind":"Field","name":{"kind":"Name","value":"fluctuation"}},{"kind":"Field","name":{"kind":"Name","value":"fluctuationRatio"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"fluctuation"}},{"kind":"Field","name":{"kind":"Name","value":"fluctuationRatio"}},{"kind":"Field","name":{"kind":"Name","value":"dDay"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<FindManyProjectQuery, FindManyProjectQueryVariables>;
export const FindManyProjectDividendByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyProjectDividendByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyProjectDividendByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"projectDividends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"closingDate"}},{"kind":"Field","name":{"kind":"Name","value":"operatingProfit"}},{"kind":"Field","name":{"kind":"Name","value":"dividendPerTabs"}},{"kind":"Field","name":{"kind":"Name","value":"dividendCount"}},{"kind":"Field","name":{"kind":"Name","value":"dividendAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyProjectDividendByAdminQuery, FindManyProjectDividendByAdminQueryVariables>;
export const FindManyPublicOfferingByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyPublicOfferingByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyPublicOfferingByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"isCanceled"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"canceledAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyPublicOfferingByAdminQuery, FindManyPublicOfferingByAdminQueryVariables>;
export const FindManyUserByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyUserByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyUserByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"possibleInvestmentAmount"}},{"kind":"Field","name":{"kind":"Name","value":"isExistAccount"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyUserByAdminQuery, FindManyUserByAdminQueryVariables>;
export const FindManyUserInquiryByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyUserInquiryByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInquiryCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyUserInquiryByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}},{"kind":"Argument","name":{"kind":"Name","value":"userInquiryCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInquiryCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"userInquiries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"reply"}},{"kind":"Field","name":{"kind":"Name","value":"repliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"userInquiryCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindManyUserInquiryByAdminQuery, FindManyUserInquiryByAdminQueryVariables>;
export const FindManyUserInquiryCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyUserInquiryCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyUserInquiryCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindManyUserInquiryCategoryQuery, FindManyUserInquiryCategoryQueryVariables>;
export const FindProfileFromAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findProfileFromAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findProfileFromAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<FindProfileFromAdminQuery, FindProfileFromAdminQueryVariables>;
export const FindProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingStatus"}},{"kind":"Field","name":{"kind":"Name","value":"marketStatus"}},{"kind":"Field","name":{"kind":"Name","value":"voteStatus"}},{"kind":"Field","name":{"kind":"Name","value":"isSold"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"zoning"}},{"kind":"Field","name":{"kind":"Name","value":"mainPurpose"}},{"kind":"Field","name":{"kind":"Name","value":"grossFloorAreaMeter"}},{"kind":"Field","name":{"kind":"Name","value":"grossFloorAreaPyeong"}},{"kind":"Field","name":{"kind":"Name","value":"buildingCoverageRatio"}},{"kind":"Field","name":{"kind":"Name","value":"floorAreaRatio"}},{"kind":"Field","name":{"kind":"Name","value":"officialLandPrice"}},{"kind":"Field","name":{"kind":"Name","value":"completionDate"}},{"kind":"Field","name":{"kind":"Name","value":"lessee"}},{"kind":"Field","name":{"kind":"Name","value":"leaseStartedAt"}},{"kind":"Field","name":{"kind":"Name","value":"leaseEndedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"tabsName"}},{"kind":"Field","name":{"kind":"Name","value":"totalPublicOfferingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"issuer"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingStartedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publicOfferingEndedAt"}},{"kind":"Field","name":{"kind":"Name","value":"allocationDate"}},{"kind":"Field","name":{"kind":"Name","value":"receivingDate"}},{"kind":"Field","name":{"kind":"Name","value":"listedDate"}},{"kind":"Field","name":{"kind":"Name","value":"currentPublicOfferingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currentPublicOfferingQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"totalDailyVolume"}},{"kind":"Field","name":{"kind":"Name","value":"totalDailyTransactionAmount"}},{"kind":"Field","name":{"kind":"Name","value":"dividendPeriod"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"signId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"currentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"fluctuation"}},{"kind":"Field","name":{"kind":"Name","value":"fluctuationRatio"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"projectFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKind"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dDay"}}]}}]}}]} as unknown as DocumentNode<FindProjectQuery, FindProjectQueryVariables>;
export const FindProjectFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findProjectFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findProjectFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKind"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}}]}}]} as unknown as DocumentNode<FindProjectFileQuery, FindProjectFileQueryVariables>;
export const SignInFromAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"signInFromAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInFromAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<SignInFromAdminQuery, SignInFromAdminQueryVariables>;
export const ValidateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"validateAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<ValidateAdminQuery, ValidateAdminQueryVariables>;