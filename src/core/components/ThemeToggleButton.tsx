// ThemeToggleButton.tsx
import React from 'react';
import { Switch } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../../global/hooks/useTheme';

const ThemeToggleButton: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="lex items-center space-x-2 mr-4">
      <Switch
        checked={darkMode}
        onChange={toggleTheme}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        className="transition-colors"
      />
    </div>
  );
};

export default ThemeToggleButton;
