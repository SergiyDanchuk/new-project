import React, { Component } from 'react';
import WinLine from './WinLine';

export default class MenuContent extends Component {

    render() {
        return <>
            <h2 className="burger-menu__content">HIGH VALUE</h2>
            <p>Multiplies your bet by 10x</p>
            <img src="assets/images/UI/IDOL_1.png" />
            <img src="assets/images/UI/RUBY_1.png" />
            <img src="assets/images/UI/RING_1.png" />
            <h2 className="burger-menu__content">MID VALUE</h2>
            <p>Multiplies your bet by 5x</p>
            <img src="assets/images/UI/CHEST_1.png" />
            <img src="assets/images/UI/SHIELD_1.png" />
            <img src="assets/images/UI/HELMET_1.png" />
            <h2 className="burger-menu__content">LOW VALUE</h2>
            <p>Multiplies your bet by 3x</p>
            <img src="assets/images/UI/SKULL_1.png" />
            <img src="assets/images/UI/FIRE_1.png" />
            <img src="assets/images/UI/POTION_1.png" />
            <h2 className="burger-menu__content">WIN LINES</h2>
            <p>Land 4 identical symbols in any of the configurations below</p>
            <div className="win-line__container">
                <WinLine winLines={[
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                ]} />
                <WinLine winLines={[
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 1],
                    [0, 0, 0, 1],
                    [0, 0, 0, 1],
                    [0, 0, 0, 1],
                ]} />
                <WinLine winLines={[
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 1],
                    [0, 0, 1, 0],
                    [0, 1, 0, 0],
                    [1, 0, 0, 0],
                ]} />
            </div>


        </>;
    }
}
