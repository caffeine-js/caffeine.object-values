# @caffeine/value-objects

Pacote do ecossistema **Caffeine.js** que fornece Value Objects reutilizáveis e type-safe, construídos com validação via schemas TypeBox.

## 📦 Instalação

```bash
bun install @caffeine/value-objects
```

Ou, se estiver usando localmente no monorepo:

```bash
bun run setup
```

## 🎯 O que este pacote fornece

### Classe Base

A classe abstrata `ValueObject<ValueType, SchemaType>` é o alicerce de todos os Value Objects. Ela encapsula:

- Um **valor imutável** (`value`) acessível via `readonly`
- **Metadados** (`IValueObjectMetadata`) que identificam o nome e a camada de origem do VO
- **Validação automática** contra um schema TypeBox — lança `InvalidPropertyException` se o valor for inválido

```typescript
export abstract class ValueObject<ValueType, SchemaType extends t.TSchema> {
  protected abstract readonly schema: Schema<SchemaType>;

  protected constructor(
    public readonly value: ValueType,
    protected readonly info: IValueObjectMetadata,
  ) {}

  protected validate(): void {
    if (!this.schema.match(this.value))
      throw new InvalidPropertyException(this.info.name, this.info.layer);
  }
}
```

### Value Objects Disponíveis

| Value Object | Tipo do Valor | Descrição |
|---|---|---|
| `DefinedStringVO` | `string` | String que não pode ser nula, undefined ou vazia. |
| `SlugVO` | `string` | Extende `DefinedStringVO`. Aplica `slugify()` automaticamente no valor recebido. |
| `StringArrayVO` | `string[]` | Array de strings validado via schema. |
| `UrlVO` | `string` | Validação de URLs (http/https). |
| `UuidVO` | `string` | Validação de UUIDs. |
| `UuidArrayVO` | `string[]` | Array de UUIDs validado via schema. |

### Tipos

| Tipo | Descrição |
|---|---|
| `IValueObjectMetadata` | Interface com `name` e `layer` — metadados usados para mensagens de erro na validação. |

## 🚀 Uso

### Importação

Todos os Value Objects são exportados na raiz do pacote:

```typescript
import {
  DefinedStringVO,
  SlugVO,
  StringArrayVO,
  UrlVO,
  UuidVO,
  UuidArrayVO,
} from "@caffeine/value-objects";
```

### Criando um Value Object

Cada VO é criado via o método estático `make`, que instancia o objeto e executa a validação:

```typescript
const title = DefinedStringVO.make("Meu Título", {
  name: "title",
  layer: "post",
});

console.log(title.value); // "Meu Título"
```

### Slug Automático

O `SlugVO` transforma automaticamente o valor recebido em um slug:

```typescript
const slug = SlugVO.make("Meu Post Incrível!", {
  name: "slug",
  layer: "post",
});

console.log(slug.value); // "meu-post-incrivel"
```

### Validação de UUID

```typescript
import { generateUUID } from "@caffeine/models/helpers";

const id = UuidVO.make(generateUUID(), {
  name: "id",
  layer: "user",
});
```

### Validação de URL

```typescript
const website = UrlVO.make("https://hoyasumii.dev", {
  name: "website",
  layer: "profile",
});
```

### Arrays Tipados

```typescript
const tags = StringArrayVO.make(["nodejs", "typescript"], {
  name: "tags",
  layer: "post",
});

const relatedIds = UuidArrayVO.make([generateUUID(), generateUUID()], {
  name: "relatedPostIds",
  layer: "post",
});
```

### Tratamento de Erros

Se a validação falhar, uma `InvalidPropertyException` é lançada:

```typescript
try {
  DefinedStringVO.make("", { name: "title", layer: "post" });
} catch (error) {
  // InvalidPropertyException: propriedade "title" inválida na camada "post"
}
```

## 🧩 Criando um Value Object Customizado

Para criar um novo VO, basta estender `ValueObject` e implementar o `schema`:

```typescript
import { ValueObject } from "@caffeine/value-objects/core";
import type { IValueObjectMetadata } from "@caffeine/value-objects/types";
import type { Schema } from "@caffeine/schema";

// 1. Defina o DTO (schema TypeBox)
// 2. Crie a instância do Schema
// 3. Extenda ValueObject

export class EmailVO extends ValueObject<string, typeof EmailDTO> {
  protected override schema: Schema<typeof EmailDTO> = EmailSchema;

  public static make(value: string, info: IValueObjectMetadata): EmailVO {
    const newVO = new EmailVO(value, info);
    newVO.validate();
    return newVO;
  }
}
```

## 📁 Estrutura do Projeto

```
@caffeine/value-objects
├── src/
│   ├── index.ts                              # Re-exporta todos os VOs
│   ├── core/
│   │   └── value-object.ts                   # Classe abstrata base
│   ├── types/
│   │   └── value-object-metadata.interface.ts # Interface IValueObjectMetadata
│   └── value-objects/
│       ├── defined-string.value-object.ts
│       ├── slug.value-object.ts
│       ├── string-array.value-object.ts
│       ├── url.value-object.ts
│       ├── uuid.value-object.ts
│       └── uuid-array.value-object.ts
```

## 🔗 Dependências do Ecossistema

| Pacote | Papel |
|---|---|
| `@caffeine/schema` | Wrapper `Schema` para validação com TypeBox |
| `@caffeine/models` | DTOs e schemas primitivos (`StringDTO`, `UuidDTO`, etc.) |
| `@caffeine/errors` | Exceptions de domínio (`InvalidPropertyException`) |
| `@caffeine/entity` | Helpers como `slugify` |

## 🛠️ Scripts

| Script | Descrição |
|---|---|
| `bun run build` | Compila o projeto para CJS e ESM com declarações de tipo. |
| `bun run test:unit` | Executa os testes unitários com Vitest. |
| `bun run test:coverage` | Executa os testes com relatório de cobertura. |
| `bun run setup` | Compila e registra o pacote localmente via `bun link`. |

## 📄 Licença

Desenvolvido por [Alan Reis](https://hoyasumii.dev).
