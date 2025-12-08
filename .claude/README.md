# Claude Code 项目配置

## Hooks 配置

本项目配置了以下 hooks：

### `after-write-hook`
每次 Claude Code 写入文件后，自动执行 TypeScript 和 ESLint 检查。

**执行命令**：
```bash
npx tsc --noEmit && npm run lint
```

**说明**：
- `npx tsc --noEmit`：运行 TypeScript 类型检查，不生成输出文件
- `npm run lint`：运行 ESLint 代码检查

**好处**：
- ✅ 实时发现类型错误
- ✅ 及时发现代码规范问题
- ✅ 保证代码质量

## 项目信息

- **技术栈**：Next.js 16 + React 19 + TypeScript 5
- **UI 库**：Ant Design Mobile 5
- **状态管理**：Zustand
- **HTTP 请求**：Axios
- **移动端适配**：postcss-px-to-viewport-8-plugin
- **调试工具**：vConsole
