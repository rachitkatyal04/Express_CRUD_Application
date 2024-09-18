FROM node:18.6
WORKDIR /app
COPY . /app


ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; \
then npm install; \
else npm install --only=production; \
fi

ENV PORT 3000
EXPOSE ${PORT}

CMD ["node", "index.js"]
# CMD ["npm", "start"]
