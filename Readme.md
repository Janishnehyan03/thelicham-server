# Thelicham Server API

This API documentation provides information about the endpoints available in the Blog App API.

## Base URL
The base URL for all requests is: `https://thelicham-server.vercel.app/api/v1`



## Endpoints

### Get All Blog Posts

Retrieve a list of all blog posts.

- URL: `/posts`
- Method: GET
- Headers:
  - Content-Type: application/json

### Get a Single Blog Post

Retrieve a specific blog post by its ID.

- URL: `/posts/:id`
- Method: GET
- Parameters:
  - `id`: ID of the blog post
- Headers:
  - Content-Type: application/json


### Create a Blog Post
Create a new blog post.

- URL: `/posts`
- Method: POST
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer `JWT_TOKEN`

- Body:
  - `title`: String
  - `content`: String
  - `slug`: String
  - `detailHtml`: String(Html Data)
  - `categories`: Array(CategoryID)
  - `author`: String (AuthorId)
  - `thumbnail`: String

### Update a Blog Post
Update an existing blog post.

- URL: `/posts/:id`
- Method: PUT
- Parameters:
  - `id`: ID of the blog post
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer `JWT_TOKEN`
- Body (optional):
  - `title`: String
  - `content`: String
  - `slug`: String
  - `detailHtml`: String(Html Data)
  - `categories`: Array(CategoryID)
  - `author`: String (AuthorId)
  - `thumbnail`: String
  

### Delete a Blog Post

Delete a blog post.

- URL: `/posts/:id`
- Method: DELETE
- Parameters:
  - `id`: ID of the blog post
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer `JWT_TOKEN`

## Error Handling
- If a request fails, the response will include an `error` field with a descriptive error message.

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
