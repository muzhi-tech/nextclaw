# NextClaw 架构设计

## 整体架构

```
┌─────────────────────────────────────────────────────────────────┐
│                         NextClaw Skill                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│  │   Index     │───▶│   Creator   │    │  Optimizer  │          │
│  │  (入口)     │    │  (创建器)    │    │  (优化器)   │          │
│  └─────────────┘    └─────────────┘    └─────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                  │
│                            ▼                                     │
│                   ┌─────────────┐                                │
│                   │  Template   │                                │
│                   │  Manager    │                                │
│                   └─────────────┘                                │
│                            │                                     │
│                            ▼                                     │
│                   ┌─────────────┐                                │
│                   │  Templates  │                                │
│                   │   (模板库)   │                                │
│                   └─────────────┘                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 核心类设计

### NextClaw (主类)

```typescript
class NextClaw {
  // 创建新人设
  createSoul(input: string): Promise<string>

  // 优化现有人设
  optimizeSoul(soulPath: string): Promise<string>

  // 获取模板列表
  getTemplates(): string[]

  // 应用模板
  applyTemplate(name: string): Promise<string>

  // 生成预览
  previewDialogue(content: string): Promise<string>
}
```

### SoulCreator (创建器)

```typescript
class SoulCreator {
  // 创建人设
  create(input: string): Promise<string>

  // 解析用户输入
  parseInput(input: string): SoulConfig

  // 生成 SOUL.md
  generateSoulMd(config: SoulConfig): string

  // 生成示例对话
  generatePreview(content: string): Promise<string>
}
```

### SoulOptimizer (优化器)

```typescript
class SoulOptimizer {
  // 优化人设
  optimize(path: string): Promise<string>

  // 分析配置
  analyze(content: string): Promise<OptimizationSuggestion[]>

  // 应用建议
  applySuggestions(content: string, suggestions: Suggestion[]): string

  // 生成报告
  generateReport(suggestions: Suggestion[]): string
}
```

### TemplateManager (模板管理器)

```typescript
class TemplateManager {
  // 列出模板
  listTemplates(): string[]

  // 获取模板
  getTemplate(name: string): Template

  // 应用模板
  apply(name: string, customizations?: Partial<SoulConfig>): string

  // 推荐模板
  recommend(keywords: string[]): Template[]
}
```

## 数据流

```
用户输入
    │
    ▼
┌─────────────┐
│ 意图识别    │
└─────────────┘
    │
    ├─── 创建 ───▶ Creator ───▶ 生成 SOUL.md
    │
    ├─── 优化 ───▶ Optimizer ───▶ 分析 + 建议
    │
    └─── 模板 ───▶ TemplateManager ───▶ 应用模板
                        │
                        ▼
                 ┌─────────────┐
                 │ 用户确认    │
                 └─────────────┘
                        │
                        ▼
                 ┌─────────────┐
                 │ 写入文件    │
                 └─────────────┘
```

## 配置结构

### SoulConfig

```typescript
interface SoulConfig {
  name: string;           // 人设名称
  personality: string[];  // 性格特征
  speakingStyle: string[]; // 说话风格
  behaviorRules: string[]; // 行为准则
  forbiddenActions: string[]; // 禁止事项
}
```

### Template

```typescript
interface Template {
  name: string;        // 模板名称
  description: string; // 模板描述
  tags: string[];      // 标签
  content: string;     // 模板内容
}
```

## 扩展点

1. **自定义模板**: 用户可以添加自己的模板
2. **优化规则**: 可扩展优化分析规则
3. **LLM 集成**: 可替换底层 LLM 实现
