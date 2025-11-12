import React from 'react';

interface ScanLinesProps {
  active?: boolean;
}

export const ScanLines: React.FC<ScanLinesProps> = ({ active = true }) => {
  if (!active) return null;

  return (
    <div className="avatar-scan-lines">
      <div className="scan-line" />
      <div className="scan-line scan-line--secondary" />
    </div>
  );
};
