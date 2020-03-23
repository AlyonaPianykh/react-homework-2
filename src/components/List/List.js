import React, {Component} from 'react';
import './List.scss';

const CN = 'custom-list';

export class List extends Component {

    onOptionClick = (id) => {
        return () => {
            const {onOptionSelect} = this.props;
            !!id && onOptionSelect && onOptionSelect(id)
            console.log(onOptionSelect)
        };
    };

    onOptionClick2 = (event) => {
        const {id} = event.target.id;
        const {onOptionSelect} = this.props;
        onOptionSelect(id);
    };

    render() {
        const {options, selectedOptionId, itemRenderer, className = '', title = ''} = this.props;
        const ItemRenderer = itemRenderer;
        console.log(this.props);

        return (
            <div className={`${CN} ${className}`}>
                {!!title && <p>{title}</p>}
                <ul className="change-menu list-group">
                    {!!options.length && options.map(item => {
                        return (
                            <li key={item.id} id={item.id}
                                className={`list-group-item ${item.id === selectedOptionId ? 'active' : ''}`}
                                onClick={this.onOptionClick(item.id)}
                            >
                                <ItemRenderer item={item}/>
                                {/*UserListOption*/}
                            </li>
                        );
                    })}

                    {
                        !options.length && (
                            <li className="list-group-item">
                                No Options To Displays
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}