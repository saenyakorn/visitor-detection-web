# Visitor Dection

2110356 Embedded System Project; The web application used for receiving the picture from the STM32's camera and alerting if there is a non-visitor go inside the house.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Related Repositories

- [visitor-detection-stm32](https://github.com/saenyakorn/visitor-detection-stm32) - Using STM32 for detecting the visitors with the infrared sensor and ESP32-Cam for sending the picture to the server.

## Getting Started

First, you need to install the dependencies:

```bash
npm install
# or
yarn
```

Second, specify `env` variables in `.env.local` for development and `.env.production.local` for production

Third, run the dev server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to run the app as production, you need to run following this

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Deployment

Here is my deployment [http://visitor.saenyakorn.dev](http://visitor.saenyakorn.dev) using [Google App Engine](https://cloud.google.com/appengine).
