# 🧪 Gherkin DocGen

Uma ferramenta CLI para gerar documentação automática a partir de arquivos `.feature` escritos com Gherkin (BDD).

Ideal para projetos que utilizam Cypress com Cucumber.

## 📦 Instalação

```bash
npm install --save-dev gherkin-docgen
```

🚀 Uso
```bash
npx gherkin-docgen --dir cypress/e2e --output gherkin-docs.md
```

Opções:
| Flag       | Descrição                                          |
| ---------- | -------------------------------------------------- |
| `--dir`    | Caminho da pasta onde estão os arquivos `.feature` |
| `--output` | Caminho do arquivo markdown de saída               |


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
npx ./bin/index.js
```

