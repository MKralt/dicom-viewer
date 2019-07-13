FROM node:10

RUN npm install -g http-server

WORKDIR usr/dicom-viewer

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8888

CMD ["http-server", "-p", "8888", "dist"]