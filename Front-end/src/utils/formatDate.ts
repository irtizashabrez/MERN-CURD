export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-Us", 
    {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
}