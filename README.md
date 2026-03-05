# NextClaw - OpenClaw 人设配置优化 Skill

> 让 AI 助手拥有独特的"灵魂"

## 简介

NextClaw 是一个 OpenClaw Skill，帮助用户快速创建和优化 AI 助手的人设配置（SOUL.md、USER.md 等）。

## 功能特性

- **快速创建人设** - 通过对话式交互，5 分钟完成人设配置
- **智能优化** - AI 分析现有配置，提出改进建议
- **丰富模板库** - 内置 10+ 常用人设模板
- **一键部署** - 自动备份并写入 OpenClaw 工作目录
- **示例对话预览** - 部署前预览人设效果

## 安装

```bash
# 通过 ClawHub 安装
openclaw skills install nextclaw

# 或从 GitHub 安装
openclaw skills install https://github.com/muzhi-tech/nextclaw
```

## 使用方法

### 创建新人设

```
用户：帮我创建一个赛博妹妹的人设
```

### 优化现有人设

```
用户：优化我的 SOUL.md，让它更有个性
```

### 选择模板

```
用户：给我推荐一个适合程序员的人设模板
```

## 内置模板

| 模板名称 | 描述 | 适用场景 |
|---------|------|---------|
| 赛博妹妹 | 活泼可爱的 AI 妹妹 | 个人助手 |
| 专业秘书 | 高效专业的办公助手 | 工作场景 |
| 技术导师 | 资深工程师风格 | 学习编程 |
| 创意伙伴 | 激发灵感的创意助手 | 内容创作 |
| 温柔管家 | 细心周到的管家 | 生活助手 |
| 毒舌损友 | 直爽毒舌的朋友 | 娱乐互动 |
| 学术导师 | 严谨的学术风格 | 学术研究 |
| 健身教练 | 充满活力的教练 | 健康管理 |
| 投资顾问 | 理性客观的分析师 | 财务规划 |
| 心理咨询师 | 温暖专业的倾听者 | 情感支持 |

## 项目结构

```
nextclaw/
├── README.md              # 项目说明
├── package.json           # NPM 配置
├── skill.json             # OpenClaw Skill 配置
├── src/
│   ├── index.ts           # 入口文件
│   ├── creator.ts         # 人设创建逻辑
│   ├── optimizer.ts       # 人设优化逻辑
│   └── templates.ts       # 模板管理
├── templates/             # 人设模板目录
│   ├── cyber-sister.md
│   ├── professional-secretary.md
│   └── ...
├── docs/
│   ├── PRD.md             # 产品需求文档
│   └── ARCHITECTURE.md    # 架构设计
└── tests/                 # 测试文件
```

## 开发计划

- [x] V1: Skills 方式，发布到 GitHub
- [ ] V2: 独立平台，支持团队协作

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

- GitHub: https://github.com/muzhi-tech/nextclaw
- Issues: https://github.com/muzhi-tech/nextclaw/issues
