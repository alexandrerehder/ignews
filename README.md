GitHub language count Repository size

computer Sobre o projeto
bulb VxTel - Uma empresa de telefonia, especializada em chamadas de longa distância nacional, colocou um novo produto no mercado chamado FaleMais. A mesma preocupada com a transparência junto aos seus clientes, disponibilizou uma página na web onde o cliente pode calcular o valor da ligação. Ali, o cliente pode escolher os códigos das cidades de origem e destino, o tempo da ligação em minutos e qual plano FaleMais utilizará.

computer Interface Web
Web

hammer_and_wrench Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

Node.JS
React
TypeScript
Docker
Postgres
Pré-requisitos
Antes de começar, é preciso ter instalado em sua máquina as seguintes ferramentas:

Node.JS
Git
Docker/Compose
MakeFile
rocket Como executar o projeto
# Clone este repositório
$ git clone https://github.com/Alexandrerehder/VxTel

# Acesse a pasta do projeto no terminal/cmd
$ cd VxTel/Back-End

# Suba os containers (api, postgres, appweb)
$ sudo make up

# O servidor inciará na porta:3333 - acesse http://localhost:3333
# A aplicação web inciará na porta:3000 - acesse http://localhost:3000