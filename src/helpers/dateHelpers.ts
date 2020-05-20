const isToday = (date : Date) => {
    const now = new Date();
    return date.getDay() === now.getDay() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
}

export const customDateConverter = (date: Date) => {
    const newDate = new Date(date);
    return isToday(newDate)
        ? newDate.toLocaleTimeString()
        : newDate.toLocaleDateString() + " - " + newDate.toLocaleTimeString();
}
