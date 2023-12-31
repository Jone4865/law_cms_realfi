import { gql } from '../generated';

export const FIND_MANY_PUBLICOFFERING_EXTENSION_BY_ADMIN = gql(/* GraphQL */ `
  query findManyPublicOfferingExtensionByAdmin($projectId: Int!) {
    findManyPublicOfferingExtensionByAdmin(projectId: $projectId) {
      totalCount
      publicOfferingExtensions {
        originEndedAt
        newEndedAt
        originAllocationDate
        newAllocationDate
        originReceivingDate
        newReceivingDate
        originListedDate
        newListedDate
        createdAt
        admin {
          name
        }
      }
    }
  }
`);
