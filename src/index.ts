/**
 * NextClaw - OpenClaw 人设配置优化 Skill
 * 入口文件
 */

import { SoulCreator } from './creator';
import { SoulOptimizer } from './optimizer';
import { TemplateManager } from './templates';

export interface NextClawConfig {
  maxRetries: number;
  timeout: number;
  backupEnabled: boolean;
}

export interface SoulConfig {
  name: string;
  personality: string[];
  speakingStyle: string[];
  behaviorRules: string[];
  forbiddenActions: string[];
}

export class NextClaw {
  private creator: SoulCreator;
  private optimizer: SoulOptimizer;
  private templateManager: TemplateManager;
  private config: NextClawConfig;

  constructor(config?: Partial<NextClawConfig>) {
    this.config = {
      maxRetries: config?.maxRetries ?? 3,
      timeout: config?.timeout ?? 30000,
      backupEnabled: config?.backupEnabled ?? true,
    };

    this.creator = new SoulCreator(this.config);
    this.optimizer = new SoulOptimizer(this.config);
    this.templateManager = new TemplateManager();
  }

  /**
   * 创建新人设
   */
  async createSoul(input: string): Promise<string> {
    return this.creator.create(input);
  }

  /**
   * 优化现有人设
   */
  async optimizeSoul(soulPath: string): Promise<string> {
    return this.optimizer.optimize(soulPath);
  }

  /**
   * 获取模板列表
   */
  getTemplates(): string[] {
    return this.templateManager.listTemplates();
  }

  /**
   * 应用模板
   */
  async applyTemplate(templateName: string, customizations?: Partial<SoulConfig>): Promise<string> {
    return this.templateManager.apply(templateName, customizations);
  }

  /**
   * 生成示例对话预览
   */
  async previewDialogue(soulContent: string): Promise<string> {
    return this.creator.generatePreview(soulContent);
  }
}

// 导出实例
export const nextclaw = new NextClaw();

// 默认导出
export default NextClaw;
