import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageThree = {
  async exec({ from, message }) {
    storage[from].address = message
    storage[from].stage = STAGES.PEDIDO

    let msg = 'Pedido *CANCELADO* com sucesso. \n Volte Sempre!'
    if (message === '*') {
      storage[from].stage = STAGES.INICIAL
    } else {
      const itens = storage[from].itens
      const desserts = itens.map((item) => item.description).join(', ')

      const total = storage[from].itens.length

      msg =
        `🗒️ *RESUMO DO PEDIDO*: \n\n🧁 Serviços: *${desserts}* \n🚚 Tempo de entrega: *a confirmar*. \n📍 Endereço: *${message}* \n💰 Valor dos serviços: *${
          total * 6
        },00 reais*. \n⏳ Tempo de entrega: *a confirmar*. \n\n` +
        '🔊 ```Agora, informe a forma de pagamento por gentileza.```'
    }

    await VenomBot.getInstance().sendText({ to: from, message: msg })

     return '✅ *Prontinho, pedido feito!* \n\nAgora, se você ainda não sabe o valor vou te passar para um atendente para que ele verique o valor do *serviço*. \n\n⏳ *Aguarde um instante*.'
  },
}
