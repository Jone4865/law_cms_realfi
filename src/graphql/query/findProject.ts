import { gql } from '../generated';

export const FIND_PROJECT = gql(/* GraphQL */ `
  query findProject($id: Int!) {
    findProject(id: $id) {
      id
      name
      publicOfferingStatus
      marketStatus
      voteStatus
      isSold
      zip
      address
      addressDetail
      latitude
      longitude
      zoning
      mainPurpose
      grossFloorAreaMeter
      grossFloorAreaPyeong
      buildingCoverageRatio
      floorAreaRatio
      officialLandPrice
      completionDate
      lessee
      leaseStartedAt
      leaseEndedAt
      url
      tabsName
      totalPublicOfferingAmount
      publicOfferingPrice
      publicOfferingQuantity
      issuer
      publicOfferingStartedAt
      publicOfferingEndedAt
      allocationDate
      receivingDate
      listedDate
      currentPublicOfferingAmount
      currentPublicOfferingQuantity
      totalDailyVolume
      totalDailyTransactionAmount
      dividendPeriod
      createdAt
      signId
      projectId
      currentPrice
      fluctuation
      fluctuationRatio
      quantity
      projectFiles {
        id
        fileKind
        name
        fileName
      }
      dDay
      # dailyTransactionInfos {
      #   standardPrice
      #   openPrice
      #   closePrice
      #   upperLimitPrice
      #   lowerLimitPrice
      #   dayHighPrice
      #   dayLowPrice
      #   fluctuation
      #   fluctuationRatio
      #   totalVolume
      #   totalTransactionAmount
      # }
    }
  }
`);

// // 요청 분기점
// const [findProject, { loading }] = useLazyQuery(
//   FIND_PROJECT,
//   {
//     onError: (error) => {
//       notification.error({ message: error.message });
//     },
//     onCompleted: (data) => {
//       console.log(data);
//     },
//   },
// );

// // 요청 코드
//   findProject({
//     variables: {
//       id:projectId
//     },
//   });
