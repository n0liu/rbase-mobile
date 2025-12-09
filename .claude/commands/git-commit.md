---
description: 智能提交代码到本地 Git 仓库
---

请帮我提交当前的代码变更到本地 Git 仓库。

执行步骤：

1. **检查 Git 状态**
   - 运行 `git status` 查看当前变更
   - 运行 `git diff --stat` 查看变更统计

2. **分析变更内容**
   - 快速浏览主要文件的变更（使用 `git diff` 查看关键文件）
   - 理解这次提交的主要目的和改动范围

3. **生成提交信息**
   - 使用 Conventional Commits 格式（feat/fix/refactor/docs/style/test/chore）
   - 主标题简洁明了（不超过50字符）
   - 详细描述列出主要改动点
   - 添加 Claude Code 署名

4. **执行提交**
   - 使用 `git add` 添加所有相关文件（排除不应提交的文件如 `.env`, `node_modules`, 临时文件等）
   - 使用 `git commit` 创建提交
   - 显示提交结果和最新的提交历史

5. **提交后确认**
   - 运行 `git log --oneline -3` 显示最近3次提交
   - 运行 `git status` 确认提交成功

注意事项：
- 不要提交敏感信息（.env 文件、密钥、凭证等）
- 不要提交编译产物（node_modules、.next、dist 等）
- 本地配置文件（如 .claude/settings.local.json）不应提交
- 提交信息应该清晰描述"做了什么"和"为什么"

提交信息格式示例：
```
feat: 添加用户认证功能

- 实现 JWT token 认证机制
- 添加登录和注册页面
- 集成后端 API 接口
- 添加路由守卫保护私有页面

```
