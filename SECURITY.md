# Segurança — Get Women Experience

## Links sensíveis (pagamento e WhatsApp)

Os links reais de pagamento (Asaas) e WhatsApp **nunca** ficam neste repositório.
Eles vivem apenas como variáveis de ambiente na Vercel:

- `LINK_PIX`
- `LINK_PARCELADO`
- `LINK_WHATSAPP`

A página pública nunca aponta diretamente para esses destinos. Ela usa as rotas
`/ir/pix`, `/ir/parcelado` e `/ir/whatsapp`, que são resolvidas em tempo de
execução pela função `api/ir.js`.

## Proteção contra open redirect

`api/ir.js` usa uma allowlist (`pix`, `parcelado`, `whatsapp`) — qualquer outra
chave retorna 404. O destino lido da variável de ambiente também é validado
contra uma allowlist de domínios (`asaas.com`, `wa.me`) antes do redirecionamento
302. Isso impede que a rota seja usada para redirecionar visitantes para um
domínio arbitrário (vetor clássico de phishing).

## Cabeçalhos de segurança

Definidos em `vercel.json` para todas as rotas: Content-Security-Policy,
Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options,
Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy,
Cross-Origin-Resource-Policy e X-Permitted-Cross-Domain-Policies.

## Segredos e versionamento

- Nenhum valor real de link deve aparecer em qualquer arquivo comitado —
  use `env.example` como modelo e configure os valores reais apenas em
  Vercel > Project > Settings > Environment Variables.
- `.env` e variantes estão no `.gitignore`.

## Relatando uma vulnerabilidade

Se você encontrar uma vulnerabilidade de segurança neste projeto, entre em
contato diretamente com a equipe responsável antes de divulgar publicamente.
