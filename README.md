# Motion Hub API
It's a simple API where you can store the details of your videos, like Title, Description and Duration.<br>
It uses `in-memory database`. It means will only store while running it and after **all data will be lost**.

> Note: This is meant to pratice testing scenarios. It will have bugs on purpose to be reported and validate the tests.

## Installation 🔧

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## API

### `GET /videos`
It will return all the videos avaiable. You can have a search query param to filter for the video title.

| Path Params | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `search` | `string` | Optional | Only returns videos titles that matches que param. |

Examples
```http
GET http://localhost:3333/videos?search=Node
```
___

### `POST /videos`
It adds a new video entry.

| Body Params | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Required** | The title of your video. |
| `description` | `string` | **Required** | A description for your video. |
| `duration` | `number` | **Required** | The total duration of your video (in seconds) |

```http
POST http://localhost:3333/videos
Content-Type: application/json

{
    "title": "Node Video",
    "description": "This is a video tutorial about node. Hope you like. Don't forget to subscribe and hit the like button!",
    "duration": 180
}
```
___

### `PUT /videos/:id`
Updates a current video on the database based on the given id.

| Path Params | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Required** | Id of the current video you want to update. |

<br>

| Body Params | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Optional | The title of your video. |
| `description` | `string` | Optional | A description for your video. |
| `duration` | `number` | Optional | The total duration of your video (in seconds) |

```http
PUT http://localhost:3333/videos/9da04456-389d-4105-8a8f-35217f530d7a
Content-Type: application/json

{
    "title": "Node Video with React",
    "description": "This is a video tutorial about node. Now with react :)",
    "duration": 180
}
```
___

### `DELETE /videos/:id`
Deletes a video based on the given id.

| Path Params | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Required** | Id of the current video you want to delete. |

```http
DELETE http://localhost:3333/videos/44a950d9-8c59-4a15-94be-4162396914a8
```

## Support this project 🙌

If you want to support this project, leave a ⭐.

___

Made with love 🧡 by [Rodrigo Molter](https://www.linkedin.com/in/rodrigo-molter/)
