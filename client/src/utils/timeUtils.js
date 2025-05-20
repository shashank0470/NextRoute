/**
 * Format hours into human-readable time
 */
export const formatTime = (hours) => {
if (hours < 1) {
return `${Math.round(hours * 60)} minutes`;
}
if (hours < 24) {
return `${Math.round(hours)} hours`;
}
const days = Math.round(hours / 24);
return `${days} ${days === 1 ? 'day' : 'days'}`;
};

/**
 * Calculate timeline based on schedule and total hours
 */
export const calculateTimeline = (totalHours, schedule) => {
switch (schedule) {
case 'daily':
    const hoursPerDay = 2; // Assuming 2 hours per day
    return `${Math.ceil(totalHours / hoursPerDay)} days at ${hoursPerDay} hours/day`;
case 'weekly':
    const hoursPerWeek = 10; // Assuming 10 hours per week
    return `${Math.ceil(totalHours / hoursPerWeek)} weeks at ${hoursPerWeek} hours/week`;
case 'monthly':
    const hoursPerMonth = 40; // Assuming 40 hours per month
    return `${Math.ceil(totalHours / hoursPerMonth)} months at ${hoursPerMonth} hours/month`;
default:
    return `Total: ${formatTime(totalHours)}`;
}
};