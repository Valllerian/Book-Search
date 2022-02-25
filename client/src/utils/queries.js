import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    getMe {
        _id
        username
        email
        bookCount
        savedBooks{
            bookId
            authors
            image
            description
            title
            link
        }
    }
}
`;