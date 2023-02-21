import { gql } from '../generated';

export const FIND_MANY_CHANGE_INVESTMENT_QUALIFICATION_BY_ADMIN = gql(/* GraphQL */ `
  query findManyChangeInvestmentQualificationByAdmin(
    $take: Int!
    $skip: Int!
    $searchText: String!
    $gte: Date!
    $lt: Date!
  ) {
    findManyChangeInvestmentQualificationByAdmin(
      take: $take
      skip: $skip
      searchText: $searchText
      gte: $gte
      lt: $lt
    ) {
      totalCount
      changeInvestmentQualifications {
        id
        approveStatus
        reason
        createdAt
        treatedAt
        originInvestmentQualification {
          name
          possibleInvestmentAmount
        }
        investmentQualification {
          name
          possibleInvestmentAmount
        }
        investmentType {
          name
        }
        user {
          name
          phone
        }
        admin {
          name
        }
        investmentDocuments {
          fileName
          investmentDocumentCategory {
            name
          }
        }
      }
    }
  }
`);
