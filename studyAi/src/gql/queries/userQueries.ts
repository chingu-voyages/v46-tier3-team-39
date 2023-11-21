import { gql } from "../../../graphql/generated";
export const UpdateUserProfileInfo = gql(`
  mutation UpdateUserProfileInfo (
    $id: String!,
    $tags: UserUpdatetagsInput,
    $name: StringFieldUpdateOperationsInput,
    $school: NullableStringFieldUpdateOperationsInput,
    $location: LocationDataNullableUpdateEnvelopeInput
  ) {
    updateOneUser(
      where: { id: $id },
      data: {
        tags: $tags,
        name: $name,
        school: $school
        location: $location
      },
    )
    {
      tags
      name
      school
    }
  }
`);
