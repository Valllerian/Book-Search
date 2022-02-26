import { gql } from '@apollo/client';

// LOGIN USER mutation

export const LOGIN_USER = gql`
    mutation login(
        $email: String!, $
        password: String!) 
        {
        login(
            email: $email, 
            password: $password) 
            {
            token
            user {
                _id
                username
            }
        }}
`;

// CREATE USER mutation;

export const ADD_USER = gql`
    mutation createUser(
        $username: String!, 
        $email: String!, 
        $password: String!
        ) 
        {
            createUser(
                username: $username, 
                email: $email, 
                password: $password
                ) 
                {
                    token
                    user 
                    {
                        _id
                         username
                         email
            }
        }
    }
`;

// SAVE BOOK mutation;

export const SAVE_BOOK = gql`
    mutation saveBook(
        $bookData: BookInput!
    ){
        saveBook(
            bookData: $bookData
        ){
            _id
            username
            email
            savedBooks{
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`



// REMOVE BOOK mutation;

export const REMOVE_BOOK = gql`
    mutation deleteBook(
        $bookId: ID!) 
        {
        deleteBook(bookId: $bookId) 
            {
            _id
            username
            email
            savedBooks 
            {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;