import React, { useState } from 'react';
import { Button } from '../Button/Button';
import './PostImage.scss';

export const PostImage = props => {
  const { src = 'https://cdn2.thecatapi.com/images/bcp.jpg' } = props;

  // хотим показать/скрыть картинку по клику на кнопку
  const [isHidden, setIsHidden] = useState(false); // хук изменения состояния, который вызывает перерендер нашей компоненты если isHidden меняется

  const onClickHandler = () => {
    // функция обработки нажатия на кнопку
    setIsHidden(!isHidden);
    // здесь могут быть вызову других функций
  };

  return (
    <div className="image-wrapper">
      {!isHidden && <img src={src} className="img1"/>}
      <Button
        className={`btn-sm btn-secondary`}
        label={!isHidden ? 'Hide img' : 'Show img'}
        onClick={onClickHandler}
      />
    </div>
  );

};
