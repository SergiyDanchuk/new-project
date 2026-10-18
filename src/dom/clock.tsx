import React, { Component } from 'react';

interface DigitalClockState {
    time: string;
}

// Годинник, який оновлюється щосекунди, поки компонент змонтований.
class Clock extends Component<{}, DigitalClockState> {
    // Зберігаємо таймер, щоб скасувати його під час демонтування компонента.
    private intervalId: NodeJS.Timeout | undefined;

    // Одразу встановлюємо час для відображення.
    constructor(props: {}) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
        };
    }

    // Запускаємо таймер, що щосекунди оновлює місцевий час.
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({ time: new Date().toLocaleTimeString() });
        }, 1000);
    }

    // Зупиняємо таймер, щоб не оновлювати вже видалений компонент.
    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    // Показуємо поточний час у верхній інформаційній панелі.
    render() {
        return (
            <div className="compliance-bar__container">
                <div className='compliance-bar__clock'>{this.state.time}</div>
            </div>
        )
    }
}

export default Clock;
