// Redirecionador de links sensíveis.
// Os destinos NUNCA ficam no repositório: vivem em variáveis de ambiente da Vercel.
// Uso: /ir/pix  ->  302 para process.env.LINK_PIX
//
// Chaves permitidas (allowlist). Qualquer outra chave -> 404.
// Isso impede que a rota vire um "open redirect" (redirecionar para
// qualquer URL passada pelo visitante), que é uma falha clássica de phishing.
const MAPA = {
  pix: 'LINK_PIX',
  parcelado: 'LINK_PARCELADO',
  whatsapp: 'LINK_WHATSAPP',
};

const PERMITIDOS = [/^https:\/\/(www\.)?asaas\.com\//, /^https:\/\/wa\.me\//];

export default function handler(req, res) {
  const k = String((req.query && req.query.k) || '').toLowerCase();
  const envName = Object.prototype.hasOwnProperty.call(MAPA, k) ? MAPA[k] : null;
  if (!envName) return res.status(404).send('Not found');

  const destino = process.env[envName];
  if (!destino || !PERMITIDOS.some((re) => re.test(destino))) {
    return res.status(500).send('Link indisponível no momento.');
  }

  // 302 (temporário) de propósito: permite trocar o link sem cache preso no navegador.
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.writeHead(302, { Location: destino });
  res.end();
}
