export interface Person {
  /** 人物ID */
  id: number;
  /** 姓名 */
  name: string;
  /** 头像URL */
  avatar: string;
  /** 职位/头衔 */
  title?: string;
  /** 所属机构 */
  organization?: string;
  /** 研究方向 */
  researchArea?: string;
  /** 文章数量 */
  articleCount?: number;
}

export interface PersonCardProps {
  /** 人物数据 */
  person: Person;
  /** 点击事件 */
  onClick?: () => void;
  /** 自定义姓名渲染函数 */
  renderName?: (name: string) => React.ReactNode;
  /** 自定义职位渲染函数 */
  renderTitle?: (title: string) => React.ReactNode;
}
