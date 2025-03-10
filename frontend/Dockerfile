# Use a imagem base oficial do Node.js
FROM node:22-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do package.json e package-lock.json para instalar dependências
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código da aplicação para dentro do contêiner
COPY . .

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o frontend
CMD ["npm", "run", "dev"]