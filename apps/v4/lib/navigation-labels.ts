// Display-only labels: raw content titles remain identifiers for navigation logic.
const pageLabels: Record<string, string> = {
  '/': '首页',
  '/docs': '文档',
  '/docs/introduction': '简介',
  '/docs/components': '组件',
  '/docs/installation': '安装',
  '/docs/components-json': '组件配置',
  '/docs/theming': '主题配置',
  '/docs/dark-mode': '深色模式',
  '/docs/cli': '命令行工具（CLI）',
  '/docs/javascript': 'JavaScript 支持',
  '/docs/rtl': '从右向左布局（RTL）',
  '/docs/figma': 'Figma 设计资源',
  '/docs/legacy': '旧版文档',
  '/docs/skills': '技能',
  '/docs/mcp': 'MCP 服务',
  '/docs/forms': '表单',
  '/docs/typeset': '排版',
  '/docs/changelog': '更新日志',
  '/docs/registry': '组件注册表',
  '/docs/registry/getting-started': '快速开始',
  '/docs/registry/examples': '示例',
  '/docs/registry/faq': '常见问题',
  '/docs/registry/registry-json': '注册表配置',
  '/docs/registry/registry-item-json': '注册项配置',
  '/docs/directory': '资源目录',
  '/docs/utilities': '实用工具',
  '/docs/utilities/scroll-fade': '滚动渐隐',
  '/docs/utilities/shimmer': '微光效果',
  '/docs/installation/vite': 'Vite 安装',
  '/docs/installation/nuxt': 'Nuxt 安装',
  '/docs/installation/astro': 'Astro 安装',
  '/docs/installation/laravel': 'Laravel 安装',
  '/docs/installation/manual': '手动安装',
  '/docs/dark-mode/vite': 'Vite 深色模式',
  '/docs/dark-mode/nuxt': 'Nuxt 深色模式',
  '/docs/dark-mode/vitepress': 'VitePress 深色模式',
  '/docs/dark-mode/astro': 'Astro 深色模式',
  '/docs/forms/vee-validate': 'VeeValidate 表单',
  '/docs/forms/tanstack-form': 'TanStack Form 表单',
  '/docs/forms/formisch': 'Formisch 表单',
  '/blocks': '区块',
  '/charts/area': '图表',
  '/colors': '色彩',
  '/create': '创建',
  '/typeset': '排版',
}

const groupLabels: Record<string, string> = {
  'Docs': '文档',
  'Sections': '栏目',
  'Get Started': '快速开始',
  'Components': '组件',
  'Registry': '组件注册表',
  'Forms': '表单',
  'MCP Server': 'MCP 服务',
  'Directory': '资源目录',
  'Installation': '安装',
  'Dark Mode': '深色模式',
  'Utilities': '实用工具',
  'Blocks': '区块',
}

// Add approved component aliases here without changing their English display names.
const componentKeywords: Record<string, string[]> = {}

interface NavigationLabelItem {
  path: string
  title: string
  type?: unknown
}

export function getPageLabel(path: string, fallback: string): string {
  return pageLabels[path] ?? fallback
}

export function getGroupLabel(title: string): string {
  return groupLabels[title] ?? title
}

export function getNavigationLabel(item: NavigationLabelItem): string {
  if (item.type === 'component' || item.path.startsWith('/docs/components/'))
    return item.title
  return getPageLabel(item.path, item.title)
}

export function getNavigationKeywords(item: NavigationLabelItem): string[] {
  return [item.title, getNavigationLabel(item), ...(componentKeywords[item.path] ?? [])]
}

export function getTopNavLabel(path: string, fallback: string): string {
  return path === '/docs/installation' ? '文档' : getPageLabel(path, fallback)
}
