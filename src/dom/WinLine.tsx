import React, { Component } from 'react';

interface WinLineProps {
    winLines: (1 | 0)[][];
}

// Відображає сітку 4×4 для одного шаблону виграшної лінії.
export default class WinLine extends Component<WinLineProps> {

    // Створюємо елемент для кожної клітинки й підсвічуємо ті, що мають значення 1.
    render() {
        return <>
            
            <div className="win-line">
                {this.props.winLines.map((row, rowIndex) => (
                    <div key={rowIndex} className="win-line__row">
                        {row.map((item, itemIndex) => (
                            <div 
                                key={itemIndex} 
                                className={`win-line__row-item ${item === 1 ? '--on' : ''}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </>;
    }
}
