
function RiftTime(RiftTime) {
    return RiftTime ? Math.floor(RiftTime/60)/1000 : null;
}

function RiftColor(RiftTimeInMins) {
    return RiftTimeInMins ? `rgb(${Math.min(255, Math.max(0, 100 + (RiftTimeInMins / 15) * 155))}, ${Math.min(255, Math.max(0, 255 - (RiftTimeInMins / 15) * 255))}, 0)` : null;
}

export { RiftTime, RiftColor }
