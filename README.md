# 🌎 EcoGuardiões

Plataforma web educativa e gamificada para conscientização sobre **descarte correto do lixo**, **uso consciente da água** e **economia de energia**, alinhada aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU:

| ODS | Tema | Como o projeto atende |
|---|---|---|
| **4** | Educação de qualidade | Aprendizagem inclusiva para crianças e para adultos/idosos (modo duplo, leitura em voz alta, letras ajustáveis) |
| **6** | Água potável e saneamento | Trilha "Água & Saneamento", jogo Detetive da Casa, calculadora de litros economizados |
| **7** | Energia limpa e acessível | Trilha "Energia Inteligente", stand-by, LED, selo Procel, energia solar/eólica |
| **13** | Ação contra a mudança do clima | Trilha "Resíduos & Clima", compostagem x metano, CO₂ evitado na calculadora |

---

## ▶️ Como executar

**Opção 1 — mais simples:** dê dois cliques em `index.html` (abre no navegador).

**Opção 2 — recomendado (habilita o modo offline / PWA):**
```bash
# dentro da pasta do projeto
python -m http.server 8080
# depois acesse http://localhost:8080
```

Não há dependências, build ou banco de dados. Pode ser publicado diretamente no GitHub Pages, Netlify ou Vercel.

---

## 🗂️ Estrutura

```
ecoguardioes/
├── index.html        # Estrutura semântica (SPA com 5 visões)
├── css/style.css     # Design System dual (Editorial Cívico x Tactile Storybook)
├── js/icons.js       # Biblioteca vetorial autoral (mascotes, 20 resíduos, lixeiras 3D, cenários e UI)
├── js/data.js        # Conteúdo: cartões visuais infantis, guias adultos, jogos, quiz e hábitos
├── js/app.js         # Núcleo: estado, modos, voz, sons, rotas, trilhas, calculadora, hábitos e certificado
├── js/games.js       # Motor dos 3 mini-jogos 100% em SVG
├── sw.js             # Service Worker (offline-ready)
├── manifest.json     # Manifesto PWA (instalável)
└── assets/icon.svg   # Logotipo vetorial autoral
```

---

## ✅ Rastreabilidade de requisitos

| Requisito | Implementação |
|---|---|
| **RF-01** Alternador de modos | Botão no topo + tela de boas-vindas; preferência salva em `localStorage` (`app.js → applyMode`) |
| **RF-02** Modo Infantil | Fonte Fredoka, cores vibrantes, mascotes Gotinha 💧/Centelha ⚡/Folha 🍃, sons (Web Audio API), confete, textos narrativos |
| **RF-03** Modo Normal/Sênior | Fonte Atkinson Hyperlegible (criada para baixa visão), alto contraste, A−/A+, botões "🔊 Ouvir" (Web Speech API), tabelas e valores em R$ |
| **RF-04** Trilhas | 3 trilhas × 3 aulas, cada uma com texto adaptado ao modo e desafio de verificação |
| **RF-05** Jogos | Separação Relâmpago (arrastar ou clicar, 7 lixeiras CONAMA), Detetive da Casa (4 cômodos + Impactômetro), Quiz das ODS (8 perguntas sorteadas de 14) |
| **RF-06** Hábitos e certificado | Checklist diário que reinicia todo dia, 8 medalhas, certificado imprimível/PDF liberado com 4 medalhas |
| **RNF-01** Acessibilidade | HTML semântico, ARIA, foco visível, navegação por teclado, link "pular conteúdo", `prefers-reduced-motion`, alvos de toque ≥ 44px |
| **RNF-02** Leveza | JavaScript puro, sem frameworks (~100 KB no total) |
| **RNF-03** Responsividade | Layout fluido de 320px a desktop (CSS Grid + media queries) |
| **RNF-04** Offline | Service Worker com cache dos arquivos + manifesto instalável |

---

## 🎮 Gamificação

- **Pontos (⭐):** aula concluída +20 · hábito diário +5 · dia 100% verde +30 · acertos nos jogos (5 a 10 por acerto) · Detetive completo +60
- **Medalhas:** 3 de trilhas, 3 de jogos, 1 de hábitos, 1 por pontuação
- **Feedback sem punição:** erros sempre trazem explicação educativa (aprendizagem pelo erro)
- **Certificado de Guardião do Planeta:** recompensa final, imprimível

---

## 📚 Referências de conteúdo

- ONU Brasil — Objetivos de Desenvolvimento Sustentável (brasil.un.org/pt-br/sdgs)
- Sabesp — Dicas de economia e consumo de água
- Procel / Inmetro — Etiqueta Nacional de Conservação de Energia
- Resolução CONAMA nº 275/2001 — Código de cores da coleta seletiva
- Lei nº 12.305/2010 — Política Nacional de Resíduos Sólidos

> Os valores da calculadora são estimativas baseadas em médias de referência e servem para fins educativos.
