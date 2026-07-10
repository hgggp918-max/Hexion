

.particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
}


.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
    animation: float 15s infinite linear;
}


@keyframes float {

    from {
        transform: translateY(100vh);
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    to {
        transform: translateY(-10vh);
        opacity: 0;
    }

}