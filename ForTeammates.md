# How my code(Abby's) connects to yours

## What I need from you

**Login**

I only need the logged-in user's id. Right now I read it from the browser, so after a successful login or sign-up, save it like this:

```ts
localStorage.setItem("currentUser", JSON.stringify({ userId }));
```

- `userId`: the user's MongoDB `_id`, as a string
- You can save more fields in the same object (name, admin). I only read `userId`.
- To log out, remove it: `localStorage.removeItem("currentUser")`
- The login page must be at `/login`. I send people there when nobody is logged in.

If you track the user a different way, tell me and I'll read it from there instead. It is one file on my side: `src/hooks/useRequireCurrentUser.ts`.

**`GET /api/training?userId=<id>`**

I send: the user's id in the URL.

I need back: an array of that user's logs, shaped like this.

```json
[
  {
    "_id": "655e...",
    "user": { "_id": "655d...", "fullName": "Long Lam" },
    "animal": { "_id": "655c...", "name": "Lucy", "breed": "Golden Retriever" },
    "title": "Complete sit lessons",
    "date": "2023-10-20T15:30:00.000Z",
    "description": "Lucy finishes the sit lessons very well today.",
    "hours": 20
  }
]
```

**`PATCH /api/training`**

I send:

```json
{ "_id": "<log id>", "user": "<user id>", "animal": "<animal id>", "title": "...", "description": "...", "hours": 2 }
```

I need back: status 200 with any JSON body.

**Errors, for every request**

I need back: a non-200 status and `{ "message": "..." }`. I show the message to the user.
