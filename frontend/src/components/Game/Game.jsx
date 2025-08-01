// src/components/Game.js
import React, { useState, useEffect, useRef } from 'react';
import './Game.css';
import puppetImage from '../../../public/puppet4.png';
import frontImage from '../../../public/wave.png';

const Game = () => {
    // Trạng thái của game
    const [rotation, setRotation] = useState(0);
    const [speed, setSpeed] = useState(0.1); // Tốc độ quay hiện tại
    const [time, setTime] = useState(0);
    const startTimeRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Dùng ref để lưu hướng quay hiện tại (1 là quay sang phải, -1 là quay sang trái)
    const rotationDirection = useRef(1); // Bắt đầu quay sang phải
    const requestRef = useRef();

    // Vòng lặp chính của game
    const gameLoop = (timestamp) => {
        if (isGameOver || !isStarted || isPaused) {
            return; // Không tiếp tục vòng lặp khi pause
        }

        // Cập nhật thời gian thực từ lúc bắt đầu
        if (startTimeRef.current === null) {
            startTimeRef.current = timestamp;
        }
        const elapsedTime = (timestamp - startTimeRef.current) / 1000; // Chuyển đổi từ milliseconds sang seconds
        setTime(elapsedTime);

        // Cập nhật góc quay dựa trên hướng và tốc độ
        setRotation(prevRotation => {
            const newRotation = prevRotation + rotationDirection.current * speed;
            if (Math.abs(newRotation) >= 90) {
                setIsGameOver(true);
                return prevRotation;
            }
            return newRotation;
        });

        // Tăng tốc độ quay theo thời gian để tăng độ khó
        setSpeed(prevSpeed => prevSpeed + 0.00075);

        requestRef.current = requestAnimationFrame(gameLoop);
    };

    // Sửa lại useEffect để handle pause
    useEffect(() => {
        if (isStarted && !isGameOver && !isPaused) {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isStarted, isGameOver, isPaused, speed]); // Thêm isPaused vào dependencies

    // useEffect để xử lý điều khiển bằng chuột và cảm ứng
    useEffect(() => {
        const handleInteraction = (event) => {
            if (isGameOver || !isStarted) return;

            // Lấy tọa độ X của điểm chạm/click
            const clickX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
            
            // Lấy vị trí của con rối trên màn hình (để làm mốc)
            const puppetElement = document.getElementById('puppet-container');
            if (!puppetElement) return;
            const puppetRect = puppetElement.getBoundingClientRect();
            const puppetCenterX = puppetRect.left + puppetRect.width / 2;

            // Yêu cầu: Bấm bên trái con rối -> quay sang phải, và ngược lại
            if (clickX < puppetCenterX) {
                // Click/chạm vào bên trái con rối -> đổi hướng quay sang phải
                rotationDirection.current = 1; 
            } else {
                // Click/chạm vào bên phải con rối -> đổi hướng quay sang trái
                rotationDirection.current = -1;
            }
        };

        // Gắn sự kiện vào toàn bộ cửa sổ
        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        // Dọn dẹp sự kiện khi component bị hủy
        return () => {
            window.removeEventListener('mousedown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [isStarted, isGameOver]); // Chỉ phụ thuộc vào trạng thái game

    const startGame = () => {
        setIsStarted(true);
        setIsGameOver(false);
        setIsPaused(false); // Reset pause state
        setRotation(0);
        setTime(0);
        setSpeed(0.1);
        startTimeRef.current = null;
        rotationDirection.current = Math.random() < 0.5 ? 1 : -1;
    };

    const togglePause = () => {
        setIsPaused(prev => {
            const newPauseState = !prev;
            if (!newPauseState) {
                // Khi unpause, reset startTimeRef để tính lại thời gian
                startTimeRef.current = null;
            }
            return newPauseState;
        });
    };

    return (
        <div className="game-container">
            <div className="game-ui">
                <p>Thời gian: {time.toFixed(1)}s</p>
                {isStarted && !isGameOver && (
                    <button 
                        className="pause-button"
                        onClick={togglePause}
                    >
                        {isPaused ? '▶️' : '⏸️'}
                    </button>
                )}
            </div>

            <div 
                id="puppet-container"
                className="puppet-container" 
                style={{ 
                    transform: `translateX(-50%) rotate(${rotation}deg)`,
                    bottom: isStarted ? '25%' : '-100%', 
                }}
            >
                <img src={puppetImage} alt="Water Puppet" className="puppet-image" />
            </div>

            {/* Add frontImage on top */}
            <img 
                src={frontImage} 
                alt="Wave" 
                className="front-image"
            />

            {(!isStarted || isGameOver) && (
                <div className="game-over-screen">
                    {isGameOver ? (
                        <>
                            <h2>THUA RỒI!</h2>
                            <p>Điểm của bạn: {Math.floor(time)}</p>
                            <button onClick={startGame}>Chơi lại</button>
                        </>
                    ) : (
                        <>
                            <h2>Game Múa Rối Nước</h2>
                            {/* Cập nhật hướng dẫn chơi */}
                            <p>Chạm/Click vào hai bên con rối để đổi chiều quay!</p>
                            <button onClick={startGame}>Bắt đầu</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game;