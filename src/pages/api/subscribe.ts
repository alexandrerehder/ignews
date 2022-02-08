import { stripe } from './../../services/stripe';
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    // Guarda as informações da sessão do usuário
    const session = await getSession({ req })
    // Através do email é possível verificar se o usuário tem um stripe_customer_id
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )
    // Guarda o seu id stripe caso exista
    let customerId = user.data.stripe_customer_id
    // Caso não exista, é criado no stripe e cadastrado no banco(Fauna)
    if(!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
        // metadata
      })
    // Cadastrando o id stripe no banco para o usuário
    await fauna.query(
      q.Update(
        q.Ref(q.Collection('users'), user.ref.id),
        {
          data: {
            stripe_customer_id: stripeCustomer.id
          }
        }
      )
    )
    customerId = stripeCustomer.id
}

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{
        price: 'price_1KQ0y9EJ2sWFQd0eHg5Hrswd',
        quantity: 1
      }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return res.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}