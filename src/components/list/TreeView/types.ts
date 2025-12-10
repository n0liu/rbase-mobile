export interface TreeNode {
  /** 节点名称 */
  name: string;
  /** 节点计数 */
  count: number;
  /** 子节点 */
  children?: TreeNode[];
}

export interface TreeViewProps {
  /** 树形数据 */
  data: TreeNode[];
  /** 已展开的节点名称集合 */
  expandedNodes: Set<string>;
  /** 当前选中的节点名称 */
  selectedNode?: string;
  /** 节点展开/收起回调 */
  onToggle: (nodeName: string) => void;
  /** 节点点击回调 */
  onNodeClick?: (node: TreeNode) => void;
  /** 层级缩进（px），默认 24 */
  levelIndent?: number;
}
