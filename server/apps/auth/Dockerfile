FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force
# Copy the Prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

COPY . .

RUN npm run build auth

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]