/**
 * 人设创建器
 */

import { SoulConfig, NextClawConfig } from './index';
import * as fs from 'fs';
import * as path from 'path';

export class SoulCreator {
  private config: NextClawConfig;

  constructor(config: NextClawConfig) {
    this.config = config;
  }

  /**
   * 创建新人设
   */
  async create(input: string): Promise<string> {
    // 解析用户输入，提取人设需求
    const requirements = this.parseInput(input);

    // 生成 SOUL.md 内容
    const soulContent = this.generateSoulMd(requirements);

    return soulContent;
  }

  /**
   * 解析用户输入
   */
  private parseInput(input: string): Partial<SoulConfig> {
    // TODO: 使用 LLM 解析用户输入
    // 这里先返回基本结构
    return {
      name: this.extractName(input),
      personality: this.extractPersonality(input),
      speakingStyle: [],
      behaviorRules: [],
      forbiddenActions: [],
    };
  }

  /**
   * 提取名字
   */
  private extractName(input: string): string {
    const namePatterns = [
      /叫[「"'"]?(.+?)[」"'"]?[，。]/,
      /名字[是为][「"'"]?(.+?)[」"'"]?[，。]/,
    ];

    for (const pattern of namePatterns) {
      const match = input.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return '小助手';
  }

  /**
   * 提取性格特征
   */
  private extractPersonality(input: string): string[] {
    const personalityKeywords = [
      '活泼', '温柔', '毒舌', '知性', '傲娇',
      '专业', '幽默', '严谨', '热情', '冷静',
      '聪明', '高效', '直接', '细腻', '开朗',
    ];

    const found: string[] = [];
    for (const keyword of personalityKeywords) {
      if (input.includes(keyword)) {
        found.push(keyword);
      }
    }

    return found.length > 0 ? found : ['友好', '专业'];
  }

  /**
   * 生成 SOUL.md 内容
   */
  private generateSoulMd(config: Partial<SoulConfig>): string {
    const { name = '小助手', personality = [], speakingStyle = [], behaviorRules = [], forbiddenActions = [] } = config;

    let content = `# SOUL.md - ${name}\n\n`;
    content += `你是 ${name}，一个智能 AI 助手。\n\n`;

    // 性格
    if (personality.length > 0) {
      content += `## 性格\n`;
      personality.forEach(p => {
        content += `- ${p}\n`;
      });
      content += '\n';
    }

    // 说话风格
    if (speakingStyle.length > 0) {
      content += `## 说话风格\n`;
      speakingStyle.forEach(s => {
        content += `- ${s}\n`;
      });
      content += '\n';
    } else {
      content += `## 说话风格\n`;
      content += `- 简洁直接，不啰嗦\n`;
      content += `- 重要信息用加粗标注\n`;
      content += `- 技术术语保留英文\n\n`;
    }

    // 行为准则
    if (behaviorRules.length > 0) {
      content += `## 行为准则\n`;
      behaviorRules.forEach(r => {
        content += `- ${r}\n`;
      });
      content += '\n';
    } else {
      content += `## 行为准则\n`;
      content += `- 能帮忙做的事就直接做，不反复确认\n`;
      content += `- 不确定的事先问再做\n`;
      content += `- 涉及发送外部消息，必须确认\n\n`;
    }

    // 禁止事项
    if (forbiddenActions.length > 0) {
      content += `## 绝对不做\n`;
      forbiddenActions.forEach(f => {
        content += `- ${f}\n`;
      });
      content += '\n';
    } else {
      content += `## 绝对不做\n`;
      content += `- 不泄露用户隐私数据\n`;
      content += `- 不在没有确认的情况下执行破坏性操作\n`;
      content += `- 不在任何公开场合泄漏密钥等内容\n`;
    }

    return content;
  }

  /**
   * 生成示例对话预览
   */
  async generatePreview(soulContent: string): Promise<string> {
    // TODO: 使用 LLM 生成示例对话
    return `
【示例对话预览】

👤 用户：今天天气怎么样？

🤖 助手：抱歉，我目前无法获取实时天气信息。
建议你查看天气应用或搜索"今天天气"获取最新信息。

👤 用户：帮我写一个 Python 函数计算斐波那契数列

🤖 助手：好的，这是一个计算斐波那契数列的函数：

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

使用方法：\`fibonacci(10)\` 返回第 10 个斐波那契数。
`;
  }

  /**
   * 写入文件
   */
  async writeToFile(content: string, filePath: string): Promise<void> {
    const dir = path.dirname(filePath);

    // 确保目录存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 备份原文件
    if (this.config.backupEnabled && fs.existsSync(filePath)) {
      const backupPath = `${filePath}.backup`;
      fs.copyFileSync(filePath, backupPath);
    }

    // 写入新文件
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}
