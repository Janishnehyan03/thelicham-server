# Thelicham Server API

This API documentation provides information about the endpoints available in the Blog App API.

## Base URL

The base URL for all requests is: `https://thelicham-server.vercel.app/api/v1`

Creating, Updating, Deleting A Document may required a "jwt token" and role "admin"

- Headers:
  - Content-Type: application/json
  - Authorization: Bearer `JWT_TOKEN`

## POSTS

### Get All Blog Posts

Retrieve a list of all blog posts.

- GET: `/posts`

### Get a Single Blog Post

Retrieve a specific blog post by its ID.

- GET: `/posts/:id`

### Create a Blog Post

- POST: `/posts`

- Body:
  - `title`: String
  - `description`: String
  - `slug`: String
  - `detailHtml`: String(Html Data)
  - `categories`: Array(CategoryID)
  - `author`: String (AuthorId)
  - `thumbnail`: String

```json
{
            "_id": "64606758f61ed054cc113008",
            "title": "example post",
            "description": "description",
            "slug":"example-post",
            "__v": 0,
            "detailHtml":"<p>Detail Html</p>",
            "thumbnail":"image url",
            "categories":["ID","ID"],
            "author":"AuthorID"
},
```

### Update a Blog Post

- PATCH: `/posts/:id`

### Delete a Blog Post

Delete a blog post.

- DELETE: `/posts/:id`

## CATEGORIES

### Get All Categories

Retrieve a list of all categories.

- GET: `/category`

### Get a Single Category

- GET: `/category/:id`

### Create Category

- POST: `/category/`

### Update Category

- PATCH: `/category/:id`

### Delete Category

- DELETE: `/category/:id`

## AUTHORS

### Get All Authors

- GET: `/author`

### Get a Single Author

- GET: `/author/:id`

## AUTHENTICATION

### Register a User

Register a new user.

- POST: `/auth/signup`
- Body:
  - `email`
  - `password`
  - `username`


### Login

Authenticate a user and generate an access token.

- POST: `/login`
- Body:
  - `email`
  - `password`


## Error Handling

- If a request fails, the response will include an `error` field with a descriptive error message.

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
