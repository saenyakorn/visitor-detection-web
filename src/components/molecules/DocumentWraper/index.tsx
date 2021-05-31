import './style.less'

export interface DocumentWrapperProps {}

export const DocumentWrapper: React.FC<DocumentWrapperProps> = ({ children }) => {
  return <div className="wrapper">{children}</div>
}
