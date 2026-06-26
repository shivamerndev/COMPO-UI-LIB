FROM node:20-alpine AS frontend_builder

WORKDIR /FRONTEND

COPY ./FRONTEND/package*.json /FRONTEND/

RUN npm install

COPY ./FRONTEND /FRONTEND/

RUN npm run build



# Stage 2: Build Package (Library)

FROM node:20-alpine AS package_builder

WORKDIR /PACKAGE

COPY ./PACKAGE/package*.json /PACKAGE/

RUN npm install

COPY ./PACKAGE /PACKAGE/

RUN npm run build



# Stage 3: Run Backend (Application)

FROM node:20-alpine

WORKDIR /BACKEND

COPY ./BACKEND/package*.json /BACKEND/

RUN npm install

COPY ./BACKEND /BACKEND/

COPY --from=frontend_builder /FRONTEND/dist /BACKEND/public

CMD [ "npm","start" ]