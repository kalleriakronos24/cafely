import moment from 'moment';

const calculateTimeLeft = (date) => {
    const dateToFinish = new Date(date);
    const diff = +dateToFinish - +new Date();
    let timeLeft = {};

    if (diff > 0)
        timeLeft = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            mins: Math.floor((diff / 1000 / 60) % 60),
            secs: Math.floor((diff / 1000) % 60)
        }
    return timeLeft;
}

export {
    calculateTimeLeft
}