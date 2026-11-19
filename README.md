# Checkpoint | Eletrônicos e Games

A Checkpoint é uma loja demonstrativa de celulares, fones, consoles e jogos. A oferta aplica **10% de desconto à vista** ou divide o preço integral em **6 parcelas**. Os preços são ilustrativos e o cadastro é validado no navegador, sem armazenamento dos dados.

[Abrir a Checkpoint no Sites](https://checkpoint-vete.josevicctor10.chatgpt.site) (acesso privado).

## Telas

| Tela | O que você encontra |
| --- | --- |
| [Início](dist/index.html) | Apresentação da loja, destaques da oferta e atalhos por categoria. |
| [Catálogo](dist/catalogo.html) | Oito produtos renderizados em JavaScript, com filtros, contador e soma dos preços integrais dos itens exibidos. |
| [Simulador](dist/simulador.html) | Escolha do produto e da quantidade, comparação dos totais e detalhamento das parcelas. |
| [Cadastro](dist/cadastro.html) | Formulário demonstrativo com sete campos e mensagens de validação. |
| [Sobre e dúvidas](dist/sobre.html) | Tabela de pagamentos, instruções em lista ordenada e perguntas expansíveis. |

## Como executar

Abra `dist/index.html` em um navegador ou inicie um servidor estático a partir da pasta do projeto.

```sh
python3 -m http.server 8000 --directory dist
```

Para acessar pelo servidor, abra [http://localhost:8000](http://localhost:8000).

As cinco páginas HTML5 compartilham [style.css](dist/style.css) e [script.js](dist/script.js). O site funciona sem instalação de pacotes e usa uma media query em 600 px para ajustar a navegação e o conteúdo para celulares.

## Verificação

- W3C Nu HTML Checker usado nas cinco páginas HTML e no CSS, sem erros.
- Testes automatizados do DOM cobriram os links, filtros, cálculos em centavos, cadastro, menu e FAQ.
- Para inspecionar o layout no Chrome, abra as ferramentas de desenvolvedor com F12 e ligue a barra de dispositivos. A largura de 600 px é o ponto de ajuste principal do layout para celular.

## Regra de pagamento

O simulador usa centavos inteiros. Por exemplo, um total de R$ 600,00 sai por R$ 540,00 à vista ou em 6 parcelas de R$ 100,00. Quando a divisão gera frações de centavo, as parcelas podem variar em R$ 0,01 para que sua soma corresponda ao subtotal.

As imagens de produtos são ilustrativas e foram geradas para o projeto. As licenças de DM Sans, Space Grotesk e Tabler Icons estão disponíveis junto aos [arquivos de tipografia](dist/assets/LICENSES.txt).
