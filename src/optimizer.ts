/**
 * 人设优化器
 */

import { NextClawConfig } from './index';
import * as fs from 'fs';

export interface OptimizationSuggestion {
  type: 'add' | 'modify' | 'remove' | 'restructure';
  section: string;
  current?: string;
  suggested: string;
  reason: string;
}

export class SoulOptimizer {
  private config: NextClawConfig;

  constructor(config: NextClawConfig) {
    this.config = config;
  }

  /**
   * 优化人设
   */
  async optimize(soulPath: string): Promise<string> {
    // 读取现有配置
    const content = this.readSoulFile(soulPath);

    // 分析配置
    const suggestions = await this.analyze(content);

    // 生成优化后的内容
    const optimized = this.applySuggestions(content, suggestions);

    return optimized;
  }

  /**
   * 读取 SOUL.md 文件
   */
  private readSoulFile(path: string): string {
    if (!fs.existsSync(path)) {
      throw new Error(`SOUL.md 文件不存在: ${path}`);
    }

    return fs.readFileSync(path, 'utf-8');
  }

  /**
   * 分析人设配置
   */
  private async analyze(content: string): Promise<OptimizationSuggestion[]> {
    const suggestions: OptimizationSuggestion[] = [];

    // 检查是否有过长的段落
    if (this.hasLongParagraphs(content)) {
      suggestions.push({
        type: 'restructure',
        section: '整体结构',
        suggested: '将长段落拆分为更清晰的列表项',
        reason: '列表项更易于 AI 理解和遵循',
      });
    }

    // 检查是否有模糊的描述
    const vagueTerms = this.findVagueTerms(content);
    if (vagueTerms.length > 0) {
      suggestions.push({
        type: 'modify',
        section: '描述精确性',
        current: vagueTerms.join(', '),
        suggested: '使用更具体的描述替换模糊词汇',
        reason: '模糊词汇如"友好"、"专业"难以具体执行',
      });
    }

    // 检查是否有缺失的重要部分
    const missingSections = this.findMissingSections(content);
    if (missingSections.length > 0) {
      suggestions.push({
        type: 'add',
        section: missingSections.join(', '),
        suggested: '添加缺失的配置部分',
        reason: '完整的人设配置应包含性格、风格、准则和禁止事项',
      });
    }

    // 检查是否有冲突的规则
    const conflicts = this.findConflicts(content);
    if (conflicts.length > 0) {
      suggestions.push({
        type: 'remove',
        section: '冲突规则',
        current: conflicts.join('; '),
        suggested: '移除或修改冲突的规则',
        reason: '冲突的规则会让 AI 无所适从',
      });
    }

    return suggestions;
  }

  /**
   * 检查是否有过长的段落
   */
  private hasLongParagraphs(content: string): boolean {
    const paragraphs = content.split('\n\n');
    return paragraphs.some(p => p.length > 500);
  }

  /**
   * 查找模糊词汇
   */
  private findVagueTerms(content: string): string[] {
    const vagueTerms = ['友好', '专业', '有帮助', '适当', '合理', '尽量'];
    return vagueTerms.filter(term => content.includes(term));
  }

  /**
   * 查找缺失的部分
   */
  private findMissingSections(content: string): string[] {
    const requiredSections = ['性格', '说话风格', '行为准则', '绝对不做'];
    return requiredSections.filter(section => !content.includes(section));
  }

  /**
   * 查找冲突的规则
   */
  private findConflicts(content: string): string[] {
    // TODO: 实现更智能的冲突检测
    const conflicts: string[] = [];

    // 简单示例：检测"必须"和"禁止"的矛盾
    const mustPattern = /必须[^。\n]+/g;
    const forbiddenPattern = /禁止[^。\n]+/g;

    const musts = content.match(mustPattern) || [];
    const forbiddens = content.match(forbiddenPattern) || [];

    // 检查是否有相同关键词的冲突
    // 这里只是示例，实际需要更复杂的逻辑

    return conflicts;
  }

  /**
   * 应用优化建议
   */
  private applySuggestions(content: string, suggestions: OptimizationSuggestion[]): string {
    let optimized = content;

    // TODO: 根据 suggestions 修改 content
    // 这里需要更复杂的逻辑来实际应用建议

    // 添加优化标记
    optimized += '\n\n---\n';
    optimized += '<!-- 由 NextClaw 优化 -->\n';

    return optimized;
  }

  /**
   * 生成优化报告
   */
  generateReport(suggestions: OptimizationSuggestion[]): string {
    if (suggestions.length === 0) {
      return '✅ 你的人设配置已经很好了，暂无优化建议！';
    }

    let report = '# 人设优化报告\n\n';
    report += `共发现 ${suggestions.length} 条优化建议：\n\n`;

    suggestions.forEach((s, index) => {
      const icon = {
        add: '➕',
        modify: '✏️',
        remove: '❌',
        restructure: '🔄',
      }[s.type];

      report += `## ${index + 1}. ${icon} ${s.section}\n\n`;
      report += `**类型**: ${s.type}\n\n`;

      if (s.current) {
        report += `**当前**: ${s.current}\n\n`;
      }

      report += `**建议**: ${s.suggested}\n\n`;
      report += `**原因**: ${s.reason}\n\n`;
      report += '---\n\n';
    });

    return report;
  }
}
