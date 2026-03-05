# NextClaw - OpenClaw 人设配置优化技能

> 让 AI 助手拥有独特的"灵魂"

## 简介

NextClaw 是一个 OpenClaw Skill，帮助用户快速创建和优化 AI 助手的人设配置（SOUL.md、USER.md 等）。

## 功能特性

- **快速创建人设** - 通过对话式交互，5 分钟完成人设配置
- **智能优化** - AI 分析现有配置，提出改进建议
- **丰富模板库** - 内置 6 个常用人设模板
- **自动备份** - 修改配置前自动备份原文件
- **示例对话预览** - 部署前预览人设效果

## 安装

### 方式一：通过 ClawHub 安装

```bash
clawhub install nextclaw
```

### 方式二：从 GitHub 安装

```bash
# 克隆到用户技能目录
git clone https://github.com/muzhi-tech/nextclaw.git ~/.openclaw/skills/nextclaw
```

### 方式三：手动安装

1. 下载本项目
2. 将整个文件夹复制到 `~/.openclaw/skills/nextclaw/`

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

| 模板 ID | 名称 | 描述 | 适用场景 |
|---------|------|------|---------|
| cyber-sister | 赛博妹妹 | 活泼可爱的 AI 妹妹 | 个人助手、娱乐 |
| professional-secretary | 专业秘书 | 高效专业的办公助手 | 工作场景 |
| tech-mentor | 技术导师 | 资深工程师风格 | 学习编程 |
| creative-partner | 创意伙伴 | 激发灵感的创意助手 | 内容创作 |
| gentle-butler | 温柔管家 | 细心周到的管家 | 生活助手 |
| toxic-friend | 毒舌损友 | 直爽毒舌的朋友 | 娱乐互动 |

## 项目结构

```
nextclaw/
├── SKILL.md           # 技能描述文件（核心）
├── agent.py           # Python 执行逻辑
└── README.md          # 项目说明
```

## 开发计划

- [x] V1: Skills 方式，发布到 GitHub
- [ ] V2: 独立平台，支持团队协作

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 链接

- GitHub: https://github.com/muzhi-tech/nextclaw
- Issues: https://github.com/muzhi-tech/nextclaw/issues
