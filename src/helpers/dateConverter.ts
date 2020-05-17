export const dateConverter = (date: Date | null) => {
    if (!date)
        return "";
    return new Date(date).toLocaleDateString()
        + " - "
        + new Date(date).toLocaleTimeString();
}
