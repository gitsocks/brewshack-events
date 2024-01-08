# Logging first event

Brewshack Events enables developers to log custom events throughout their application. The events are then stored and can be viewed on Brewshack Events later.

To log your first event, you need to create a new client secret to authenticate the request and make a `POST` request.

## Authenticating to the Brewshack Events API

> Only the latest `ClientSecret` is valid. The list is ordered from date created, so the latest will always be the first one in the list.

To authenticate to the Brewshack Events API, you need a `ClientId` and a `ClientSecret`. Your `ClientId` can be found under your application's name, however, the `ClientSecret` must be generated.

![Overview of ID and Secrets](./assets/overview-of-client-id-and-secret.png)

To create a `ClientSecret` for your application, click on the _View Secrets_ link, and then on _Create New_ button. Give your new secret a name and click on _Create_.

![Creating a secret](./assets/creating-a-secret.png)

After the secret has been successfully created, it will render the secret for your to copy. Be sure to copy the secret because it will not be rendered ever again. It is also not stored in the database, so there is no way to fetch it again.

![Viewing a secret](./assets/viewing-a-secret.png)

Lastly, add the newly created `ClientSecret` to your request authorization as a `Bearer <ClientSecret>` and your `ClientId` to your request headers.

## Making the `POST` request to `/api/v1/events`

After you have authenticated your request, making the actual request is really simple. First, add your event to your request body:

```json
{
  "event": "some_event"
}
```

And set your URL to the Brewshack Events API.

```bash
https://brewshack-events.vercel.app/api/v1/events
```

## Final Result

```bash
curl -X POST \
  https://brewshack-events.vercel.app/api/v1/events \
  -H 'clientId: 429ef919-17d8-4ef0-8300-6b7649c04203' \
  -H 'authorization: Bearer xXCtpQ69GoTY1xaRb9pDGeJlRLDXc4VP' \
  -H 'Content-Type: application/json' \
  -d '{"event": "some_event"}'
```
