import React from 'react';

type Props = {
  id: string;
  name: string;
  checked: boolean;
  onToggle: (id: string) => void;
};

const AuthorItem: React.FC<Props> = ({ id, name, checked, onToggle }) => {
  return (
    <label className="author-item" data-testid="author-item-component">
      <input
        className="author-item__checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
      />
      <span className="author-item__name">{name}</span>
    </label>
  );
};

export default AuthorItem;
