# Deploy / Redeploy na Vercel

Guia operacional do site **Get Women Experience — Entre Jardins**.
Última revisão: 01/08/2026.

---

## O que é publicado

| Arquivo / pasta | Papel |
| --- | --- |
| `index.html` | **A página publicada.** Arquivo único e autocontido (HTML, CSS, fontes e imagens embutidos), gerado a partir do arquivo de design. |
| `api/ir.js` | Função que redireciona `/ir/pix`, `/ir/parcelado` e `/ir/whatsapp` para os links reais (guardados em variáveis de ambiente). |
| `vercel.json` | Rotas `/ir/:chave` + cabeçalhos de segurança. |
| `Get Women Experience Landing.dc.html` | **Fonte** do design. Não é servido ao visitante — é dele que o `index.html` é gerado. |
| `assets/`, `_ds/`, `support.js`, `image-slot.js` | Insumos da fonte. Já vêm embutidos no `index.html`. |

> Editar `index.html` na mão não é suportado: ele é compilado. Toda mudança
> visual é feita no `.dc.html` e o `index.html` é regerado.

---

## Pré-requisito, uma única vez: variáveis de ambiente

Sem isso os botões de pagamento e WhatsApp retornam erro.

**Vercel → Projeto → Settings → Environment Variables** → adicionar as três,
marcando **Production, Preview e Development**:

| Nome | Valor |
| --- | --- |
| `LINK_PIX` | link Asaas de pagamento à vista |
| `LINK_PARCELADO` | link Asaas de pagamento parcelado |
| `LINK_WHATSAPP` | `https://wa.me/55DDDNÚMERO` |

Os valores só são aceitos se apontarem para `asaas.com` ou `wa.me` (validação em
`api/ir.js`). Ver `.env.example` e `SECURITY.md`.

> **Variável nova ou alterada só vale após um redeploy.** Salvar não republica.

---

## Redeploy A — mudança de conteúdo ou visual

1. Editar `Get Women Experience Landing.dc.html`.
2. **Regerar o `index.html`** (empacotamento em arquivo único). Esta etapa não é
   opcional: sem ela, o site publicado continua com a versão antiga.
3. Conferir o `index.html` no navegador, local, antes de subir.
4. Commit e push para o branch `main`.
5. A Vercel detecta o push e publica sozinha. Acompanhar em **Deployments**.

```bash
git add -A
git commit -m "Atualiza landing"
git push origin main
```

## Redeploy B — só trocar um link (Asaas ou WhatsApp)

Não mexa no código.

1. Settings → Environment Variables → editar o valor → **Save**
2. **Deployments** → deploy mais recente → menu `···` → **Redeploy**
3. Desmarcar *"Use existing Build Cache"*
4. Testar os botões em produção

## Redeploy C — republicar sem nenhuma alteração

(Ex.: um deploy falhou, ou você quer voltar à versão anterior.)

**Deployments** → escolher o deploy desejado → `···` → **Redeploy**
ou **Promote to Production** para voltar a uma versão antiga que funcionava.

---

## Checklist antes de publicar

- [ ] `index.html` regerado depois da última edição do `.dc.html`
- [ ] Nenhum link real de Asaas ou `wa.me` escrito em arquivo
      (`grep -ri "asaas\|wa\.me" . --exclude-dir=.git --exclude=SECURITY.md --exclude=DEPLOY.md`)
- [ ] `.env` não versionado
- [ ] Três variáveis presentes na Vercel

## Checklist depois de publicar

- [ ] Página abre no domínio de produção
- [ ] Console do navegador sem erro de CSP (bloqueio de fonte, imagem ou script)
- [ ] Botão **Pix / à vista** → checkout Asaas correto
- [ ] Botão **Parcelado** → checkout Asaas correto
- [ ] Botão **WhatsApp** → conversa com o número certo
- [ ] Âncoras internas (`Garantir vaga`, `Quero viver essa experiência`) rolam até Investimento
- [ ] Mobile: barra fixa inferior visível, botão do hero centralizado, aquarelas nítidas

---

## Se algo der errado

| Sintoma | Causa provável | O que fazer |
| --- | --- | --- |
| Botão de pagamento dá "Link indisponível no momento" | variável ausente, com nome errado, ou domínio fora da allowlist | conferir Environment Variables e redeployar |
| `/ir/pix` retorna 404 | `vercel.json` não subiu, ou a chave não está na allowlist de `api/ir.js` | conferir os dois arquivos no repositório |
| Fontes ou imagens sumiram | CSP bloqueando um domínio novo | ler o erro no console e liberar o domínio na CSP do `vercel.json` |
| Site publicado está desatualizado | `index.html` não foi regerado | refazer a etapa 2 do Redeploy A |
| Deploy falhou | ver o log em Deployments | corrigir e dar push de novo; se urgente, **Promote** o último deploy que funcionava |

Segurança, controle de acesso e proteção de branch: ver `SECURITY.md`.
