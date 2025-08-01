// src/components/Game.js
import React, { useState, useEffect, useRef } from 'react';
import './Game.css';
import puppetImage from '../../../public/puppet4.png';
import frontImage from '../../../public/wave1.png';

const Game = () => {
    // Thêm hằng số vào đầu component
    const INITIAL_SPEED = 0.1;  // Tốc độ ban đầu
    const SPEED_INCREMENT = 0.05; // Tốc độ tăng mỗi giây

    // Thêm các state và ref mới để quản lý tốc độ
    const [rotation, setRotation] = useState(0);
    const [speed, setSpeed] = useState(0.5);
    const [time, setTime] = useState(0);
    const startTimeRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showVoucher, setShowVoucher] = useState(null);
    const [earnedVouchers, setEarnedVouchers] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const lastSpeedRef = useRef(0.5); // Thêm ref mới để lưu tốc độ
    const pausedTimeRef = useRef(0);
    const gameStageRef = useRef(0);
    const [isInitialPosition, setIsInitialPosition] = useState(true);

    const startCountdown = (isResume = false) => {
        setIsPaused(true); // Pause game during countdown
        setCountdown(3);
        let timeAtPause = time; // Store current time

        const countInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countInterval);
                    setCountdown(null);
                    setIsPaused(false);
                    
                    if (isResume) {
                        // For resume: keep the stored time
                        startTimeRef.current = performance.now() - (timeAtPause * 1000);
                    } else {
                        // For new game: reset time and start game
                        setTime(0);
                        setIsStarted(true); // Thêm dòng này
                        startTimeRef.current = performance.now();
                        // Bắt đầu xoay sau khi đếm ngược
                        setTimeout(() => {
                            setIsInitialPosition(false);
                            rotationDirection.current = Math.random() < 0.5 ? 1 : -1;
                        }, 500); // Đợi 0.5 giây sau khi đếm ngược kết thúc
                    }
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleStart = () => {
        setIsGameOver(false);
        setTime(0);
        setRotation(0);
        setSpeed(0.5); // Tốc độ khởi đầu
        setEarnedVouchers([]);
        setShowVoucher(null);
        startTimeRef.current = null;
        pausedTimeRef.current = 0;
        gameStageRef.current = 0;
        setIsInitialPosition(true); // Đặt vị trí ban đầu
        startCountdown(false);
    };

    // Dùng ref để lưu hướng quay hiện tại (1 là quay sang phải, -1 là quay sang trái)
    const rotationDirection = useRef(1); // Bắt đầu quay sang phải
    const requestRef = useRef();

    // Vòng lặp chính của game
    const gameLoop = (timestamp) => {
        if (isGameOver || !isStarted || isPaused || countdown || isInitialPosition) {
            return;
        }

        if (startTimeRef.current === null) {
            startTimeRef.current = timestamp;
        }

        const elapsedTime = (timestamp - startTimeRef.current) / 1000;
        
        // Tính toán tốc độ tăng tuyến tính
        const currentSpeed = INITIAL_SPEED + (elapsedTime * SPEED_INCREMENT);

        if (!countdown) {
            setSpeed(currentSpeed);
            lastSpeedRef.current = currentSpeed;
        }

        if (!isPaused && !countdown) {
            setTime(elapsedTime);

            // Kiểm tra mốc thời gian để tặng voucher
            if (elapsedTime >= 20 && !earnedVouchers.includes(20)) {
                setEarnedVouchers(prev => [...prev, 20]);
                setShowVoucher({ value: 5000, time: 20 });
                setTimeout(() => setShowVoucher(null), 2000);
            }
            if (elapsedTime >= 40 && !earnedVouchers.includes(40)) {
                setEarnedVouchers(prev => [...prev, 40]);
                setShowVoucher({ value: 10000, time: 40 });
                setTimeout(() => setShowVoucher(null), 2000);
            }
            if (elapsedTime >= 60 && !earnedVouchers.includes(60)) {
                setEarnedVouchers(prev => [...prev, 60]);
                setShowVoucher({ value: 15000, time: 60 });
                setTimeout(() => setShowVoucher(null), 2000);
            }
        }

        setRotation(prevRotation => {
            // Sử dụng currentSpeed thay vì speed để đảm bảo tốc độ được cập nhật đúng
            const newRotation = prevRotation + rotationDirection.current * currentSpeed;
            if (Math.abs(newRotation) >= 90) {
                setIsGameOver(true);
                return prevRotation;
            }
            return newRotation;
        });

        requestRef.current = requestAnimationFrame(gameLoop);
    };

    // Sửa lại useEffect để handle pause
    useEffect(() => {
        if (isStarted && !isGameOver && !isPaused && !countdown && !isInitialPosition) {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isStarted, isGameOver, isPaused, countdown, isInitialPosition]); // Add countdown to dependencies

    // useEffect để xử lý điều khiển bằng chuột và cảm ứng
    useEffect(() => {
        const handleInteraction = (event) => {
            if (isGameOver || !isStarted || countdown) return; // Thêm kiểm tra countdown

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
    }, [isStarted, isGameOver, countdown]); // Thêm countdown vào dependencies

    const startGame = () => {
        handleStart();
    };

    const togglePause = () => {
        setIsPaused(prev => {
            const newPauseState = !prev;
            if (newPauseState) {
                // Lưu tốc độ và thời điểm tạm dừng
                lastSpeedRef.current = speed;
                pausedTimeRef.current = performance.now();
            }
            return newPauseState;
        });
    };

    const handleResume = () => {
        // Điều chỉnh startTimeRef để duy trì thời gian chơi chính xác
        const pauseDuration = (performance.now() - pausedTimeRef.current) / 1000;
        startTimeRef.current += pauseDuration * 1000;
        startCountdown(true);
    };

    const handleHome = () => {
        // Xử lý quay về trang chủ (có thể là điều hướng đến một route khác)
        console.log('Về trang chủ');
    };

    return (
        <div className="game-container">
            {/* Thêm countdown vào đây, trước các component khác */}
            {countdown && (
                <div className="countdown">
                    {countdown}
                </div>
            )}
            {showVoucher && (
                <div className="voucher-notification">
                    Chúc mừng! Bạn nhận được voucher {showVoucher.value.toLocaleString()}đ
                </div>
            )}
            <div className="game-ui">
                {!countdown && <p>Thời gian: {time.toFixed(1)}s</p>}
                {isStarted && !isGameOver && !countdown && ( // Thêm điều kiện !countdown
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

            {(!isStarted || isGameOver) && !countdown && ( // Thêm điều kiện !countdown
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

            {/* Menu tạm dừng */}
            {isPaused && !countdown && ( // Thêm điều kiện !countdown
                <div className="pause-menu">
                    <div className="pause-menu-content">
                        <h2>Tạm Dừng</h2>
                        <div className="pause-menu-buttons">
                            <button className="resume-button" onClick={handleResume}>
                                Tiếp Tục
                            </button>
                            <button className="home-button" onClick={handleHome}>
                                Trang Chủ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;