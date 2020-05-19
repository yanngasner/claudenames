const isToday = (date : Date) => {
    const now = new Date();
    return date.getDay() === now.getDay() &&
        date.getMonth() == now.getMonth() &&
        date.getFullYear() == now.getFullYear()
}

export const customDateConverter = (date: Date) => {
    return isToday(new Date(date))
        ? new Date(date).toLocaleTimeString()
        : date.toLocaleDateString() + " - " + date.toLocaleTimeString();
}
