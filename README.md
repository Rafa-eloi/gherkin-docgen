# 🧪 Gherkin DocGen

Ferramenta CLI para gerar documentação automática a partir de arquivos `.feature` escritos em Gherkin (usados em projetos com Cypress + Cucumber).

---

## 🚀 Funcionalidades

- 📂 Lê arquivos `.feature` de forma recursiva em um diretório
- 🧠 Usa o parser oficial do Gherkin (`@cucumber/gherkin`)
- 🏷️ Extrai funcionalidades, cenários, steps e tags (ex: `@autor`, `@componente`)
- 📄 Gera documentação em formato Markdown organizada por funcionalidade
- ⚡ Simples de usar via terminal ou script

---

## 📦 Instalação

```bash
npm install --save-dev gherkin-docgen
```

🚀 Uso
```bash
# Instalação local (projeto)
npm install --save-dev gherkin-docgen

# Ou instalação global
npm install -g gherkin-docgen

```

Opções:
| Flag       | Descrição                                          |
| ---------- | -------------------------------------------------- |
| `--dir`    | Caminho da pasta onde estão os arquivos `.feature` |
| `--output` | Caminho do arquivo markdown de saída               |

---

📝 Exemplo de .feature
```gherkin
@autor=Rafael @componente=Login
Funcionalidade: Login do usuário

  Cenário: Login com sucesso
    Dado que o usuário está na página de login
    Quando ele insere credenciais válidas
    Então ele deve ser redirecionado para a página principal
```



📄 Exemplo de Saída
```markdown
## Funcionalidade: Login do usuário

**Tags**: @autor=Rafael, @componente=Login

### Cenário: Login com sucesso
- Dado que o usuário está na página de login
- Quando ele insere credenciais válidas
- Então ele deve ser redirecionado para a página principal
```

🛠️ Desenvolvimento
```bash
git clone https://github.com/seu-usuario/gherkin-docgen.git
cd gherkin-docgen
npm install
npm run start
```
---

## 📦 Disponível no NPM
```markdown
[![npm version](https://img.shields.io/npm/v/gherkin-docgen)](https://www.npmjs.com/package/gherkin-docgen)
```


🤝 Contribuições
Contribuições são bem-vindas! Sinta-se livre para abrir issues ou enviar PRs com melhorias.

📄 Licença
MIT © Rafael Pereira Eloi do Nascimento
