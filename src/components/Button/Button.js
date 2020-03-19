import React from "react";
import "./Button.scss";

const CN = "my-btn";
export const Button = props => {
    const {
        id,
        type = "button", // дефолтное значение = 'button'
        onClick,
        label = "Click me", // дефолтное значение = "Click me"
        className = "btn-primary",
        isDisable = false
        // todo добавить пропсу isDisabled, значение которой по умолчанию должно быть false
    } = props;

    const onClickHandler = e => {
        onClick && onClick(e); // такая конструкция нужна, чтоб, если onClick в пропсах не прийдет, тут не выпала ошибка
    };

    // todo в строке 23 если значение isDisabled равно true добавить класс "disabled"
    //   после 26 строки добавить кнопке атрибут disabled который равен значению пропсы isDisabled
    return (
        <button
            className={`${CN} btn add-margin ${className} ${isDisable && 'disabled'}`}
            id={id}
            onClick={onClickHandler}
            type={type}
            disabled={isDisable}
        >
            {label}
        </button>
    );
};
