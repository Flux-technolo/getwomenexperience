# Get Women Experience — Entre Jardins

Landing page do evento **Get Women Experience — Entre Jardins**, um retiro
espiritual para mulheres da Get Church Sinop.

## Estrutura

| Arquivo | Descrição |
| --- | --- |
| `index.html` | Página publicada. Arquivo único e autocontido (HTML, CSS, fontes e imagens embutidos). |
| `api/ir.js` | Função que redireciona `/ir/pix`, `/ir/parcelado` e `/ir/whatsapp` para os links reais (variáveis de ambiente). |
| `vercel.json` | Rotas `/ir/:k` e cabeçalhos de segurança. |
| `env.example` | Modelo das variáveis de ambiente necessárias (sem valores reais). |
| `SECURITY.md` | Política de segurança do projeto. |
| `DEPLOY.md` | Guia operacional de deploy/redeploy. |

## Deploy

Veja [`DEPLOY.md`](./DEPLOY.md) para o passo a passo de publicação e
[`SECURITY.md`](./SECURITY.md) para a política de links sensíveis e variáveis
de ambiente.
