import React from 'react';

interface SectionHeaderProps {
  color: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({children, color}) => {
  return <div className="indexSectionHeader">
    <div className={`indexSectionHeaderSquare ${color}`} />
    {children}
  </div>
}

interface SectionProps {
  name: string;
  color: string;
}
export const Section: React.FC<SectionProps> = ({name, color, children}) => {
  return <div className="indexSection">
    <SectionHeader color={color}>{name}</SectionHeader>
    {children}
  </div>
}
