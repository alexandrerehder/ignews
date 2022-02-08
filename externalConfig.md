## 💳 Stripe API

Stripe é a API que utilizamos para simular os pagamentos das assinaturas.

1. Acesse: https://stripe.com/br
1.1 Faça o login -> clique na aba "Produtos" -> clique no botão "Adicionar um novo produto"
1.2 Preencha as informações do produto com:
  - Nome: Nome do seu produto
  - Modelo de preços: Preços padrão
  - Preço: 9,90 | BRL | Recorrente - ou o que desejar
  - Período de faturamento: Mensal - ou o que desejar

2. Preencha as variáveis de ambiente do arquivo .env.example com as keys/tokens corretos fornecidos pela Stripe:

```bash
# Antes altere o nome do arquivo para .env.local
$ mv .env.example .env.local
```
 STRIPE_API_KEY= Desenvolvedores -> Chaves da API -> Chave secreta(Token) 

 STRIPE_SUCCESS_URL=http://localhost:3000/posts

 STRIPE_CANCEL_URL=http://localhost:3000/

 NEXT_PUBLIC_STRIPE_PUBLIC_KEY= Desenvolvedores -> Chaves da API -> Chave publicável(Token)

 (STRIPE_WEBHOOK_SECRET= 
 Rode o comando $ stripe listen --forward-to localhost:3000/api/webhooks 
 -> Copie o conteúdo Your webhook signing secret is "whsec_5345...example")

 STRIPE_PRICE_KEY= Produtos -> Clique em seu produto -> ID DA API

 ## 🔃 Github

Para o funcionamento do login com um usuário Github, é necessário que algumas configurações sejam feitas.

1. Acesse seu Github
1.1 Clique em Settings -> Developer settings -> New OAuth App 
1.2 Faça o registro com os dados da aplicação:
  - Application name: ig.news (Dev) - Caso precise criar um para prod, não terá problema com o nome
  - Homepage URL: http://localhost:3000/
  - Authorization callback URL: http://localhost:3000/api/auth/callback

2. Após o cadastro copie os id para suas respectivas variáveis do .env:

GITHUB_CLIENT_ID= Client ID

GITHUB_CLIENT_SECRET= Client secrets -> Generate a new client secret

 ## 🔃 FaunaDB

Etapa de criação e configuração do banco de dados 

<h4>Criação do banco<h4>

1. Acesse: https://fauna.com/
1.1 Faça o login ou se cadastre -> Clique em Create Database
1.2 Preencha os campos com:
  - Name: Nome do banco (qualquer)
  - Region Group: Classic (Selecionar outro grupo de região pode ocasionar problemas na aplicação posteriormente)

<h4>Criação da collections<h4>

2. Clique em "Collections" -> New Collection -> 
2.1 Preencha os campos com:
  - Collection Name: subscriptions
  - History Days: 30

2.2 Crie uma nova collections e preencha os campos com:
  - Collection Name: users
  - History Days: 30

<h4>Criação dos indexes<h4>

3. Clique em "Indexes" -> New Index -> 
3.1 Selecione ou preencha os campos com:
  - Source Collection: subscriptions
  - Index Name: subscription_by_id
  - Terms: data.id
  - Unique: ✅
  - Serialized: ✅

3.2 New Index -> 
  - Source Collection: subscriptions
  - Index Name: subscription_by_status
  - Terms: data.status
  - Unique: 
  - Serialized: ✅

3.3 New Index -> 
  - Source Collection: subscriptions
  - Index Name: subscription_by_user_ref
  - Terms: data.userId
  - Unique: 
  - Serialized: ✅

3.4 New Index -> 
  - Source Collection: users
  - Index Name: user_by_email
  - Terms: data.email
  - Unique: ✅
  - Serialized: ✅

3.5 New Index -> 
  - Source Collection: users
  - Index Name: user_by_stripe_customer_id
  - Terms: data.stripe_customer_id
  - Unique: 
  - Serialized: ✅

4. Clique em Security -> New Key
  - Database: nome (Current database)
  - Role: Admin
  
4.1 Copie a secret key -> Cole em "FAUNADB_KEY="

 ## 🔃 Prismic CMS

Etapa de criação e configuração do banco de dados 

1. Acesse: https://prismic.io/
1.1 Login -> Create respository -> Preencha os campos -> Escolha o plano free -> Create respository
1.2 Na aba esqueda clique em "Custom Types" -> Create new

2. Arraste os campos para o documento:
  - UID
  - title | preencha com id "title" e selecione "H1"
  - Content

2.1 Save -> Na aba esqueda clique em "Documents" -> Copie o conteúdo do seu Post -> Save -> Publish


 ## 💳 Stripe CLI 💽

A Stripe CLI é utilizada para transmitir em tempo real solicitações e eventos de API ocorridos na sua conta por meio de webhooks.

1. Acesse: https://stripe.com/docs/stripe-cli
1.1 Instale o Stripe CLI -> Clique na aba de acordo com seu SO(no meu caso Linux) -> Baixe o tarz.gz
1.2 Descompacte o arquivo: tar -xvf stripe_X.X.X_linux_x86_64.tar.gz
1.3 Mova ./stripe para o caminho de execução:
```bash
# Mova stripe para /bin
$ sudo mv stripe ~/../../bin

# Faça login via terminal
$ stripe login

# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks 
```
