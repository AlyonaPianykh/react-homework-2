import React from 'react';

const CN = 'user-list-option';

export const UserListOption = (props) => {
  const { item } = props;

  return (
    <div className={CN}>
      <div>{item.first_name} {item.last_name}</div>
    </div>
  );
};