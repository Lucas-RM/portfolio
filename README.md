# Portfólio Lucas Marcondes

Portfólio pessoal desenvolvido com tecnologias modernas, apresentando projetos, habilidades e experiência profissional.

## 🚀 Tecnologias Utilizadas

- **React 19.0.1** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool rápida e moderna
- **Tailwind CSS v4** - Framework CSS utilitário
- **Shadcn UI** - Componentes UI modernos
- **Radix UI** - Primitivos acessíveis
- **Lucide React** - Ícones modernos
- **React Router DOM** - Roteamento para React
- **Biome** - Linter e formatter rápido

## 📁 Estrutura do Projeto

```
cloudinary-uploader/      # Script para upload de imagens (auxiliar)
public/
├── assets/               # Imagens e ícones públicos
├── curriculo/            # PDF do currículo
├── index.html            # HTML principal
src/
├── components/           # Componentes principais da interface
│   ├── ui/               # Componentes reutilizáveis do design system (botão, card, avatar, etc.)
│   ├── Header.tsx        # Cabeçalho e navegação
│   ├── Hero.tsx          # Seção principal de apresentação
│   ├── AboutModal.tsx    # Modal com informações sobre mim
│   ├── Skills.tsx        # Seção de habilidades
│   ├── Projects.tsx      # Listagem de projetos
│   ├── ProjectCard.tsx   # Card individual de projeto
│   ├── ProjectImage.tsx  # Imagem do projeto
│   ├── Resume.tsx        # Currículo
│   └── Footer.tsx        # Rodapé
├── data/                 # Dados estruturados em JSON (projetos, skills, experiências, etc.)
├── hooks/                # Hooks customizados para lógica de UI e navegação
├── lib/                  # Utilitários e constantes globais
├── types/                # Tipagens TypeScript para dados e props
├── App.tsx               # Componente principal do app
├── main.tsx              # Ponto de entrada da aplicação
└── index.css             # Estilos globais
biome.json                # Configuração do Biome (linter/formatter)
components.json           # Configuração de componentes Shadcn UI
package.json              # Dependências e scripts
vite.config.ts            # Configuração do Vite
README.md                 # Documentação do projeto
LICENSE                   # Licença MIT
```

## 🎯 Funcionalidades

### Cabeçalho
- Logo personalizada
- Navegação responsiva
- Menu mobile com hambúrguer

### Seção Hero
- Apresentação dinâmica do nome
- Links de contato (Email, GitHub, LinkedIn)
- Foto de perfil estilizada
- Botão para download do currículo

### Sobre Mim
- Modal com informações detalhadas
- Histórico profissional
- Valores e motivações

### Habilidades
- Categorização por área (Frontend, Backend, Ferramentas, Cloud)
- Visualização de competências adicionais

### Projetos
- Cards com imagens dos projetos
- Descrições detalhadas
- Tecnologias utilizadas
- Links para GitHub e demo

### Currículo
- Experiência profissional
- Formação acadêmica
- Download do PDF

### Footer
- Links rápidos
- Redes sociais
- Copyright

## 🛠️ Como Executar

### Pré-requisitos
- Node.js `22.16.0` ou superior
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/lucasmarcondes/portfolio.git
cd portfolio

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Lint e formatação automática (Biome)
```

## 📱 Responsividade

O portfólio é totalmente responsivo e funciona perfeitamente em:
- Desktop (1151px+)
- Tablet (768px - 1150px)
- Mobile (320px - 767px)

## 🎨 Design System

### Cores
- **Primary**: Tons de cinza escuro
- **Secondary**: Tons de cinza claro
- **Accent**: Destaques e interações
- **Background**: Fundo principal
- **Foreground**: Texto principal

### Tipografia
- **Títulos**: Font-weight bold, tamanhos variados
- **Corpo**: Font-weight normal, legível
- **Destaques**: Cores primárias e secundárias

### Componentes
- **Cards**: Bordas arredondadas, sombras suaves
- **Botões**: Estados hover, variantes outline/filled
- **Modais**: Overlay com backdrop blur
- **Navegação**: Transições suaves
- **Avatar**: Imagem de perfil estilizada
- **Paginação**: Controle de navegação entre páginas
- **Mensagens de erro**: Feedback visual

## 📊 Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Otimização de Imagens**: Compressão e formatos modernos
- **Bundle Splitting**: Código dividido em chunks
- **Tree Shaking**: Eliminação de código não utilizado
- **Uso eficiente de hooks**: Lógica desacoplada e otimizada

## 🔧 Configurações

### Tailwind CSS
- Configuração customizada com variáveis CSS
- Sistema de cores consistente
- Utilitários responsivos

### Biome
- Linting e formatação automática
- Regras de qualidade de código
- Integração com Git

### TypeScript
- Configuração estrita
- Path mapping para imports
- Tipagem completa

### Vite
- Build rápido e hot reload
- Configuração otimizada para produção 

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) 
para mais detalhes.

## 👨‍💻 Autor

**Lucas Marcondes**
- Email: lucas.marcondes36@gmail.com
- GitHub: [@Lucas-RM](https://github.com/Lucas-RM)
- LinkedIn: [Lucas Marcondes](https://www.linkedin.com/in/lucas-marcondes01)

---

Desenvolvido com ❤️ usando tecnologias modernas 